<template>
  <CategoryCarousel :images="carouselImages" style="height: auto" />
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
import ProductFilter from "../../../components/store/ProductFilter.vue";
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
        require("../../../assets/img/supplements/supplement1.jpg"),
        require("../../../assets/img/supplements/supplement2.jpg"),
        require("../../../assets/img/supplements/supplement3.jpg"),
      ],
      category: "supplements",
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
