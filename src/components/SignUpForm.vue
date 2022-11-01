<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First Name*"
                  v-model="firstName"
                  :error="v$.firstName.$error"
                  color="primary"
                  required
                ></v-text-field>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.firstName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Last Name*"
                  v-model="lastName"
                  :error="v$.lastName.$error"
                  color="primary"
                  required
                ></v-text-field>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.lastName.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  v-model="email"
                  :error="v$.email.$error"
                  color="primary"
                  required
                ></v-text-field>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.email.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Password*"
                  v-model="password"
                  :error="v$.password.$error"
                  type="password"
                  color="primary"
                  required
                ></v-text-field>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.password.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Confirm Password*"
                  v-model="ConfirmPassword"
                  :error="v$.ConfirmPassword.$error"
                  type="password"
                  color="primary"
                  required
                ></v-text-field>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.ConfirmPassword.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
              <v-col cols="12" sm="6">
                <v-radio-group v-model="gender" :error="v$.gender.$error">
                  <div class="d-flex">
                    <span class="mt-2 mr-1">Gender*</span>
                    <v-radio
                      color="primary"
                      label="male"
                      value="male"
                    ></v-radio>
                    <v-radio
                      color="primary"
                      label="female"
                      value="female"
                    ></v-radio>
                  </div>
                </v-radio-group>
                <p
                  style="color: #b00a20"
                  class="mr-2 ml-2 text-caption"
                  :class="error.$color"
                  v-for="error of v$.gender.$errors"
                  :key="error.$uid"
                >
                  {{ error.$message }}
                </p>
              </v-col>
            </v-row>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                class="ml-2 mr-2"
                style="background-color: #b99272"
                @click="$emit('closeDialog')"
              >
                Cancel
              </v-btn>
              <v-btn
                class="ml-2 mr-2"
                style="background-color: #b99272"
                @click="addNewUser"
              >
                Sign Up
              </v-btn>
            </v-card-actions>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
import useVuelidate from "@vuelidate/core";
import {
  required,
  helpers,
  sameAs,
  minLength,
  email,
} from "@vuelidate/validators";
import Services from "@/helpers/api";
export default {
  data: () => ({
    v$: useVuelidate(),
    dialog: true,
    isActive: true,
    selectedType: "User",
    id: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    ConfirmPassword: "",
    gender: null,
  }),
  validations() {
    return {
      firstName: {
        required: helpers.withMessage("First Name is Required!", required),
        $autoDirty: true,
      },
      lastName: {
        required: helpers.withMessage("Last Name is Required!", required),
        $autoDirty: true,
      },
      email: {
        email,
        required: helpers.withMessage("Email Name is Required!", required),
        $autoDirty: true,
      },
      password: {
        required: helpers.withMessage("Password is Required!", required),
        containsPasswordRequirement: helpers.withMessage(
          () =>
            `The password requires an uppercase, lowercase, number and special character`,
          (value) =>
            /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/.test(value)
        ),
        minLengthValue: minLength(8),
        $autoDirty: true,
      },
      ConfirmPassword: {
        required: helpers.withMessage(
          "Confirm Password is Required!",
          required
        ),
        minLengthValue: minLength(8),
        sameAsPassword: helpers.withMessage(
          "The value must be equal to the Password value",
          sameAs(this.password)
        ),
        $autoDirty: true,
      },
      gender: {
        required: helpers.withMessage("Gender is Required!", required),
        $autoDirty: true,
      },
    };
  },
  methods: {
    //Database Operation
    getRandomId() {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let result = "";
      const charactersLength = characters.length;
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      return result;
    },
    async addNewUser() {
      this.v$.$touch();
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!this.v$.$error) {
        this.$emit("signUp");
        this.id =
          String(Math.floor(Math.random() * 100) + 1) + this.getRandomId();
        const user = {
          active: Boolean(this.isActive),
          first_name: this.firstName,
          last_name: this.lastName,
          email: this.email,
          password: this.password,
          type: this.selectedType,
          gender: this.gender,
          id: this.id,
        };
        const serviceApi = new Services();
        await serviceApi
          .postUser("users", user)
          .then((res) => {
            console.log("added data successfully. " + res);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
};
</script>
<style></style>
