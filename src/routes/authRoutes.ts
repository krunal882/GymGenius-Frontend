// user authentication routes
import ForgotPassword from "../pages/userAuth/ForgotPassword.vue";
import ResetPassword from "../pages/userAuth/ResetPassword.vue";
import UserAuth from "../pages/userAuth/UserAuth.vue";
import { createRouter, createWebHistory } from "vue-router";
import Cookies from "js-cookie";

// check if user is not logged-in / registered
const ifNotAuthenticated = (to, from, next) => {
  if (!Cookies.get("token") || Cookies.get("token").length === 0) {
    next();
  } else {
    next("/GymGenius");
  }
};
//routes
const routes = [
  {
    path: "/authentication",
    component: UserAuth,
    beforeEnter: ifNotAuthenticated,
    name: "authentication",
  },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    beforeEnter: ifNotAuthenticated,
    name: "forgotPassword",
  },
  {
    path: "/resetPassword/:token",
    component: ResetPassword,
    beforeEnter: ifNotAuthenticated,
    name: "resetPassword",
  },
];

export const authRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
