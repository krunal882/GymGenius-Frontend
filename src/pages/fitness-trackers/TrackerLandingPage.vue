<!-- trackers landing page -->
<template>
  <div>
    <!-- hero header poster -->
    <img
      width="100%"
      src="../../assets/img/fitnessTrackers/Fitness-Calculators.png"
      alt="poster"
    />
    <!-- card of all fitness calculators -->
    <FitnessCard />
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7764190062746470"
      crossorigin="anonymous"
    ></script>
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-format="autorelaxed"
      data-ad-client="ca-pub-7764190062746470"
      data-ad-slot="8399923402"
    ></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
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
