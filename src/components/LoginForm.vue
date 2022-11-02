<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title class="text-center">
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  color="primary"
                  v-model="email"
                  :error="v$.email.$error"
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
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  v-model="password"
                  :error="v$.password.$error"
                  color="primary"
                  type="password"
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
            </v-row>
            <p
              style="color: #b00a20"
              class="mr-2 ml-2 text-caption"
              :class="error.$color"
              v-for="error of v$.loggedInUser.$errors"
              :key="error.$uid"
            >
              {{ error.$message }}
            </p>
            <v-card-actions class="d-flex justify-center">
              <v-btn
                class="ml-2 mr-2"
                style="background-color: #b99272"
                text
                @click="$emit('closeDialog')"
              >
                Cancel
              </v-btn>
              <v-btn
                class="ml-2 mr-2"
                style="background-color: #b99272"
                text
                @click="isAccountExist"
              >
                Login
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
import { required, helpers, email } from "@vuelidate/validators";
import { query, where, collection, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase";
export default {
  data: () => ({
    v$: useVuelidate(),
    dialog: true,
    email: "",
    loggedInUser: null,
    password: "",
  }),
  validations() {
    return {
      email: {
        email,
        required: helpers.withMessage("Email is Required!", required),
        $autoDirty: true,
      },
      password: {
        required: helpers.withMessage("Password is Required!", required),
        $autoDirty: true,
      },
      loggedInUser: {
        required: helpers.withMessage(
          "Given Email and Password do not exist, Sign Up First.",
          required
        ),
        $autoDirty: true,
      },
    };
  },
  methods: {
    //Database Operation
    isAccountExist() {
      this.v$.$touch();
      const colRef = collection(db, "users");
      const q = query(
        colRef,
        where("email", "==", this.email),
        where("password", "==", this.password)
      );
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          this.loggedInUser = { ...doc.data() };
        });
        this.loginUser();
      });
    },
    loginUser() {
      // you can show some extra alert to the user or just leave the each field to show it's `$errors`.
      if (!this.v$.$error && !(this.loggedInUser == null)) {
        this.$emit("login");
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify(this.loggedInUser)
        );
      }
    },
  },
};
</script>
<style></style>
