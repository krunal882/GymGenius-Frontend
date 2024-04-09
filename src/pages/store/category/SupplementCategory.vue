<template>
  <StoreNavWrapper>
    <CategoryCarousel :images="carouselImages" style="height: auto" />
    <div class="d-flex">
      <ManFilter />
      <CategoryProduct />
    </div>
  </StoreNavWrapper>
</template>

<script>
import CategoryProduct from "../../../components/store/CategoryProduct.vue";
import CategoryCarousel from "../../../components/store/CategoryCarousel.vue";
import ManFilter from "../../../components/store/man/ProductFilter.vue";
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper.vue";
export default {
  components: {
    CategoryCarousel,
    ManFilter,
    CategoryProduct,
    StoreNavWrapper,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/supplements/supplement1.jpg"),
        require("../../../assets/img/supplements/supplement2.jpg"),
        require("../../../assets/img/supplements/supplement3.jpg"),
      ],
    };
  },
};
</script>

<style></style>
