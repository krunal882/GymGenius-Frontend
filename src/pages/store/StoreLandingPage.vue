<template>
  <div>
    <StoreCarousel />
    <p class="container slider">
      EQUIPMENTS
      <router-link class="viewAll" :to="{ name: 'equipments' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="product"
      category="equipments"
      @product-selected="onProductSelected"
    />
    <p class="container slider">
      SUPPLEMENTS
      <router-link class="viewAll" :to="{ name: 'supplements' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="product"
      category="supplements"
      @product-selected="onProductSelected"
    />

    <p class="container slider">
      CYCLES
      <router-link class="viewAll" :to="{ name: 'cycles' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="product"
      category="cycles"
      @product-selected="onProductSelected"
    />
    <p class="container slider">
      CARDIO
      <router-link class="viewAll" :to="{ name: 'cardio' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="product"
      category="cardio"
      @product-selected="onProductSelected"
    />
    <p class="container slider" style="font-size: 30px">SHOP BY WORKOUT</p>
    <ShopByCategory />
    <p class="container slider" style="font-size: 30px; margin-top: 40px">
      SPOTLIGHT
    </p>
    <SpotLight />
    <router-view> </router-view>
  </div>
</template>

<script>
import StoreCarousel from "../../components/store/storeComponents/StoreCarousel.vue";
import ProductCarousel from "../../components/store/ProductCarousel.vue";
import ShopByCategory from "../../components/store/ShopByCategory.vue";
import SpotLight from "../../components/store/SpotLight.vue";
import storeFilterMixin from "@/components/store/storeFilterMixin";
export default {
  mixins: [storeFilterMixin],
  components: {
    StoreCarousel,
    ProductCarousel,
    ShopByCategory,
    SpotLight,
  },
  computed: {
    product() {
      return this.$store.state.productsModule.product;
    },
  },
  mounted() {
    const filteredFilters = {};
    const limit = 15;
    const url = "http://localhost:3000/store";
    this.$store
      .dispatch("fetchProduct", { filteredFilters, limit ,url})
      .catch((error) => {
        console.error("Error fetching product:", error);
      });
  },
};
</script>
<style scoped>
.slider {
  margin-top: 0px;
  margin-bottom: 0px;
  font-size: 25px;
  font-weight: bold;
  font-family: Arial, sans-serif;
}
.viewAll {
  font-size: 15px;
  text-decoration: none;
}
</style>
