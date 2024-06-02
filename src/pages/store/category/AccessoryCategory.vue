<!-- this component is the parent component for the store accessory page , it includes the search field , filter , preview card components -->
<template>
  <!-- hero header images -->
  <CategoryCarousel :images="carouselImages" />
  <!-- search field and filter component -->
  <div class="d-flex flex-wrap justify-content-center">
    <UserSearch @search="handleSearch" @clearSearch="clearField" />
    <ProductFilter @filters-applied="applyFilters" />
  </div>
  <!-- preview card component with the infinity scroll applied (with pagination) -->
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
import storeFilterMixin from "../../../mixins/storeFilterMixin";
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
        require("../../../assets/img/accessories/accessories-carousel1.webp"),
        require("../../../assets/img/accessories/accessories-carousel2.webp"),
      ],
      category: "accessories",
      page: 1,
      loading: false,
      allLoaded: false,
      searchTerm: "",
      currentFilters: {},
    };
  },
  computed: {
    // to fetch accessories product
    filteredProducts() {
      return this.$store.state.productsModule.accessories;
    },
  },
};
</script>

<style></style>
