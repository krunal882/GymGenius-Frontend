<template>
  <div class="d-flex flex-wrap justify-center">
    <v-card
      v-for="(item, index) in tracker"
      :key="index"
      class="mx-auto"
      max-width="400"
      style="margin: 10px; cursor: pointer"
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
          title: "CALORIE CALCULATOR",
          image: require("../../assets/img/fitnessTrackers/food-journal.webp"), // Using require to correctly resolve the image path
        },
      ],
    };
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
