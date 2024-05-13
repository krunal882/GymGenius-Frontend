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
import HeroHeader from "../../components/HeroHeader.vue";
import OurService from "../../components/OurService.vue";
import AboutUs from "../../components/AboutUs.vue";
import OurTrainer from "../../components/OurTrainer.vue";
import ContactForm from "../../components/ContactForm.vue";
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
