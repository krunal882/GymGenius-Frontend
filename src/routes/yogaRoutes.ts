import YogaPoses from "@/components/YogaPage/YogaPoses.vue";
import YogaPage from "@/pages/yoga/YogaPage.vue";
import { createRouter, createWebHistory } from "vue-router";

const routes = [
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
];

export const yogaRoutes = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});
