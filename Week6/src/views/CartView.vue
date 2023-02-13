<template>
  <section class="container w-75">
    <h2 class="text-center my-3">購物車頁</h2>
    <CartList />
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
  methods: {
    // ...mapActions(cartStore, ["getCart"]),
  },
};
</script>

<style lang="scss" scope></style>
