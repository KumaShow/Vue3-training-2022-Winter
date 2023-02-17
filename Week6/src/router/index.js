import { createRouter, createWebHashHistory } from "vue-router";
import FrontViewLayout from "@/views/FrontViewLayout.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  base: "/Vue3-training-2022-Winter/Week6/dist/",
  routes: [
    {
      path: "/",
      name: "home",
      component: FrontViewLayout,
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("@/views/ProductsView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/views/CartView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/AboutView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/LoginView.vue"),
    },
    {
      path: "/admin",
      name: "admin",
      component: () => import("@/views/admin/DashboardView.vue"),
      children: [
        {
          path: "products",
          name: "adminProducts",
          component: () => import("@/views/admin/AdminProductsView.vue"),
        },
        {
          path: "orders",
          name: "adminOrders",
          component: () => import("@/views/admin/AdminOrdersView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*", // 全部及子路徑下
      component: () => import("../views/NotFound.vue"),
    },
  ],
  linkActiveClass: "active",
});

export default router;
