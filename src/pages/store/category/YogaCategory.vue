<template>
  <CategoryCarousel :images="carouselImages" />
  <div class="d-flex flex-wrap justify-content-center">
    <UserSearch @search="handleSearch" />
    <ProductFilter @filters-applied="applyFilters" />
  </div>
  <div class="d-flex flex-wrap justify-content-center">
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
import UserSearch from "@/components/common-components/UserSearch.vue";
export default {
  mixins: [storeFilterMixin],
  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
    UserSearch,
  },
  data() {
    return {
      selectedItem: null,
      carouselImages: [
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
        require("../../../assets/img/accessories/accessories-carousel1.webp"),
      ],
      category: "yoga",
    };
  },
  methods: {
    handleSearch(searchTerm) {
      if (searchTerm) {
        this.fetchProductWithFilters({ name: searchTerm });
      }
    },
  },
};
</script>

<style></style>
