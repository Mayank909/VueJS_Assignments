<template>
  <section>
    <v-card class="mx-auto fill-height" width="100%">
      <v-img
        class="fill-height white--text align-center"
        lazy-src="../assets/menu.jpg"
        width="100%"
        src="../assets/menu.jpg"
      >
        <v-card-title class="ml-15 mt-15">
          <span class="font-weight-black text-h2"> Our Store </span>
          <br />
          <p class=""><router-link style="text-decoration:none; color: inherit;" to="/">Home</router-link> / 
          <span>{{ category }}</span></p>
        </v-card-title>
      </v-img>
    </v-card>
  </section>
</template>

<script>
import ProductCategory from "../components/ProductCategory.vue";
import ProductTags from "../components/ProductTags.vue";
import ProductList from "../components/ProductList.vue"
export default {
  name: "Product",
  data(){
    return {
      category: "Shop", 
    }
  },
  components: {
    ProductCategory,
    ProductTags,
    ProductList
  },
};
</script>
