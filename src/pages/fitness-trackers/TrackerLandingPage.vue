<template>
  <div>
    <img
      width="100%"
      src="../../assets/img/fitnessTrackers/Fitness-Calculators.png"
      alt=""
    />
    <FitnessCard />
    <router-view></router-view>
  </div>
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
