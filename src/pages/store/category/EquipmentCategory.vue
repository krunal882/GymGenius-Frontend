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
        require("../../../assets/img/equipment/equipment-carousel1.webp"),
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
      ],
      category: "equipments",
    };
  },
};
</script>

<style></style>
