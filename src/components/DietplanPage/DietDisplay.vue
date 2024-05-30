<template>
  <v-container class="">
    <div v-if="dietPlan" class="diet-plan-container">
      <div :class="{ 'd-flex': isWideScreen }">
        <v-img
          src="../../assets/img/diet-plan-image.jpg"
          alt="Diet Plan Image"
          class="diet-plan-image d-flex flex-wrap"
        ></v-img>
        <div class="diet-plan-details d-flex flex-wrap">
          <v-card-title class="diet-plan-title">
            Diet-plan name: {{ dietPlan.plan_name }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-text
            ><span class="label">Type:</span>
            {{ dietPlan.diet_type }}</v-card-text
          >
          <v-card-text
            ><span class="label">Purpose:</span>
            {{ dietPlan.purpose }}</v-card-text
          >
          <v-card-text
            ><span class="label">Total Days:</span>
            {{ dietPlan.total_days }}</v-card-text
          >
          <v-card-actions>
            <v-btn color="orange" @click="back">Go Back</v-btn>
            <v-btn color="orange" @click="toggleBookmark(dietPlan, 'diet')">
              {{ isBookmarked(dietPlan) ? "Undo Bookmark" : "Bookmark" }}
            </v-btn>
          </v-card-actions>
        </div>
      </div>

      <v-card-title class="meal-selection-title"> Select Day </v-card-title>
      <v-select
        style="width: 300px"
        v-model="selectedDay"
        :items="days"
        label="Select a day"
      ></v-select>

      <v-card-text class="meal-details-card" v-if="filteredMeals.length > 0">
        <v-card-title class="meal-details-title" style="align-content: center">
          Meal Details for Day: {{ selectedDay }}
        </v-card-title>
        <div v-for="(meal, index) in filteredMeals" :key="index">
          <v-divider></v-divider>

          <v-card-title class="meal-type-title" style="align-content: center">
            Meal Type: {{ meal.meal_type }}
          </v-card-title>
          <v-divider></v-divider>
          <v-card-title>Food items: </v-card-title>
          <div
            v-for="(food, foodIndex) in meal.foods"
            :key="foodIndex"
            class="d-flex justify-content-center"
          >
            <v-card-title class="food-item-title" style="align-content: center">
              {{ food.name }}
            </v-card-title>
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500"> Quantity:</span>
              {{ food.quantity }}</v-card-subtitle
            >
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500">Calories:</span>
              {{ food.calories }}</v-card-subtitle
            >
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500">Protein: </span
              >{{ food.protein }}</v-card-subtitle
            >
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500">Carbohydrates: </span
              >{{ food.carbohydrates }}</v-card-subtitle
            >
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500">Fat: </span
              >{{ food.fat }}</v-card-subtitle
            >
            <v-card-subtitle style="align-content: center"
              ><span style="font-weight: 500">Fiber: </span
              >{{ food.fiber }}</v-card-subtitle
            >
          </div>
        </div>
      </v-card-text>
    </div>
  </v-container>
</template>

<script>
import bookmarkMixin from "./../../mixins/bookmarkMixin.js";
export default {
  mixins: [bookmarkMixin],
  data() {
    return {
      selectedDay: null,
      dietPlan: null,
      meals: [],
      isWideScreen: true,
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
    filteredMeals() {
      if (this.selectedDay) {
        return this.meals.filter((meal) => meal.day === this.selectedDay);
      } else {
        return [];
      }
    },
    bookmarked() {
      return this.$store.state.bookmarkModule.diet;
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
    handleResize() {
      this.isWideScreen = window.innerWidth > 790;
    },
    back() {
      this.$router.go(-1);
    },
  },
  async created() {
    const { id } = this.$route.params;
    await this.fetchDiet(id);
  },

  mounted() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>
.diet-plan-container {
  padding: 15px;
  margin-top: 25px;
  width: 1030px;
}
.diet-plan-card {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.diet-plan-image {
  height: 300px;
  object-fit: cover;
  width: 60%;
}
.diet-plan-details {
  margin-top: 15px;
  width: 100%;
}
.diet-plan-title {
  font-size: 20px;
  font-weight: bold;
}
.meal-selection-card {
  margin-top: 15px;
}
.meal-selection-title {
  font-size: 20px;
  font-weight: bold;
}
.meal-details-card {
  margin-top: 15px;
  width: 100%;
}
.meal-details-title {
  font-size: 20px;
  font-weight: bold;
}
.meal-type-title {
  font-size: 18px;
}
.food-item-title {
  font-size: 16px;
}
.no-meal-details-card {
  margin-top: 15px;
  width: 100%;
}
.label {
  font-weight: 500;
  font-size: 16px;
}
</style>
