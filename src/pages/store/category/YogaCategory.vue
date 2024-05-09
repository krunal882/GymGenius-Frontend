<template>
  <CategoryCarousel :images="carouselImages" />
  <ProductSearch @search="handleSearch" />
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
import ProductSearch from "@/components/store/storeComponents/ProductSearch.vue";
export default {
  mixins: [storeFilterMixin],
  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
    ProductSearch,
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
    handleSearch(searchItem) {
      this.selectedItem = searchItem;
      this.search();
    },
  },
};
</script>

<style></style>
