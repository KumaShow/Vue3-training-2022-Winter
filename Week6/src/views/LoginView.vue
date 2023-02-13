<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div class="w-25">
      <h1 class="h3 mb-3 font-weight-normal text-center">請先登入</h1>
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
  </div>
</template>

<script>
const { VITE_API } = import.meta.env;
export default {
  data() {
    return {
      user: {},
    };
  },
  methods: {
    signIn() {
      this.$http
        .post(`${VITE_API}/admin/signin`, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          this.$router.push("/admin");
        })
        .catch((err) => {
          alert(err.response.data.message);
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
