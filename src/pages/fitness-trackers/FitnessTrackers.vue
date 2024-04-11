<template>
  <div>
    <img
      width="100%"
      src="../../assets/img/fitnessTrackers/Fitness-Calculators.png"
      alt=""
    />
    <FitnessCard />
  </div>
  <router-view></router-view>
</template>

<script>
import FitnessCard from "@/components/fitnessTracker/FitnessCard.vue";
export default {
  components: {
    FitnessCard,
  },
};
</script>

<style></style>
