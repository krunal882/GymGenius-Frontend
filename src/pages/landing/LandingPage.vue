<!-- website landing page  -->
<template>
  <div>
    <!-- all landing page components -->
    <HeroHeader />
    <OurService />
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
    <AboutUs />
    <OurTrainer />
    <ContactForm />
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
import HeroHeader from "../../components/landingPage/HeroHeader.vue";
import OurService from "../../components/landingPage/OurService.vue";
import AboutUs from "../../components/landingPage/AboutUs.vue";
import OurTrainer from "../../components/landingPage/OurTrainer.vue";
import ContactForm from "../../components/landingPage/ContactForm.vue";
export default {
  name: "HomePage",
  components: {
    HeroHeader,
    OurService,
    AboutUs,
    OurTrainer,
    ContactForm,
  },
};
</script>

<style></style>
