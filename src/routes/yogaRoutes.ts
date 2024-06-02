//yoga routes
import Cookies from "js-cookie";
import YogaPoses from "../components/YogaPage/YogaPoses.vue";
import YogaPage from "../pages/yoga/YogaPage.vue";
import { createRouter, createWebHistory } from "vue-router";
import YogaDetails from "@/components/YogaPage/YogaDetails.vue";

// check if user is logged-in / registered or not
const ifAuthenticated = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/authentication");
  }
};

//routes
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
      {
        path: "yoga-detail/:id",
        component: YogaDetails,
        name: "yogaDetail",
      },
    ],
  },
];

export const yogaRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
