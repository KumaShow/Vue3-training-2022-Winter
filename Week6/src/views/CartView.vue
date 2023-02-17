<template>
  <section class="container w-75">
    <h2 class="text-center my-4">購物車頁</h2>
    <!-- 購物車列表元件 -->
    <CartList />
    <!-- 表單元件 -->
    <TheForm />
  </section>
</template>

<script>
import CartList from "../components/CartList.vue";
import TheForm from "../components/TheForm.vue";

export default {
  components: {
    CartList,
    TheForm,
  },
};
</script>

<style lang="scss" scope></style>
