import "bootstrap/dist/css/bootstrap.css";
import "@mdi/font/css/materialdesignicons.css";
import "vue3-toastify/dist/index.css";
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
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { RouteRecordRaw, Router } from "vue-router";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

function addRoutes(router: Router, ...routeCollections: any[]): void {
  routeCollections.forEach((routes) => {
    routes.getRoutes().forEach((route: RouteRecordRaw) => {
      router.addRoute(route);
    });
  });
}

const vuetify = createVuetify({
  components,
  directives,
  ssr: true,
});

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

router.beforeEach((to, from, next) => {
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);

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

app.use(vuetify);
app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
