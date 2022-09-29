<template>
    <section>
    <v-card class="mx-auto" height="150px" width="100%">
      <v-img
        cover
        class="fill-height white--text "
        lazy-src="../assets/menu.jpg"
        width="100%"
        src="../assets/menu.jpg"
      >
        <v-card-title class="ml-15 mt-6">
          <span class="font-weight-black text-h2"> Our Store </span>
          <br />
          <p class="">
            <router-link style="text-decoration: none; color: inherit" to="/"
              >Home</router-link
            >
            / <span>{{ category }}</span>
          </p>
        </v-card-title>
      </v-img>
    </v-card>
  </section>
</template>

<script>
export default {
  data() {
    return {
      category: "Shop",
    };
  },
}
</script>

<style>

</style>