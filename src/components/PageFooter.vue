<template>
  <!-- Remove the container if you want to extend the Footer to full width. -->
  <div class="my-2">
    <!-- Footer -->
    <footer
      class="text-center text-lg-start text-white my-3"
      style="background-color: #1c2331"
    >
      <!-- Section: Social media -->

      <!-- Section: Social media -->

      <!-- Section: Links  -->
      <section class="">
        <div class="container text-center text-md-start mt-5">
          <!-- Grid row -->
          <div class="row mt-3">
            <!-- Grid column -->
            <div class="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
              <!-- Content -->
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
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold pt-12">Products</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
              />
              <p>
                <router-link to="/gym-equipments" class="link"
                  >Gym Equipments</router-link
                >
              </p>
              <p>
                <router-link to="/gym-wear" class="link">Gym Wear</router-link>
              </p>
              <p>
                <router-link to="/yoga-needs" class="link"
                  >Yoga needs</router-link
                >
              </p>
              <p>
                <router-link to="/gym-supplements" class="link"
                  >Gym Supplements</router-link
                >
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold pt-12">Services</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
              />
              <p>
                <router-link to="/diet-plans" class="link"
                  >Diet Plans</router-link
                >
              </p>
              <p>
                <router-link to="/fitness-exercises" class="link"
                  >Fitness Exercises</router-link
                >
              </p>
              <p>
                <router-link to="/yoga-poses" class="link"
                  >Yoga Poses</router-link
                >
              </p>
              <p>
                <router-link to="/food-nutrition" class="link"
                  >Food Nutrition</router-link
                >
              </p>
            </div>
            <!-- Grid column -->

            <!-- Grid column -->
            <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
              <!-- Links -->
              <h6 class="text-uppercase fw-bold pt-12">Contact</h6>
              <hr
                class="mb-4 mt-0 d-inline-block mx-auto"
                style="width: 60px; background-color: #7c4dff; height: 2px"
              />
              <p>
                <font-awesome-icon :icon="icons.faHome" class="mr-3" /> New
                York, NY 10012, US
              </p>
              <p>
                <font-awesome-icon :icon="icons.faEnvelope" class="mr-3" />
                gymgenius@gmail.com
              </p>
              <p>
                <font-awesome-icon :icon="icons.faPhone" class="mr-3" /> +91
                9265635978
              </p>
              <p>
                <font-awesome-icon :icon="icons.faPrint" class="mr-3" /> +91
                9265635978
              </p>
            </div>
            <!-- Grid column -->
          </div>
          <!-- Grid row -->
        </div>
      </section>
      <!-- Section: Links  -->

      <!-- Copyright -->
      <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2)">
        © 2024 Copyright:
        <a class="link" href="https://gymgenius.com/">gymgenius.com</a>
      </div>
      <!-- Copyright -->
    </footer>
    <!-- Footer -->
  </div>
  <!-- End of .container -->
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
      // Define icons for use
      icons: {
        faHome,
        faEnvelope,
        faPhone,
        faPrint,
      },
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
