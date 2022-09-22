<template>
  <div>
    <Navbar />
    <Datadisplay />
  </div>
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Datadisplay from "./components/Datadisplay.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Datadisplay,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0px;
  padding: 0px;
}
</style>
