<template>
  <CategoryCarousel :images="carouselImages" />
  <div class="d-flex flex-wrap justify-content-center">
    <UserSearch @search="handleSearch" />
    <ProductFilter @filters-applied="applyFilters" />
  </div>
  <div class="d-flex flex-wrap justify-content-center">
    <v-infinite-scroll @load="loadMoreProducts">
      <CategoryProduct
        :products="filteredProducts"
        @product-selected="onProductSelected"
      />
      <template v-slot:empty>
        <v-alert type="warning">No more products!</v-alert>
      </template>
    </v-infinite-scroll>
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
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
        require("../../../assets/img/accessories/accessories-carousel1.webp"),
      ],
      category: "yoga",
      page: 1,
      loading: false,
      allLoaded: false,
      searchTerm: "",
      currentFilters: {},
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.state.productsModule.yoga;
    },
  },
};
</script>

<style></style>
