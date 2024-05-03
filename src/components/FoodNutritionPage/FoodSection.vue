<template>
  <v-container>
    <v-row justify="center">
      <v-card width="400" class="mx-10 my-10">
        <router-link :to="{ name: 'foodNutrition' }">
          <img height="300px" width="100%" :src="nutrition" cover />
        </router-link>
        <v-card-title> Food Item Nutrition </v-card-title>

        <v-card-text>
          Click on the image to learn more about the nutritional value of the
          food item , Discover essential details such as calories,
          carbohydrates, fiber, protein, and fat content.Dive into a
          comprehensive overview of the food item recipes and serving ideas.
        </v-card-text>
        <v-btn color="orange-lighten-2" variant="text"> Explore </v-btn>
      </v-card>
      <v-card width="400" class="mx-10 my-10">
        <router-link :to="{ name: 'dietPlan' }">
          <v-img height="300px" width="100%" :src="diet" cover></v-img>
        </router-link>

        <v-card-title> Diet Plan for your health </v-card-title>

        <v-card-text>
          Click on the image to view the diet plan. The diet plan provides
          comprehensive information about the nutritional benefits, recommended
          serving sizes, and suggested meal ideas. Discover how this food can be
          incorporated into your diet for a healthier lifestyle.
        </v-card-text>
        <v-btn
          color="orange-lighten-2"
          variant="text"
          class="text-center"
          style="justify-content-center"
        >
          Explore
        </v-btn>
      </v-card>
    </v-row>
  </v-container>
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
  methods: {},
};
</script>
