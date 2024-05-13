import DietPlan from "../components/DietplanPage/DietPlan.vue";
import FoodNutrition from "../components/FoodNutritionPage/FoodNutrition.vue";
import FoodSection from "../components/FoodNutritionPage/FoodSection.vue";
import FoodItemPage from "../pages/foodSection/FoodItemPage.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/foodSection",
    component: FoodItemPage,
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
      { path: "dietPlan", component: DietPlan, name: "dietPlan" },
    ],
  },
];

export const foodRoutes = createRouter({
  history: createWebHistory(),
  routes,
});
