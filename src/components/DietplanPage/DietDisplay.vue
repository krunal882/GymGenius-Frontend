<!-- this component is for displaying the dietPlan to users -->
<!--it also provides buttons for the bookmarking and for navigating to previous page -->
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
          <v-card-actions style="justify-content: space-between">
            <v-btn color="orange" @click="back">Go Back</v-btn>
            <v-btn color="orange" @click="toggleBookmark(dietPlan, 'diet')">
              {{ isBookmarked(dietPlan) ? "Undo Bookmark" : "Bookmark" }}
            </v-btn>
            <v-btn color="orange" @click="downloadPDF">Download PDF</v-btn>
          </v-card-actions>
        </div>
      </div>

      <!-- drop-down for selecting the day -->
      <v-card-title class="meal-selection-title"> Select Day </v-card-title>
      <v-select
        style="width: 300px"
        v-model="selectedDay"
        :items="days"
        label="Select a day"
      ></v-select>

      <!-- displays meals for the day  -->
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
import jsPDF from "jspdf";
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
    // it provides the total days of dietPlan
    days() {
      if (this.meals && this.meals.length > 0) {
        return Array.from(new Set(this.meals.map((meal) => meal.day)));
      } else {
        return [];
      }
    },
    //it filters the meal by the selected day
    filteredMeals() {
      if (this.selectedDay) {
        return this.meals.filter((meal) => meal.day === this.selectedDay);
      } else {
        return [];
      }
    },
    //it returns the bookmarked diet-plan of the user
    bookmarked() {
      return this.$store.state.bookmarkModule.diet;
    },
  },
  methods: {
    //fetchDiet method fetch the dietPlan by id and stores in the local dietPlan
    async fetchDiet(id) {
      try {
        await this.$store.dispatch("fetchDietPlan", { id });
        this.dietPlan = this.$store.state.dietPlanModule.dietDetail[0];
        this.meals = this.dietPlan.meals;
      } catch (error) {
        console.log(error);
      }
    },
    //it handles the screen sizing
    handleResize() {
      this.isWideScreen = window.innerWidth > 790;
    },
    //it navigates to the previous page
    back() {
      this.$router.go(-1);
    },

    async downloadPDF() {
      const pdf = new jsPDF("p", "mm", "a4");
      const margin = 10;
      const pageHeight = pdf.internal.pageSize.getHeight();
      let yOffset = margin;

      pdf.setFontSize(22);
      pdf.text(this.dietPlan.plan_name, margin, yOffset);
      yOffset += 10;

      const details = [
        `Type: ${this.dietPlan.diet_type}`,
        `Purpose: ${this.dietPlan.purpose}`,
        `Total Days: ${this.dietPlan.total_days}`,
      ];

      pdf.setFontSize(12);
      details.forEach((detail) => {
        pdf.text(detail, margin, yOffset);
        yOffset += 7;
      });

      this.days.forEach((day) => {
        pdf.setFontSize(16);
        pdf.text(`Day ${day}`, margin, yOffset);
        yOffset += 10;

        const dayMeals = this.meals.filter((meal) => meal.day === day);

        dayMeals.forEach((meal) => {
          pdf.setFontSize(14);
          pdf.text(`Meal Type: ${meal.meal_type}`, margin, yOffset);
          yOffset += 7;

          pdf.setFontSize(12);
          meal.foods.forEach((food) => {
            const foodDetails = [
              `Food Item: ${food.name}`,
              `Quantity: ${food.quantity}`,
              `Calories: ${food.calories}`,
              `Protein: ${food.protein}`,
              `Carbohydrates: ${food.carbohydrates}`,
              `Fat: ${food.fat}`,
              `Fiber: ${food.fiber}`,
            ];

            foodDetails.forEach((detail) => {
              pdf.text(detail, margin + 10, yOffset);
              yOffset += 7;
            });

            yOffset += 5;
          });

          yOffset += 10;
        });

        if (yOffset > pageHeight - margin) {
          pdf.addPage();
          yOffset = margin;
        }
      });

      pdf.save(`${this.dietPlan.plan_name}.pdf`);
    },
  },

  //created lifecycle hook fetch the dietPlan using the id in route
  async created() {
    const { id } = this.$route.params;
    await this.fetchDiet(id);
  },
  //it handles the screen sizing
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
