//food nutrition routes
import Cookies from "js-cookie";
import DietPlan from "../components/DietplanPage/DietPlan.vue";
import FoodNutrition from "../components/FoodNutritionPage/FoodNutrition.vue";
import FoodSection from "../components/FoodNutritionPage/FoodSection.vue";
import FoodItemPage from "../pages/foodSection/FoodItemPage.vue";
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import DietDisplay from "@/components/DietplanPage/DietDisplay.vue";
import NutritionDetail from "@/components/FoodNutritionPage/NutritionDetail.vue";

// check if user is logged-in / registered or not
const ifAuthenticated = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/authentication");
  }
};

//routes
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
      {
        path: "diet-detail/:id",
        component: DietDisplay,
        name: "dietDetail",
      },
      {
        path: "food-detail/:id",
        component: NutritionDetail,
        name: "foodDetail",
      },
    ],
  },
];

export const foodRoutes = createRouter({
  history: createWebHistory(),
  routes,
});
