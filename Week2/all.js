const apiUrl = "https://vue3-course-api.hexschool.io/v2";
const apiPath = "benson-vue3";
const token = document.cookie.replace(
  /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
  "$1"
);
axios.defaults.headers.common["Authorization"] = token;

const app = Vue.createApp({
  data() {
    return {
      products: [],
      productDetail: {},
      tempUrl: "",
    };
  },
  methods: {
    onHover(imageUrl) {
      this.tempUrl = this.productDetail.imageUrl;
      this.productDetail.imageUrl = imageUrl;
    },
    overHover() {
      this.productDetail.imageUrl = this.tempUrl;
    },
    checkAdmin() {
      const url = `${apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {})
        .catch((err) => {
          alert(err.data.message);
          window.location.replace("./login.html");
        });
    },
    logout() {
      const url = `${apiUrl}/logout`;
      axios.post(url).then(() => {
        window.location.replace("./login.html");
      });
    },
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;

      axios
        .get(url)
        .then((res) => {
          console.log(res);
          this.products = res.data.products;
        })
        .catch((err) => console.log(err));
    },
  },
  created() {
    this.checkAdmin();
  },
  mounted() {
    this.getProducts();
  },
}).mount("#app");
