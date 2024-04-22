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
        require("../../../assets/img/accessories/accessories-carousel1.webp"),
        require("../../../assets/img/accessories/accessories-carousel2.webp"),
      ],
      category: "accessories",
    };
  },
};
</script>

<style></style>
