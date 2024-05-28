<template>
  <div v-if="dietPlan" style="padding: 15px; margin-top: 25px; width: 1030px">
    <v-card width="auto" height="auto" style="display: flex">
      <div style="flex: 1">
        <img
          src="../../assets/img/diet-plan-image.jpg"
          alt=""
          style="height: 300px; object-fit: cover"
        />

        <v-card width="auto" style="margin-top: 15px">
          <v-card-text style="height: auto">
            <v-card-title style="font-size: 20px; font-weight: bold"
              >Diet-plan name: {{ dietPlan.plan_name }}</v-card-title
            >
            <v-divider></v-divider>
            <v-card-title style="font-size: 18px"
              >Type : {{ dietPlan.diet_type }}</v-card-title
            >
            <v-divider></v-divider>
            <v-card-title style="font-size: 18px"
              >Purpose : {{ dietPlan.purpose }}</v-card-title
            >
            <v-divider></v-divider>
            <v-card-title style="font-size: 18px"
              >Total Days: {{ dietPlan.total_days }}</v-card-title
            >
          </v-card-text>
          <v-card-actions>
            <v-btn color="orange" @click="back">Go Back</v-btn>
            <v-btn color="orange" @click="bookmark(dietPlan)">Bookmark</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <div style="flex: 1">
        <v-select
          v-model="selectedDay"
          :items="days"
          label="Select Day"
        ></v-select>
        <v-select
          v-model="selectedMealType"
          :items="mealTypes"
          label="Select Meal Type"
        ></v-select>
        <v-card
          v-if="selectedDay && selectedMealType"
          width="auto"
          style="margin-top: 15px"
        >
          <v-card-text style="height: auto">
            <v-card-title
              >Meals for {{ selectedDay }} -
              {{ selectedMealType }}:</v-card-title
            >
            <template v-if="filteredMeals.length > 0">
              <div v-for="(meal, index) in filteredMeals" :key="index">
                <v-card-title>Day: {{ meal.day }}</v-card-title>
                <v-divider></v-divider>
                <v-card-title>Meal Type: {{ meal.meal_type }}</v-card-title>
                <v-divider></v-divider>
                <div v-for="(food, foodIndex) in meal.foods" :key="foodIndex">
                  <v-card-title>Food item name: {{ food.name }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title>Quantity: {{ food.quantity }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title>Calories: {{ food.calories }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title>Protein: {{ food.protein }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title
                    >Carbohydrates: {{ food.carbohydrates }}</v-card-title
                  >
                  <v-divider></v-divider>
                  <v-card-title>Fat: {{ food.fat }}</v-card-title>
                  <v-divider></v-divider>
                  <v-card-title>Fiber: {{ food.fiber }}</v-card-title>
                </div>
              </div>
            </template>
            <template v-else>
              <p>
                No meals available for {{ selectedDay }} -
                {{ selectedMealType }}
              </p>
            </template>
          </v-card-text>
        </v-card>
      </div>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDay: null,
      selectedMealType: null,
      dietPlan: null,
      meals: [],
    };
  },
  computed: {
    days() {
      if (this.meals && this.meals.length > 0) {
        return Array.from(new Set(this.meals.map((meal) => meal.day)));
      } else {
        return [];
      }
    },
    mealTypes() {
      if (this.meals && this.meals.length > 0) {
        return Array.from(new Set(this.meals.map((meal) => meal.meal_type)));
      } else {
        return [];
      }
    },
    filteredMeals() {
      if (this.selectedDay && this.selectedMealType && this.meals) {
        return this.meals.filter(
          (meal) =>
            meal.day === this.selectedDay &&
            meal.meal_type === this.selectedMealType
        );
      } else {
        return [];
      }
    },
  },
  methods: {
    async fetchDiet(id) {
      try {
        await this.$store.dispatch("fetchDietPlan", { id });
        this.dietPlan = this.$store.state.dietPlanModule.dietDetail[0];
        this.meals = this.dietPlan.meals;
      } catch (error) {
        console.log(error);
      }
    },
    back() {
      this.$router.go(-1);
    },
    bookmark(dietPlan) {
      const userId = this.$store.state.userModule.userId;
      const dietId = dietPlan._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
    },
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchDiet(id);
  },
};
</script>

<style scoped></style>
