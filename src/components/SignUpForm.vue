<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="text-h5">Sign Up</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="First Name*"
                  color="primary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Last Name*"
                  color="primary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  color="primary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Password*"
                  type="password"
                  color="primary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-text-field
                  label="Confirm Password*"
                  type="password"
                  color="primary"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6">
                <v-radio-group v-model="gender">
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
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" text @click="$emit('closeDialog')">
                Cancel
              </v-btn>
              <v-btn color="primary" text @click="$emit('signUp')">
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
export default {
  data: () => ({
    dialog: true,
    isActive: true,
    selectedType: "User",
    gender: null,
  }),
};
</script>
<style></style>
