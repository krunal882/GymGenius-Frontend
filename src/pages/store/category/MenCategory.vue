<template>
  <CategoryCarousel :images="carouselImages" />
  <div class="d-flex flex-wrap justify-content-center">
    <UserSearch @search="handleSearch" @clearSearch="clearField" />
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
import UserSearch from "@/components/common-components/UserSearch.vue";
import storeFilterMixin from "../../../mixins/storeFilterMixin.js";
export default {
  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
    UserSearch,
  },
  mixins: [storeFilterMixin],

  data() {
    return {
      carouselImages: [
        require("../../../assets/img/man/man-carousal1.webp"),
        require("../../../assets/img/man/man-carousal2.webp"),
        require("../../../assets/img/man/man-carousal3.webp"),
      ],
      category: "men",
      page: 1,
      loading: false,
      allLoaded: false,
      searchTerm: "",
      currentFilters: {},
    };
  },
  computed: {
    filteredProducts() {
      return this.$store.state.productsModule.men;
    },
  },
};
</script>

<style></style>
