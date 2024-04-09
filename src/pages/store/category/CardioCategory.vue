<template>
  <StoreNavWrapper>
    <CategoryCarousel :images="carouselImages" />
    <div class="d-flex">
      <ProductFilter />
      <CategoryProduct />
    </div>
  </StoreNavWrapper>
</template>

<script>
import CategoryProduct from "../../../components/store/CategoryProduct.vue";
import CategoryCarousel from "../../../components/store/CategoryCarousel.vue";
import ProductFilter from "../../../components/store/man/ProductFilter.vue";
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper";
export default {
  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
    StoreNavWrapper,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/cardio/cardio-carousel1.webp"),
        require("../../../assets/img/cardio/cardio-carousel3.webp"),
      ],
    };
  },
};
</script>

<style></style>
