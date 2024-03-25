<template>
  <div>
    <HelloWorld />
    <HeroHeader />
    <OurService />
    <AboutUs />
    <OurTrainer />
    <ContactForm />
    <PageFooter />
  </div>
</template>

<script>
import HelloWorld from "../../components/HelloWorld.vue";
import HeroHeader from "../../components/HeroHeader.vue";
import OurService from "../../components/OurService.vue";
import AboutUs from "../../components/AboutUs.vue";
import OurTrainer from "../../components/OurTrainer.vue";
import ContactForm from "../../components/ContactForm.vue";
import PageFooter from "../../components/PageFooter.vue";
export default {
  name: "HomePage",
  components: {
    HelloWorld,
    HeroHeader,
    OurService,
    AboutUs,
    OurTrainer,
    ContactForm,
    PageFooter,
  },
};
</script>

<style></style>
