<template>
  <ManCarousal :images="carouselImages" />
  <UserSearch @search="handleSearch" />
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
import UserSearch from "@/components/common-components/UserSearch.vue";
export default {
  mixins: [storeFilterMixin],

  components: {
    ManCarousal,
    ProductFilter,
    CategoryProduct,
    UserSearch,
  },
  data() {
    return {
      selectedItem: null,
      carouselImages: [
        require("../../../assets/img/equipment/equipment-carousel1.webp"),
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
      ],
      category: "equipments",
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
