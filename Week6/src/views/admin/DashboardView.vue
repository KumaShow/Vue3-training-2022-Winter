<template v-if="isAdmin">
  <AdminNavBar />
  <section class="container" v-if="this.$route.path === '/admin'">
    <h2 class="text-center my-3">後台</h2>
  </section>
  <RouterView />
</template>

<script>
import AdminNavBar from "@/components/AdminNavBar.vue";
const { VITE_API } = import.meta.env;

export default {
  components: {
    AdminNavBar,
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
            alert(err.response.data.message);
            this.$router.push("/login");
          });
      } else {
        alert("你尚未登入，請先完成登入!");
        this.$router.push("/login");
      }
    },
  },
};
</script>

<style lang="scss" scope></style>
