<template>
  <div class="my-2">
    <footer
      class="text-center text-lg-start text-white my-3"
      style="background-color: #1c2331"
    >
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <div class="row mt-3">
            <div class="col-md-3 col-lg-4 col-xl-3 mb-2">
              <h6 class="text-uppercase fw-bold pt-12">GymGenius</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
              />
              <p>
                we're dedicated to providing you with a comprehensive fitness
                experience. Our platform offers a range of features designed to
                help you achieve your health and wellness goals.
              </p>
            </div>
            <div
              v-for="(section, index) in sections"
              :key="index"
              :class="section.class"
            >
              <h6 class="text-uppercase fw-bold pt-12">{{ section.title }}</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
              />
              <template v-for="(link, linkIndex) in section.links">
                <p
                  v-if="section.title === 'Contact'"
                  :key="'icon-' + linkIndex"
                >
                  <font-awesome-icon :icon="link.icon" class="mr-3" />
                  {{ link.text }}
                </p>
                <p v-else :key="'link-' + linkIndex">
                  <router-link :to="{ name: link.to }" class="link">
                    {{ link.text }}
                  </router-link>
                </p>
              </template>
            </div>
          </div>
        </div>
      </section>

      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2024 Copyright:
        <a class="link" href="https://gymgenius.com/">gymgenius.com</a>
      </div>
    </footer>
  </div>
</template>

<script>
import { library } from "@fortawesome/fontawesome-svg-core";
library.add(faHome, faEnvelope, faPhone, faPrint);

import {
  faHome,
  faEnvelope,
  faPhone,
  faPrint,
} from "@fortawesome/free-solid-svg-icons";
export default {
  data() {
    return {
      sections: [
        {
          title: "Products",
          class: "col-md-3 col-lg-3 col-xl-2 mx-auto mb-4",
          icon: false,
          links: [
            { to: "equipments", text: "Gym Equipments" },
            { to: "running", text: "Gym Wear" },
            { to: "yoga", text: "Yoga needs" },
            { to: "supplements", text: "Gym Supplements" },
          ],
        },
        {
          title: "Services",
          class: "col-md-3 col-lg-3 col-xl-2 mx-auto mb-4",
          icon: false,
          links: [
            { to: "dietPlan", text: "Diet Plans" },
            { to: "exerciseInfo", text: "Fitness Exercises" },
            { to: "yogaPoses", text: "Yoga Poses" },
            { to: "foodNutrition", text: "Food Nutrition" },
          ],
        },
        {
          title: "Contact",
          class: "col-md-3 col-lg-3 col-xl-2 mx-auto mb-4",
          icon: true,
          links: [
            { text: "New York, NY 10012, US", icon: faHome },
            { text: "gymgenius@gmail.com", icon: faEnvelope },
            { text: "+91 9265635978", icon: faPhone },
            { text: "+91 9265635978", icon: faPrint },
          ],
        },
      ],
    };
  },
};
</script>

<style scoped>
.link {
  color: white;
  text-decoration: none;
  color: inherit;
}
.link:hover {
  color: rgb(255, 0, 0);
}
</style>
