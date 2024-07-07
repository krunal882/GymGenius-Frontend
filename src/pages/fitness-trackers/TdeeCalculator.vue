<!-- TDEE calculator page (parent) -->
<template>
  <!-- header of the page -->
  <TrackerHeader title="TDEE CALCULATOR" />
  <div class="container mt-5">
    <h2 class="u-h2">WHAT IS TDEE?</h2>
    <p>
      TDEE stands for Total Daily Energy Expenditure, and it represents the
      total number of calories your body burns in a day. This calculation takes
      into account various factors, including your Basal Metabolic Rate (BMR),
      physical activity, and more. Your TDEE is essentially the number of
      calories you need to maintain your current weight, and it serves as the
      foundation for reaching your fitness goals, whether it's losing weight,
      gaining muscle, or simply staying healthy.
    </p>
    <h6>set your relative data</h6>
    <!-- calculator component -->
    <TdeeCalculation />
    <script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7764190062746470"
      crossorigin="anonymous"
    ></script>
    <!-- add-1 -->
    <ins
      class="adsbygoogle"
      style="display: block"
      data-ad-client="ca-pub-7764190062746470"
      data-ad-slot="7248276222"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
    <script>
      (adsbygoogle = window.adsbygoogle || []).push({});
    </script>
    <TdeeInfo />
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
  </div>
</template>

<script>
import TrackerHeader from "@/components/fitnessTracker/TrackerHeader.vue";
import TdeeCalculation from "@/components/fitnessTracker/TdeeCalculation.vue";
import TdeeInfo from "@/components/fitnessTracker/calculator-info/TdeeInfo.vue";
export default {
  components: {
    TrackerHeader,
    TdeeCalculation,
    TdeeInfo,
  },
};
</script>

<style></style>
