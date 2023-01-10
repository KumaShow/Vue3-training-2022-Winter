const app = Vue.createApp({
  data() {
    return {
      products: [],
      productDetail: {},
      tempImgUrl: "",
      isShowAdmin: false,
    };
  },
  methods: {
    onHover(imageUrl) {
      this.tempImgUrl = this.productDetail.imageUrl;
      this.productDetail.imageUrl = imageUrl;
    },
    overHover() {
      this.productDetail.imageUrl = this.tempImgUrl;
    },
    checkAdmin() {
      const url = `${apiUrl}/api/user/check`;

      axios
        .post(url)
        .then(() => {
          this.getProducts();
          this.isShowAdmin = true;
        })
        .catch((err) => {
          alert(err.data.message);
          window.location.replace("./login.html");
        });
    },
    logout() {
      const url = `${apiUrl}/logout`;
      axios
        .post(url)
        .then(() => {
          window.location.replace("./login.html");
          this.isShowAdmin = false;
        })
        .catch((err) => console.log(err));
    },
    getProducts() {
      const url = `${apiUrl}/api/${apiPath}/admin/products`;

      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();
  },
}).mount("#app");
