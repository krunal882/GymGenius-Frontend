<template>
  <div>
    <HeroHeader />
    <OurService />
    <AboutUs />
    <OurTrainer />
    <ContactForm />
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
