<template>
  <FrontNavBar />
  <div
    class="login d-flex justify-content-center align-items-center position-relative"
  >
    <div class="w-25">
      <h1 class="h3 mb-3 font-weight-normal text-center">登入後台</h1>
      <form id="form" class="form-signin" @submit.prevent="signIn">
        <div class="form-floating mb-3">
          <input
            type="email"
            class="form-control"
            id="username"
            v-model="user.username"
            placeholder="name@example.com"
            required
            autofocus
          />
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input
            type="password"
            class="form-control"
            id="password"
            v-model="user.password"
            placeholder="Password"
            required
          />
          <label for="password">Password</label>
        </div>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
          登入
        </button>
      </form>
    </div>
    <TheToastMessage />
  </div>
</template>

<script>
import FrontNavBar from "@/components/frontend/FrontNavBar.vue";
import TheToastMessage from "@/components/TheToastMessage.vue";
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";
const { VITE_API } = import.meta.env;

export default {
  components: {
    TheToastMessage,
    FrontNavBar,
  },
  data() {
    return {
      user: {},
    };
  },
  methods: {
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    signIn() {
      this.$http
        .post(`${VITE_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          this.$router.push("/admin");
          this.pushMessage({
            title: "登入成功",
          });
        })
        .catch(() => {
          this.pushMessage({
            style: "danger",
            title: "登入失敗，請重新登入",
            content: "請確認帳號密碼是否正確",
          });
        });
    },
  },
};
</script>

<style lang="scss" scope>
.login {
  height: 100vh;
}
</style>
