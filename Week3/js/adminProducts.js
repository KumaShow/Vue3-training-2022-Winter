import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

let productModal = null;
let delProductModal = null;

createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isShowAdmin: false,
    };
  },
  mounted() {
    // 取出 token，並設定 axios 預設 header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();

    // 綁定 Modal DOM
    productModal = new bootstrap.Modal(document.getElementById("productModal"));
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
  },
  methods: {
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

    updateProduct() {
      // 預設為更新產品
      let url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      let method = "put";

      // 建立新產品
      if (this.isNew === true) {
        url = `${apiUrl}/api/${apiPath}/admin/product`;
        method = "post";
      }

      axios[method](url, { data: this.tempProduct })
        .then(() => {
          productModal.hide();
          this.getProducts();
        })
        .catch((err) => console.dir(err));
    },

    delProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then(() => {
          delProductModal.hide();
          this.getProducts();
        })
        .catch((err) => console.log(err));
    },

    openModal(status, product) {
      if (status === "new") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        productModal.show();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct = { ...product };
        productModal.show();
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        delProductModal.show();
      }
    },

    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },

    deleteImage(imageUrl) {
      const imgsArr = this.tempProduct.imagesUrl;
      const idx = Object.values(imgsArr).findIndex((item) => item === imageUrl);
      this.tempProduct.imagesUrl.splice(idx, 1);
    },
  },
}).mount("#app");
