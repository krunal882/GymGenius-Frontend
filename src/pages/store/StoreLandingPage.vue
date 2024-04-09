<template>
  <div>
    <StoreNavbar />
    <StoreCarousel />
    <p class="container slider">
      EQUIPMENTS
      <a href="/" class="viewAll">view more</a>
    </p>
    <ProductCarousel />
    <p class="container slider">
      SUPPLEMENTS
      <a href="/" class="viewAll">view more</a>
    </p>
    <ProductCarousel />

    <p class="container slider">
      CYCLES
      <a href="/" class="viewAll">view more</a>
    </p>
    <ProductCarousel />
    <p class="container slider">
      CARDIO
      <a href="/" class="viewAll">view more</a>
    </p>
    <ProductCarousel />
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
import StoreNavbar from "@/components/store/storeComponents/StoreNavbar.vue";
import StoreCarousel from "../../components/store/storeComponents/StoreCarousel.vue";
import ProductCarousel from "../../components/store/ProductCarousel.vue";
import ShopByCategory from "../../components/store/ShopByCategory.vue";
import SpotLight from "../../components/store/SpotLight.vue";
export default {
  name: "StorePage",
  components: {
    StoreNavbar,
    StoreCarousel,
    ProductCarousel,
    ShopByCategory,
    SpotLight,
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
