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
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper.vue";
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
        require("../../../assets/img/cycle/cyc-carousel1.webp"),
        require("../../../assets/img/cycle/cyc-carousel2.webp"),
      ],
    };
  },
};
</script>

<style></style>
