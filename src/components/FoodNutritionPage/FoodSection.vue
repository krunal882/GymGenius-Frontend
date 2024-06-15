<!-- this component displays the cards for the navigation to food-section pages -->
<template>
  <div>
    <div id="carouselExampleIndicators" class="carousel slide">
      <!-- image of the poster -->
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img
            src="../../assets/img/nutritions99.jpg"
            class="w-100"
            style="max-height: 600px"
            alt="..."
          />
        </div>
      </div>
    </div>
    <v-row justify="center">
      <v-card width="400" class="mx-10 my-10 image-hover-effect">
        <router-link :to="{ name: 'foodNutrition' }">
          <div
            style="position: relative; width: 100%; height: 0; padding-top: 75%"
          >
            <img
              style="
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover;
              "
              :src="nutrition"
              alt="Food Nutrition"
            />
          </div>
        </router-link>
        <!-- card information section -->
        <v-card-title> Food Item Nutrition </v-card-title>
        <!-- food item nutrition section -->
        <v-card-text>
          Click on the image to learn more about the nutritional value of the
          food item , Discover essential details such as calories,
          carbohydrates, fiber, protein, and fat content.Dive into a
          comprehensive overview of the food item recipes and serving ideas.
        </v-card-text>
      </v-card>
      <v-card width="400" class="mx-10 my-10 image-hover-effect">
        <router-link :to="{ name: 'dietPlan' }">
          <v-img
            height="300px"
            width="100%"
            :src="diet"
            alt="Diet Plans"
            cover
          ></v-img>
        </router-link>

        <!-- dietPlan section -->
        <v-card-title> Diet Plan for your health </v-card-title>

        <v-card-text>
          Click on the image to view the diet plan. The diet plan provides
          comprehensive information about the nutritional benefits, recommended
          serving sizes, and suggested meal ideas. Discover how this food can be
          incorporated into your diet for a healthier lifestyle.
        </v-card-text>
      </v-card>
    </v-row>
  </div>
  <div>
    <TabView />
    <HealthBenifits />
  </div>
</template>

<script>
import nutrition from "../../assets/img/nutrition.jpg";
import diet from "../../assets/img/diet.jpg";
import TabView from "./TabView.vue";
import HealthBenifits from "./HealthBenifits.vue";
export default {
  components: { TabView, HealthBenifits },
  data() {
    return {
      nutrition: nutrition,
      diet: diet,
    };
  },
};
</script>

<style scoped>
.image-hover-effect:hover {
  transform: scale(1.1);
  transition: transform 0.3s ease-in-out;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
}
</style>
