import Cookies from "js-cookie";
import DietPlan from "../components/DietplanPage/DietPlan.vue";
import FoodNutrition from "../components/FoodNutritionPage/FoodNutrition.vue";
import FoodSection from "../components/FoodNutritionPage/FoodSection.vue";
import FoodItemPage from "../pages/foodSection/FoodItemPage.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const ifAuthenticated = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/authentication");
  }
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/foodSection",
    component: FoodItemPage,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: FoodSection,
        name: "foodSection",
      },
      {
        path: "nutrition",
        component: FoodNutrition,
        name: "foodNutrition",
      },
      {
        path: "dietPlan",
        component: DietPlan,
        name: "dietPlan",
      },
    ],
  },
];

export const foodRoutes = createRouter({
  history: createWebHistory(),
  routes,
});
