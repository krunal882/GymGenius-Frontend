<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="(item, index) in tracker"
      :key="index"
      class="mx-auto"
      max-width="400"
      style="margin: 10px; cursor: pointer"
      @click="handleCardClick(item)"
    >
      <v-img
        class="align-end text-white"
        height="250"
        width="400"
        :src="item.image"
        cover
      ></v-img>
      <v-card-text class="text-center font-weight-bold" style="font-size: 25px">
        {{ item.title }}
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tracker: [
        {
          title: "BMI CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/bmi2.webp"),
        },
        {
          title: "CALORIE CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/food-journal.webp"), // Using require to correctly resolve the image path
        },
        {
          title: "BMR CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/bmr-calculator.webp"), // Using require to correctly resolve the image path
        },
        {
          title: "WATER INTAKE CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/woman-drinking-water.webp"), // Using require to correctly resolve the image path},
        },
        {
          title: "BODY FAT CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/body-fat-calculator.webp"), // Using require to correctly resolve the image path},
        },
        {
          title: "TDEE CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/tdee-calculator.webp"), // Using require to correctly resolve the image path},
        },
      ],
    };
  },
  methods: {
    handleCardClick(item) {
      if (item.title === "BMI CALCULATOR") {
        // Redirect to the BMI calculator page
        this.$router.push({ name: "bmiCalculator" });
      } else if (item.title === "CALORIE CALCULATOR") {
        this.$router.push({ name: "calorieCalculator" });
      } else if (item.title === "BMR CALCULATOR") {
        this.$router.push({ name: "bmrCalculator" });
      } else if (item.title === "WATER INTAKE CALCULATOR") {
        this.$router.push({ name: "waterCalculator" });
      } else if (item.title === "BODY FAT CALCULATOR") {
        this.$router.push({ name: "fatCalculator" });
      } else if (item.title === "TDEE CALCULATOR") {
        this.$router.push({ name: "tdeeCalculator" });
      }
    },
  },
};
</script>

<style scoped>
.d-flex {
  display: flex; /* Use Flexbox layout */
}

.flex-wrap {
  flex-wrap: wrap; /* Allow items to wrap to the next line */
}

.justify-center {
  justify-content: center; /* Center items horizontally */
}
</style>
