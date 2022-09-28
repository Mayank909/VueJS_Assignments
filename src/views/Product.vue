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
          <p class="">
            <router-link style="text-decoration: none; color: inherit" to="/"
              >Home</router-link
            >
            / <span>{{ category }}</span>
          </p>
        </v-card-title>
      </v-img>
    </v-card>
    <product-category />
  </section>
</template>

<script>
import ProductCategory from "../components/ProductCategory.vue";
import ProductList from "../components/ProductList.vue";
import ProductAdd from "../components/ProductAdd.vue";
import ProductEdit from "@/components/ProductEdit.vue";

export default {
  name: "Product",
  data() {
    return {
      category: "Shop",
    };
  },
  components: {
    ProductCategory,
    ProductList,
    ProductAdd,
    ProductEdit,
  },
};
</script>
