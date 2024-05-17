import Cookies from "js-cookie";
import ProductDetail from "../components/store/ProductDetail.vue";
import AccessoryCategory from "../pages/store/category/AccessoryCategory.vue";
import CardioCategory from "../pages/store/category/CardioCategory.vue";
import CycleCategory from "../pages/store/category/CycleCategory.vue";
import EquipmentCategory from "../pages/store/category/EquipmentCategory.vue";
import MenCategory from "../pages/store/category/MenCategory.vue";
import RunningCategory from "../pages/store/category/RunningCategory.vue";
import StrengthCategory from "../pages/store/category/StrengthCategory.vue";
import SupplementCategory from "../pages/store/category/SupplementCategory.vue";
import WomenCategory from "../pages/store/category/WomenCategory.vue";
import YogaCategory from "../pages/store/category/YogaCategory.vue";
import StoreLandingPage from "../pages/store/StoreLandingPage.vue";
import StorePage from "../pages/store/StorePage.vue";
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
    path: "/store",
    component: StorePage,
    beforeEnter: ifAuthenticated,
    children: [
      { path: "", component: StoreLandingPage, name: "store" },
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
];

export const storeRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
