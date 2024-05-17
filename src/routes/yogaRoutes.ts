import Cookies from "js-cookie";
import YogaPoses from "../components/YogaPage/YogaPoses.vue";
import YogaPage from "../pages/yoga/YogaPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const ifAuthenticated = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/authentication");
  }
};

const routes = [
  {
    path: "/YogaPoses",
    component: YogaPage,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: YogaPoses,
        name: "yogaPoses",
      },
    ],
  },
];

export const yogaRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
