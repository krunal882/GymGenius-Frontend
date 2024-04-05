<template>
  <div>
    <StoreNavbar />
    <StoreCarousel />
    <ProductHeader />
  </div>
</template>

<script>
import StoreNavbar from "../../components/store/StoreNavbar.vue";
import StoreCarousel from "../../components/store/StoreCarousel.vue";
import ProductHeader from "../../components/store/ProductHeader.vue";
export default {
  name: "StorePage",
  components: {
    StoreNavbar,
    StoreCarousel,
    ProductHeader,
  },
};
</script>

<style></style>
