import Cookies from "js-cookie";
import InfoSection from "../components/userProfile/Admin/InfoSection.vue";
import UsersSection from "../components/userProfile/Admin/UsersSection.vue";
import BookMarkSection from "../components/userProfile/BookMarkSection.vue";
import CartSection from "../components/userProfile/CartSection.vue";
import LogoutSection from "../components/userProfile/LogoutSection.vue";
import ProfileSection from "../components/userProfile/ProfileSection.vue";
import PurchaseSection from "../components/userProfile/PurchaseSection.vue";
import ProfilePage from "../pages/ProfilePage.vue";
import OrdersSection from "@/components/userProfile/Admin/OrdersSection.vue";
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
    path: "/profile",
    component: ProfilePage,
    beforeEnter: ifAuthenticated,
    redirect: "/profile/personalInfo",
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
        path: "Info-admin",
        component: InfoSection,
        name: "Info-admin",
      },
      { path: "Orders", component: OrdersSection, name: "orders" },
    ],
  },
];

export const profileRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
