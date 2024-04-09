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
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper.vue";
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
        require("../../../assets/img/equipment/equipment-carousel1.webp"),
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
      ],
    };
  },
};
</script>

<style></style>
