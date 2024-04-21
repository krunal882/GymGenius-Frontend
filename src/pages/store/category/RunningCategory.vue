<template>
  <StoreNavWrapper>
    <CategoryCarousel :images="carouselImages" />
    <div class="d-flex">
      <ManFilter />
      <CategoryProduct :product="filteredProducts" />
    </div>
  </StoreNavWrapper>
</template>

<script>
import CategoryProduct from "../../../components/store/CategoryProduct.vue";
import CategoryCarousel from "../../../components/store/CategoryCarousel.vue";
import ManFilter from "../../../components/store/man/ProductFilter.vue";
import StoreNavWrapper from "../../../components/store/storeComponents/StoreNavWrapper";
export default {
  components: {
    CategoryCarousel,
    ManFilter,
    CategoryProduct,
    StoreNavWrapper,
  },
  data() {
    return {
      carouselImages: [
        require("../../../assets/img/equipment/equipment-carousel2.webp"),
        require("../../../assets/img/accessories/accessories-carousel1.webp"),
      ],
    };
  },
  computed: {
    filteredProducts() {
      const allProducts = this.$store.state.productsModule.product;
      const manProducts = allProducts.filter(
        (product) => product.category === "running"
      );
      return manProducts;
    },
  },
  mounted() {
    const filteredFilters = {}; // Initialize with an empty object
    this.$store
      .dispatch("fetchProduct", { filteredFilters }) // Pass the filteredFilters object
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  },
};
</script>

<style></style>
