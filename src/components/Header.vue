<template>
  <v-app-bar color="surface" elevation="4" class="pa-5" density="compact">
    <!-- <template v-slot:prepend>
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
    </template> -->

    <v-app-bar-title
      ><v-img
        class="m-0"
        :aspect-ratio="50 / 9"
        max-height="80"
        max-width="236"
        src="../assets/applogo.png"
      ></v-img>
    </v-app-bar-title>

    <v-tabs align-with-title>
      <v-btn>Home</v-btn>
      <v-btn>Login</v-btn>
      <v-btn>Sign Up</v-btn>
    </v-tabs>

    <template v-slot:append>
      <v-btn icon>
        <v-icon>mdi-cart-outline</v-icon>
        <v-icon color="primary" class="zero-icon" size="20"
          >mdi-numeric-0-circle</v-icon
        >
      </v-btn>
    </template>
  </v-app-bar>
</template>

<script>
export default {};
</script>

<style>
.zero-icon {
  position: absolute;
  top: 0;
  left: 8;
  right: 0;
  bottom: 10;
}
</style>
