import { createRouter, createWebHashHistory } from "vue-router";
import FrontViewLayout from "@/views/frontend/FrontViewLayout.vue";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  base: "/Vue3-training-2022-Winter/Week6-7/dist/",
  routes: [
    {
      path: "/",
      name: "home",
      component: FrontViewLayout,
      children: [
        {
          path: "products",
          name: "products",
          component: () => import("@/views/frontend/ProductsView.vue"),
        },
        {
          path: "cart",
          name: "cart",
          component: () => import("@/views/frontend/CartView.vue"),
        },
        {
          path: "about",
          name: "about",
          component: () => import("@/views/frontend/AboutView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("@/views/frontend/LoginView.vue"),
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
        {
          path: "coupon",
          name: "adminCoupon",
          component: () => import("@/views/admin/AdminCouponsView.vue"),
        },
        {
          path: "news",
          name: "adminNews",
          component: () => import("@/views/admin/AdminArticlesView.vue"),
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*", // 全部及子路徑下
      component: () => import("@/views/frontend/NotFound.vue"),
    },
  ],
  linkActiveClass: "active",
});

export default router;
