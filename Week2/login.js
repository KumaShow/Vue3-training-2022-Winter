import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

createApp({
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      const apiUrl = "https://vue3-course-api.hexschool.io/v2";
      const data = {
        username: this.username,
        password: this.password,
      };

      axios
        .post(`${apiUrl}/admin/signin`, data)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `hexToken=${token}; expires=${new Date(expired)};`;
          window.location = "./index.html";
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
}).mount("#app");
