<template>
  <section class="container w-75">
    <h2 class="text-center my-4">購物車頁</h2>
    <!-- 購物車列表元件 -->
    <CartList />
    <!-- 表單元件 -->
    <TheForm />
    <!-- Loading 元件 -->
    <TheLoadingVue />
  </section>
</template>

<script>
import { mapActions } from "pinia";
import CartList from "../components/CartList.vue";
import TheForm from "../components/TheForm.vue";
import TheLoadingVue from "../components/TheLoading.vue";
import useLoadingStore from "../stores/useLoadingStore";

export default {
  components: {
    CartList,
    TheForm,
    TheLoadingVue,
  },
  methods: {
    ...mapActions(useLoadingStore, ["doAjax"]),
  },
  mounted() {
    this.doAjax(1000);
  },
};
</script>

<style lang="scss" scope></style>
