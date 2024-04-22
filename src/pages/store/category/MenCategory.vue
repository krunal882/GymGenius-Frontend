<template>
  <ManCarousal :images="carouselImages" />
  <div class="d-flex">
    <ProductFilter @filters-applied="applyFilters" />
    <CategoryProduct
      :product="filteredProducts"
      @product-selected="onProductSelected"
    />
  </div>
</template>

<script>
import CategoryProduct from "../../../components/store/CategoryProduct.vue";
import ManCarousal from "../../../components/store/CategoryCarousel.vue";
import ProductFilter from "../../../components/store/man/ProductFilter.vue";
import storeFilterMixin from "../../../components/store/storeFilterMixin";
export default {
  mixins: [storeFilterMixin],

  components: {
    ManCarousal,
    ProductFilter,
    CategoryProduct,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/man/man-carousal1.webp"),
        require("../../../assets/img/man/man-carousal2.webp"),
        require("../../../assets/img/man/man-carousal3.webp"),
      ],
      category: "men",
    };
  },
};
</script>

<style></style>
