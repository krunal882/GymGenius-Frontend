<template>
  <StoreNavWrapper>
    <ManCarousal :images="carouselImages" />
    <div class="d-flex">
      <ManFilter />
      <ManProductVue />
    </div>
  </StoreNavWrapper>
</template>

<script>
import ManProductVue from "../../../components/store/CategoryProduct.vue";
import ManCarousal from "../../../components/store/CategoryCarousel.vue";
import ManFilter from "../../../components/store/man/ProductFilter.vue";
import StoreNavWrapper from "../../../components/store/storeComponents/StoreNavWrapper";
export default {
  components: {
    ManCarousal,
    ManFilter,
    ManProductVue,
    StoreNavWrapper,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/man/man-carousal1.webp"),
        require("../../../assets/img/man/man-carousal2.webp"),
        require("../../../assets/img/man/man-carousal3.webp"),
      ],
    };
  },
};
</script>

<style></style>
