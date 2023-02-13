<template>
  <header class="header sticky-top">
    <nav class="navbar navbar-expand-lg bg-dark h-100">
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
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav text-white">
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="link-light link-hover" to="/admin"
                >後台</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="link-light link-hover" to="/admin/products"
                >管理產品</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="link-light link-hover" to="/admin/orders"
                >管理訂單</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink class="link-light link-hover" to="/"
                >回首頁</RouterLink
              >
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <a href="#" class="link-light link-hover" @click.prevent="logout"
                >登出</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  methods: {
    logout() {
      document.cookie = `hexToken=; expires=;`;
      alert("已登出!");
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  height: 60px;
}

.link-hover:hover {
  color: #d0cbcb !important;
  position: relative;
  transition: all 0.2s;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: -6px;
    width: 100%;
    height: 1px;
    border-bottom: 2px solid #d0cbcb;
  }
}
</style>
