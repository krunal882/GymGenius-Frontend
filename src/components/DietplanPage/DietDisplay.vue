<template>
  <div style="padding: 15px; margin-top: 25px; width: 1030px">
    <v-card width="auto" height="auto" style="display: flex">
      <!-- Image and Diet-plan name, Type, Purpose, and Total Days fields -->
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
            <!-- Emit an event when the Explore button is clicked -->
            <v-btn color="orange" @click="exploreClicked">Go Back</v-btn>
            <v-btn color="orange" @click="bookmark(dietPlan)">Bookmark</v-btn>
          </v-card-actions>
        </v-card>
      </div>

      <!-- Select day dropdown -->
      <div style="flex: 1">
        <v-select
          v-model="selectedDay"
          :items="days"
          label="Select Day"
        ></v-select>
        <!-- Select meal type dropdown -->
        <v-select
          v-model="selectedMealType"
          :items="mealTypes"
          label="Select Meal Type"
        ></v-select>
        <!-- Display meal information for the selected day and meal type -->
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
            <!-- Check if there are any meals for the selected day -->
            <template v-if="filteredMeals.length > 0">
              <!-- Loop through filteredMeals if there are meals -->
              <div v-for="(meal, index) in filteredMeals" :key="index">
                <v-card-title>Day: {{ meal.day }}</v-card-title>
                <v-divider></v-divider>
                <v-card-title>Meal Type: {{ meal.meal_type }}</v-card-title>
                <v-divider></v-divider>
                <!-- Loop through foods array in the current meal -->
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
                <!-- End of foods loop -->
              </div>
            </template>
            <template v-else>
              <p>
                No meals available for {{ selectedDay }} -
                {{ selectedMealType }}
              </p>
            </template>

            <!-- End of meals loop -->
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
    };
  },
  props: {
    dietPlan: {
      type: Object,
      required: true,
    },
    meals: {
      type: Array,
      required: true,
    },
  },
  computed: {
    // Compute unique days from meals data
    days() {
      return Array.from(new Set(this.meals.map((meal) => meal.day)));
    },
    // Compute unique meal types from meals data
    mealTypes() {
      return Array.from(new Set(this.meals.map((meal) => meal.meal_type)));
    },
    // Filter meals array based on selected day and meal type
    filteredMeals() {
      if (this.selectedDay && this.selectedMealType) {
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
    exploreClicked() {
      // Emit an event named "explore" when the button is clicked
      this.$emit("explore");
    },
    bookmark(dietPlan) {
      const userId = this.$store.state.userModule.user._id;
      console.log(userId, dietPlan._id);
      const dietId = dietPlan._id;
      this.$store.dispatch("bookmarkItem", {
        userId,
        itemId: dietId,
        itemType: "diet",
      });
    },
  },
};
</script>

<style scoped></style>
