<template>
  <div>
    <Banner />
    <product-category-list />
  </div>
</template>

<script>
import ProductCategoryList from "@/components/ProductCategory/ProductCategoryList.vue";
import Banner from "@/components/Banner.vue";
export default {
  name: "ProductCategory",
  components: {
    ProductCategoryList,
    Banner,
  },
};
</script>

<style></style>
