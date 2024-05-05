import ForgotPassword from "../pages/userAuth/ForgotPassword.vue";
import ResetPassword from "../pages/userAuth/ResetPassword.vue";
import UserAuth from "../pages/userAuth/UserAuth.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  { path: "/authentication", component: UserAuth, name: "authentication" },
  {
    path: "/forgotPassword",
    component: ForgotPassword,
    name: "forgotPassword",
  },
  {
    path: "/resetPassword/:token",
    component: ResetPassword,
    name: "resetPassword",
  },
];

export const authRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
