<template>
  <CategoryCarousel :images="carouselImages" />
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
import CategoryCarousel from "../../../components/store/CategoryCarousel.vue";
import ProductFilter from "../../../components/store/man/ProductFilter.vue";
import storeFilterMixin from "../../../components/store/storeFilterMixin";
export default {
  mixins: [storeFilterMixin],

  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/cycle/cyc-carousel1.webp"),
        require("../../../assets/img/cycle/cyc-carousel2.webp"),
      ],
      category: "cycles",
    };
  },
};
</script>

<style></style>
