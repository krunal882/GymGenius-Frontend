<template>
  <StoreNavWrapper>
    <CategoryCarousel :images="carouselImages" style="height: auto" />
    <div class="d-flex">
      <ProductFilter @filters-applied="applyFilters" />
      <CategoryProduct
        :product="filteredProducts"
        @product-selected="onProductSelected"
      />
    </div>
  </StoreNavWrapper>
</template>

<script>
import CategoryProduct from "../../../components/store/CategoryProduct.vue";
import CategoryCarousel from "../../../components/store/CategoryCarousel.vue";
import ProductFilter from "../../../components/store/man/ProductFilter.vue";
import StoreNavWrapper from "@/components/store/storeComponents/StoreNavWrapper.vue";
import storeFilterMixin from "../../../components/store/storeFilterMixin";
export default {
  mixins: [storeFilterMixin],

  components: {
    CategoryCarousel,
    ProductFilter,
    CategoryProduct,
    StoreNavWrapper,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/supplements/supplement1.jpg"),
        require("../../../assets/img/supplements/supplement2.jpg"),
        require("../../../assets/img/supplements/supplement3.jpg"),
      ],
      category: "supplements",
    };
  },
};
</script>

<style></style>
