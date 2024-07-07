<!-- water calculator page (parent) -->
<template>
  <!-- header of the page -->
  <TrackerHeader title="WATER INTAKE CALCULATOR" />
  <div class="container mt-5">
    <h2 class="u-h2">WATER INTAKE CALCULATOR</h2>
    <P style="font-weight: 400"
      >It can be hard to know how much water to drink in any given day, when you
      should be drinking it, and how to judge when you need more or less</P
    >
    <h6>set your relative data</h6>
    <!-- calculator component -->
    <WaterCalculation />
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
    <WaterInfo />
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
import TrackerHeader from "@/components/fitnessTracker/TrackerHeader";
import WaterCalculation from "@/components/fitnessTracker/WaterCalculation";
import WaterInfo from "@/components/fitnessTracker/calculator-info/WaterInfo";

export default {
  components: {
    TrackerHeader,
    WaterCalculation,
    WaterInfo,
  },
};
</script>

<style></style>
