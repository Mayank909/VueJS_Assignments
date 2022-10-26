<template>
  <v-layout>
    <Header />
    <v-main>
      <CaroselSlider />
    </v-main>
  </v-layout>
</template>

<script>
import Header from "@/components/Header.vue";
import CaroselSlider from "../components/CaroselSlider.vue";
export default {
  name: "home",
  components: {
    CaroselSlider,
    Header,
  },
};
</script>

<style></style>
