import DietSection from "../components/userProfile/Admin/DietSection.vue";
import ExerciseSection from "../components/userProfile/Admin/ExerciseSection.vue";
import NutritionSection from "../components/userProfile/Admin/NutritionSection.vue";
import UsersSection from "../components/userProfile/Admin/UsersSection.vue";
import YogaSection from "../components/userProfile/Admin/YogaSection.vue";
import BookMarkSection from "../components/userProfile/BookMarkSection.vue";
import CartSection from "../components/userProfile/CartSection.vue";
import LogoutSection from "../components/userProfile/LogoutSection.vue";
import ProfileSection from "../components/userProfile/ProfileSection.vue";
import PurchaseSection from "../components/userProfile/PurchaseSection.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/profile",
    component: ProfilePage,
    children: [
      {
        path: "personalInfo",
        component: ProfileSection,
        name: "personalInfo",
      },
      { path: "cart", component: CartSection, name: "cart" },
      { path: "purchase", component: PurchaseSection, name: "purchase" },
      { path: "logout", component: LogoutSection, name: "logout" },
      { path: "bookmark", component: BookMarkSection, name: "bookmark" },
      { path: "users-admin", component: UsersSection, name: "users-admin" },
      {
        path: "dietPlan-admin",
        component: DietSection,
        name: "dietPlan-admin",
      },
      {
        path: "exercise-admin",
        component: ExerciseSection,
        name: "exercise-admin",
      },
      {
        path: "nutrition-admin",
        component: NutritionSection,
        name: "nutrition-admin",
      },
      { path: "yoga-admin", component: YogaSection, name: "yoga-admin" },
    ],
  },
];

export const profileRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
