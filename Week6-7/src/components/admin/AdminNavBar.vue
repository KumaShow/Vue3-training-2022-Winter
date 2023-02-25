<template>
  <header class="header sticky-top">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark h-100">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="collapse navbar-collapse justify-content-between"
          id="navbarNav"
        >
          <ul class="navbar-nav">
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover active" to="/admin"
                >後台</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover" to="/admin/products"
                >產品管理</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover" to="/admin/orders"
                >訂單管理</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover" to="/admin/coupon"
                >優惠券管理</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover" to="/admin/news"
                >文章管理</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="nav-link link-hover" to="/">回首頁</RouterLink>
            </li>
          </ul>
          <div class="navbar-nav">
            <a href="#" class="nav-link link-hover" @click.prevent="logout"
              >登出</a
            >
          </div>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";

export default {
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    logout() {
      document.cookie = `hexToken=; expires=;`;
      this.pushMessage({
        title: "已登出",
      });
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
}
</style>
