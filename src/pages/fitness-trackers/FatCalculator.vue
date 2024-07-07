<!-- fat calculator page (parent) -->
<template>
  <!-- header of the page -->
  <TrackerHeader title="BODY FAT CALCULATOR" />
  <div class="container mt-5">
    <h2>BODY FAT CALCULATOR: CALCULATE YOUR BODY FAT PERCENTAGE</h2>
    <p>
      Are you curious about your body's fat composition? Dive into our Body Fat
      Calculator, a comprehensive tool designed to unveil the mysteries of your
      body's fat percentage. Not only does it reveal your current fat ratio, but
      it also guides you towards your ideal weight for optimal body fat levels.
    </p>
    <h6>set your weight, height & age</h6>
    <!-- calculator component -->
    <FatCalculation />
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
    <FatInfo />
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
import FatCalculation from "@/components/fitnessTracker/FatCalculation.vue";
import FatInfo from "@/components/fitnessTracker/calculator-info/FatInfo.vue";

export default {
  components: {
    TrackerHeader,
    FatCalculation,
    FatInfo,
  },
};
</script>
<style></style>
