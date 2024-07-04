// Import styles , Vue and necessary plugins , Vuetify components and directives
import "bootstrap/dist/css/bootstrap.css";
import "@mdi/font/css/materialdesignicons.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createRouter, createWebHistory } from "vue-router";
import store from "./Infostore";
import LandingPage from "./pages/landing/LandingPage.vue";

import { authRoutes } from "./routes/authRoutes";
import { storeRoutes } from "./routes/storeRoutes";
import { trackersRoutes } from "./routes/trackersRoutes";
import { profileRoutes } from "./routes/profileRoutes";
import { foodRoutes } from "./routes/foodSectionRoutes";
import { yogaRoutes } from "./routes/yogaRoutes";
import { exerciseRoutes } from "./routes/exerciseRoutes";
import NotFoundPage from "./pages/404/NotFoundPage.vue";
import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import ToastPlugin from "vue-toast-notification";
import "vue-toast-notification/dist/theme-bootstrap.css";

import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { RouteRecordRaw, Router } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import VImageMagnifier from "v-image-magnifier";

// Function to add routes from multiple collections
function addRoutes(router: Router, ...routeCollections: Router[]): void {
  routeCollections.forEach((routes) => {
    routes.getRoutes().forEach((route: RouteRecordRaw) => {
      router.addRoute(route);
    });
  });
}

// Create Vuetify instance
const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

// Create router instance
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/GymGenius",
    },
    {
      path: "/GymGenius",
      component: LandingPage,
      name: "GymGenius",
    },
    { path: "/:catchAll(.*)", redirect: "/404" },
    {
      path: "/404",
      component: NotFoundPage,
      name: "NotFound",
    },
  ],
});

// Scroll to top on route change
router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

// Create Vue app instance
const app = createApp(App);

// Add additional routes
addRoutes(
  router,
  authRoutes,
  storeRoutes,
  trackersRoutes,
  profileRoutes,
  foodRoutes,
  exerciseRoutes,
  yogaRoutes
);

// Use plugins and components
app.use(vuetify);
app.use(router);
app.use(store);
app.use(ToastPlugin, { position: "top-right" });
app.component("font-awesome-icon", FontAwesomeIcon);
app.use(VImageMagnifier);

// Mount the app
app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
