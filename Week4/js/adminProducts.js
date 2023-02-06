import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";
import pagination from "./components/pagination.js";
import deleteModal from "./components/deleteModal.js";
import productModal from "./components/productModal.js";

// let productModal = null;
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
    deleteModal,
    productModal,
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
        this.$refs.productModal.openModal();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.productModal.openModal();
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        this.$refs.delProductModal.openModal();
      }
    },

    delProduct() {
      const url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;

      axios
        .delete(url)
        .then(() => {
          this.getProducts();
          this.$refs.delProductModal.closeModal();
        })
        .catch((err) => alert(err));
    },
  },
});

app.mount("#app");
