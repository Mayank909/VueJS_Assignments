<template>
  <v-text-field
    v-model="search"
    @keyup="searchQuery"
    append-inner-icon="mdi-magnify"
    density="compact"
    variant="outlined"
    :label=" `Search ${labelName}`"
    single-line
    hide-details
  ></v-text-field>
</template>

<script>
export default {
  props: {
    labelName : String,
  },
  data(){
   return {
    search : "",
    }
  },
  methods: {
     searchQuery(){
      this.$emit('searchQuery', this.search.trim())
    }
  }
};
</script>

<style></style>
