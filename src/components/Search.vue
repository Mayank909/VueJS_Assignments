<template>
  <v-text-field
    v-model="search"
    @keypress="searchQuery"
    append-inner-icon="mdi-magnify"
    density="compact"
    variant="outlined"
    label="Search Category"
    single-line
    hide-details
  ></v-text-field>
</template>

<script>
export default {
  data(){
   return {
    search : "",
    }
  },
  computed: {
    searchQuery(){
      this.$emit('searchQuery', this.search)
    }
  },
};
</script>

<style></style>
