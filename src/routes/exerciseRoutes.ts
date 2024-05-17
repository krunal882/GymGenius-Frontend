import Cookies from "js-cookie";
import ExerciseInfo from "../components/ExercisePage/ExerciseInfo.vue";
import ExercisePage from "../pages/exercise/ExercisePage.vue";
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
    path: "/exercise",
    component: ExercisePage,
    beforeEnter: ifAuthenticated,
    children: [
      {
        path: "",
        component: ExerciseInfo,
        name: "exerciseInfo",
      },
    ],
  },
];

export const exerciseRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
