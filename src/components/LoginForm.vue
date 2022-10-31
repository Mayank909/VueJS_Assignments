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
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  color="primary"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
            </v-row>
            <v-card-actions class="d-flex justify-center">
              <v-btn class="ml-2 mr-2" style="background-color: #b99272" text @click="$emit('closeDialog')">
                Cancel
              </v-btn>
              <v-btn class="ml-2 mr-2" style="background-color: #b99272" text @click="$emit('login')">
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
export default {
  data: () => ({
    dialog: true,
  }),
};
</script>
<style></style>
