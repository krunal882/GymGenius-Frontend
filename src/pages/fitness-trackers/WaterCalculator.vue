<template>
  <TrackerHeader title="WATER INTAKE CALCULATOR" />
  <div class="container mt-5">
    <h2 class="u-h2">WATER INTAKE CALCULATOR</h2>
    <P style="font-weight: 400"
      >It can be hard to know how much water to drink in any given day, when you
      should be drinking it, and how to judge when you need more or less</P
    >
    <h6>set your relative data</h6>

    <WaterCalculation />
    <WaterInfo />
  </div>
</template>

<script>
import TrackerHeader from "@/components/fitnessTracker/TrackerHeader.vue";
import WaterCalculation from "@/components/fitnessTracker/WaterCalculation.vue";
import WaterInfo from "@/components/fitnessTracker/calculator info/WaterInfo.vue";

export default {
  components: {
    TrackerHeader,
    WaterCalculation,
    WaterInfo,
  },
};
</script>

<style></style>
