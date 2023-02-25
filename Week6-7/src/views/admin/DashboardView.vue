<template v-if="isAdmin">
  <AdminNavBar />
  <div class="position-relative">
    <section class="container" v-if="this.$route.path === '/admin'">
      <h2 class="text-center my-3">後台</h2>
    </section>
    <RouterView v-if="isAdmin" />
    <TheLoading />
    <TheToastMessage />
  </div>
</template>

<script>
import AdminNavBar from "@/components/admin/AdminNavBar.vue";
import TheLoading from "@/components/TheLoading.vue";
import TheToastMessage from "@/components/TheToastMessage.vue";
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";
const { VITE_API } = import.meta.env;

export default {
  components: {
    AdminNavBar,
    TheLoading,
    TheToastMessage,
  },
  data() {
    return {
      isAdmin: false,
    };
  },
  mounted() {
    this.checkAdmin();
  },
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    checkAdmin() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      this.$http.defaults.headers.common.Authorization = `${token}`;
      const url = `${VITE_API}/api/user/check`;

      if (token) {
        this.$http
          .post(url)
          .then(() => {
            this.isAdmin = true;
          })
          .catch((err) => {
            this.pushMessage({
              style: "danger",
              title: "驗證失敗，請重新登入",
              content: `${err.response.data.message}`,
            });
            this.$router.push("/login");
          });
      } else {
        this.pushMessage({
          style: "danger",
          title: "你尚未登入，請先登入驗證",
        });
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scope>
.dashboard {
  min-height: 100vh;
}
</style>

<!-- 
  後台 TODO

  小功能
    alert、loading元件 
-->
