<template>
  <header class="header sticky-top">
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container">
        <a class="navbar-brand" href="#">Logo</a>
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
          <ul class="navbar-nav">
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink to="/">首頁</RouterLink>
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink to="/products">所有產品</RouterLink>
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink to="/cart">購物車頁</RouterLink>
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink to="/about">關於我們</RouterLink>
            </li>
            <li class="nav-item me-3 text-decoration-none">
              <RouterLink to="/admin">進入後台</RouterLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>
<script></script>
<style lang="scss"></style>
