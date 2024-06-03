// exercises routes
import Cookies from "js-cookie";
import ExerciseInfo from "../components/ExercisePage/ExerciseInfo.vue";
import ExercisePage from "../pages/exercise/ExercisePage.vue";
import ExerciseDetail from "@/components/ExercisePage/ExerciseDetail.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    path: "/exercise",
    component: ExercisePage,
    children: [
      {
        path: "",
        component: ExerciseInfo,
        name: "exerciseInfo",
      },
      {
        path: "exercise-detail/:id",
        beforeEnter: ifAuthenticated,
        component: ExerciseDetail,
        name: "exerciseDetail",
      },
    ],
  },
];

export const exerciseRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
