<!-- BMR calculator page (parent) -->
<template>
  <!-- header of the page -->
  <TrackerHeader title="BMR CALCULATOR" />
  <div class="container mt-5">
    <h2 class="u-h2">WHAT IS BMR?</h2>
    <p>
      <span style="font-weight: 400"
        >BMR, or Basal Metabolic Rate, represents the number of calories your
        body needs to perform basic functions while at rest. These functions
        include -
        <ul>
          <li>breathing</li>
          <li>circulating blood</li>
          <li>maintaining body temperature</li>
          <li>metabolism</li>
          <li>cell function, growth, and repair</li>
        </ul>
        <br /><br
      /></span>
    </p>
    <h2 class="u-h2">CALCULATE YOUR BMR</h2>
    <h6>set your weight, height & age</h6>
    <!-- calculator component -->
    <BmrCalculation />
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
    <BmrInfo />
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
import BmrCalculation from "@/components/fitnessTracker/BmrCalculation.vue";
import BmrInfo from "@/components/fitnessTracker/calculator-info/BmrInfo.vue";

export default {
  components: {
    TrackerHeader,
    BmrCalculation,
    BmrInfo,
  },
};
</script>

<style></style>
