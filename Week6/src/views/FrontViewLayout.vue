<template>
  <FrontNavBar />
  <section class="container my-3" v-if="this.$route.path === '/'">
    <h2 class="text-center">我是首頁</h2>
  </section>
  <RouterView />
</template>

<script>
import FrontNavBar from "@/components/FrontNavBar.vue";

export default {
  components: {
    FrontNavBar,
  },
};
</script>
