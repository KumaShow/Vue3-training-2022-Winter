import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./components/pagination.js";
// import deleteModal from "./components/deleteModal.js";

let productModal = null;
let delProductModal = null;

const app = createApp({
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      isShowAdmin: false,
      pagination: {},
    };
  },
  components: {
    pagination,
    // deleteModal,
  },
  mounted() {
    // 取出 token，並設定 axios 預設 header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/,
      "$1"
    );
    axios.defaults.headers.common["Authorization"] = token;

    this.checkAdmin();
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
        .catch((err) => alert(err));
    },

    getProducts(page = 1) {
      const url = `${apiUrl}/api/${apiPath}/admin/products?page=${page}`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => alert(err));
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
  },
});

app.component("productModal", {
  template: "#productModal",
  props: ["tempProduct", "isNew"],
  mounted() {
    // 綁定 Modal DOM
    productModal = new bootstrap.Modal(document.getElementById("productModal"));
  },
  methods: {
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
          this.$emit("get-products");
        })
        .catch((err) => alert(err));
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
});

app.component("deleteModal", {
  template: "#deleteModal",
  props: ["tempProduct"],
  mounted() {
    delProductModal = new bootstrap.Modal(
      document.getElementById("delProductModal")
    );
  },
  methods: {
    delProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then(() => {
          this.hideModal();
          this.$emit("getProducts");
        })
        .catch((err) => alert(err));
    },
    hideModal() {
      delProductModal.hide();
    },
  },
});

app.mount("#app");
