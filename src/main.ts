import "bootstrap/dist/css/bootstrap.css";
import "@mdi/font/css/materialdesignicons.css";
import "primevue/resources/themes/aura-light-green/theme.css";
import { createRouter, createWebHistory } from "vue-router";
import store from "./Infostore";
import LandingPage from "./pages/landing/LandingPage.vue";
import StorePage from "./pages/store/StorePage.vue";
import MenCategory from "./pages/store/category/MenCategory.vue";
import WomenCategory from "./pages/store/category/WomenCategory.vue";
import CardioCategory from "./pages/store/category/CardioCategory.vue";
import CycleCategory from "./pages/store/category/CycleCategory.vue";
import AccessoryCategory from "./pages/store/category/AccessoryCategory.vue";
import EquipmentCategory from "./pages/store/category/EquipmentCategory.vue";
import SupplementCategory from "./pages/store/category/SupplementCategory.vue";
import StoreLandingPage from "./pages/store/StoreLandingPage.vue";
import StrengthCategory from "./pages/store/category/StrengthCategory.vue";
import RunningCategory from "./pages/store/category/RunningCategory.vue";
import YogaCategory from "./pages/store/category/YogaCategory.vue";
import ProductDetail from "./components/store/ProductDetail.vue";

import UserAuth from "./pages/userAuth/UserAuth.vue";
import ForgotPassword from "./pages/userAuth/ForgotPassword.vue";
import ResetPassword from "./pages/userAuth/ResetPassword.vue";

import FitnessTrackers from "./pages/fitness-trackers/FitnessTrackers.vue";
import BmiCalculator from "./pages/fitness-trackers/BmiCalculator.vue";
import TrackerLandingPage from "./pages/fitness-trackers/TrackerLandingPage.vue";
import CalorieCalculator from "./pages/fitness-trackers/CalorieCalculator.vue";
import BmrCalculator from "./pages/fitness-trackers/BmrCalculator.vue";
import WaterCalculator from "./pages/fitness-trackers/WaterCalculator.vue";
import FatCalculator from "./pages/fitness-trackers/FatCalculator.vue";
import TdeeCalculator from "./pages/fitness-trackers/TdeeCalculator.vue";

import ProfileSection from "./components/userProfile/ProfileSection.vue";
import SettingSection from "./components/userProfile/SettingSection.vue";
import ProfilePage from "./pages/ProfilePage.vue";
import CartSection from "./components/userProfile/CartSection.vue";
import LogoutSection from "./components/userProfile/LogoutSection.vue";
import PurchaseSection from "./components/userProfile/PurchaseSection.vue";
import BookMarkSection from "./components/userProfile/BookMarkSection.vue";

import FoodSection from "./components/FoodNutritionPage/FoodSection.vue";
import FoodNutrition from "./components/FoodNutritionPage/FoodNutrition.vue";
import FoodItemPage from "./pages/foodSection/FoodItemPage.vue";

import DietPlan from "./components/DietplanPage/DietPlan.vue";

import YogaPage from "./pages/yoga/YogaPage.vue";
import YogaPoses from "./components/YogaPage/YogaPoses.vue";

import ExercisePage from "./pages/exercise/ExercisePage.vue";
import ExerciseInfo from "./components/ExercisePage/ExerciseInfo.vue";

import { createApp } from "vue";
import App from "./App.vue";

import "vuetify/styles";
import { createVuetify } from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

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
    { path: "/authentication", component: UserAuth, name: "authentication" },
    {
      path: "/forgotPassword",
      component: ForgotPassword,
      name: "forgotPassword",
    },
    { path: "/resetPassword", component: ResetPassword, name: "resetPassword" },
    {
      path: "/store",
      component: StorePage,
      children: [
        { path: "", component: StoreLandingPage },
        { path: "men", component: MenCategory, name: "men" },
        { path: "women", component: WomenCategory, name: "women" },
        { path: "cardio", component: CardioCategory, name: "cardio" },
        { path: "cycles", component: CycleCategory, name: "cycles" },
        { path: "strength", component: StrengthCategory, name: "strength" },
        { path: "running", component: RunningCategory, name: "running" },
        { path: "yoga", component: YogaCategory, name: "yoga" },
        {
          path: "accessories",
          component: AccessoryCategory,
          name: "accessories",
        },
        {
          path: "equipments",
          component: EquipmentCategory,
          name: "equipments",
        },
        {
          path: "supplements",
          component: SupplementCategory,
          name: "supplements",
        },
        {
          path: ":category/:id",
          component: ProductDetail,
          name: "productDetail",
        },
      ],
    },
    {
      path: "/fitnessTrackers",
      component: FitnessTrackers,
      children: [
        { path: "", component: TrackerLandingPage },
        {
          path: "bmi-calculator",
          component: BmiCalculator,
          name: "bmiCalculator",
        },
        {
          path: "calorie-calculator",
          component: CalorieCalculator,
          name: "calorieCalculator",
        },
        {
          path: "bmr-calculator",
          component: BmrCalculator,
          name: "bmrCalculator",
        },
        {
          path: "water-calculator",
          component: WaterCalculator,
          name: "waterCalculator",
        },
        {
          path: "fat-calculator",
          component: FatCalculator,
          name: "fatCalculator",
        },
        {
          path: "tdee-calculator",
          component: TdeeCalculator,
          name: "tdeeCalculator",
        },
      ],
    },
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
    {
      path: "/YogaPoses",
      component: YogaPage,
      children: [
        {
          path: "",
          component: YogaPoses,
          name: "yogaPoses",
        },
      ],
    },
    {
      path: "/exercise",
      component: ExercisePage,
      children: [
        {
          path: "",
          component: ExerciseInfo,
          name: "exerciseInfo",
        },
      ],
    },
    {
      path: "/profile",
      component: ProfilePage,
      children: [
        {
          path: "personalInfo",
          component: ProfileSection,
          name: "personalInfo",
        },
        { path: "setting", component: SettingSection, name: "setting" },
        { path: "cart", component: CartSection, name: "cart" },
        { path: "purchase", component: PurchaseSection, name: "purchase" },
        { path: "logout", component: LogoutSection, name: "logout" },
        { path: "bookmark", component: BookMarkSection, name: "bookmark" },
      ],
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Scroll to the top of the page
  window.scrollTo(0, 0);
  next();
});

const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(store);

app.component("font-awesome-icon", FontAwesomeIcon);

app.mount("#app");

import "bootstrap/dist/js/bootstrap.js";
