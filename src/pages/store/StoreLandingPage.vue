<!-- store landing page -->
<template>
  <div>
    <!-- carousal images -->
    <StoreCarousel />
    <p class="container slider">
      EQUIPMENTS
      <router-link class="viewAll" :to="{ name: 'equipments' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="equipmentCarousal"
      @product-selected="onProductSelected"
    />
    <p class="container slider">
      SUPPLEMENTS
      <router-link class="viewAll" :to="{ name: 'supplements' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="supplementCarousal"
      @product-selected="onProductSelected"
    />

    <p class="container slider">
      CYCLES
      <router-link class="viewAll" :to="{ name: 'cycles' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="cycleCarousal"
      @product-selected="onProductSelected"
    />
    <p class="container slider">
      CARDIO
      <router-link class="viewAll" :to="{ name: 'cardio' }"
        >view more</router-link
      >
    </p>
    <ProductCarousel
      :product="cardioCarousal"
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
import storeFilterMixin from "@/mixins/storeFilterMixin";
export default {
  mixins: [storeFilterMixin],
  components: {
    StoreCarousel,
    ProductCarousel,
    ShopByCategory,
    SpotLight,
  },
  computed: {
    // different carousals for different category
    equipmentCarousal() {
      return this.$store.state.productsModule.equipmentCarousal;
    },
    supplementCarousal() {
      return this.$store.state.productsModule.supplementCarousal;
    },
    cycleCarousal() {
      return this.$store.state.productsModule.cycleCarousal;
    },
    cardioCarousal() {
      return this.$store.state.productsModule.cardioCarousal;
    },
  },

  //fetching 10 product of each category for category wise carousal
  mounted() {
    const categories = [
      ["equipments", "equipmentCarousal"],
      ["supplements", "supplementCarousal"],
      ["cycles", "cycleCarousal"],
      ["cardio", "cardioCarousal"],
    ];
    const limit = 10;
    const url = "http://localhost:3000/store";

    if (!this.equipmentCarousal.length) {
      categories.forEach(async (category) => {
        const [categoryName, store] = category; // Destructuring the category array
        const filteredFilters = {};
        await this.$store
          .dispatch("fetchProduct", {
            filteredFilters,
            limit,
            url,
            category: categoryName,
            store,
          })
          .catch((error) => {
            console.error(`Error fetching ${categoryName} products:`, error);
          });
      });
    }
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
