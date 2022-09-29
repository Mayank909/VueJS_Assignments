<template>
  <div>
    <Banner />
    <product-cate-list />
  </div>
</template>

<script>
import ProductCateList from "@/components/prodCate/ProductCateList.vue";
import Banner from "@/components/Banner.vue";
export default {
  name: "ProductCategory",
  components: {
    ProductCateList,
    Banner,
  },
};
</script>

<style></style>
