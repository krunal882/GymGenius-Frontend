import Cookies from "js-cookie";
import InfoSection from "../components/userProfile/Admin/InfoSection.vue";
import ProductsSection from "@/components/userProfile/Admin/ProductsSection.vue";
import UsersSection from "../components/userProfile/Admin/UsersSection.vue";
import BookMarkSection from "../components/userProfile/BookMarkSection.vue";
import CartSection from "../components/userProfile/CartSection.vue";
import LogoutSection from "../components/userProfile/LogoutSection.vue";
import ProfileSection from "../components/userProfile/ProfileSection.vue";
import PurchaseSection from "../components/userProfile/PurchaseSection.vue";
import ProfilePage from "../pages/profile-page/ProfilePage.vue";
import OrdersSection from "@/components/userProfile/Admin/OrdersSection.vue";
import { createRouter, createWebHistory } from "vue-router";
import userModule from "@/Infostore/modules/userModule";

const ifAuthenticated = (to, from, next) => {
  if (Cookies.get("token")) {
    next();
  } else {
    next("/authentication");
  }
};

const ifOwner = (to, from, next) => {
  const userRole = userModule.state.role;
  if (Cookies.get("token") && userRole === "owner") {
    next();
  } else {
    next("/404");
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
      {
        path: "users-admin",
        component: UsersSection,
        beforeEnter: ifOwner,
        name: "users-admin",
      },
      {
        path: "Info-admin",
        component: InfoSection,
        beforeEnter: ifOwner,
        name: "Info-admin",
      },
      {
        path: "Orders",
        component: OrdersSection,
        beforeEnter: ifOwner,
        name: "orders",
      },
      {
        path: "Products-admin",
        component: ProductsSection,
        beforeEnter: ifOwner,
        name: "Products-admin",
      },
    ],
  },
];

export const profileRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
