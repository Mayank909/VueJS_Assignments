<template>
  <Banner titleName="Product Editor" />
  <product-list />
</template>

<script>
import ProductList from "@/components/ProductCategory/ProductList.vue";
import Banner from "@/components/Banner.vue";
export default {
  name: "Product",
  components: {
    ProductList,
    Banner,
  },
};
</script>

<style></style>
