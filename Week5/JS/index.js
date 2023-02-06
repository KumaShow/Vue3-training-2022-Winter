import detailProduct from "../component/detailProduct.js";
import formComponent from "../component/formComponent.js";
// const { createPinia } = Pinia;

// 讀取外部的資源
VeeValidateI18n.loadLocaleFromURL("./zh_TW.json");

// Activate the locale
VeeValidate.configure({
  generateMessage: VeeValidateI18n.localize("zh_TW"),
  validateOnInput: true, // 調整為：輸入文字時，就立即進行驗證
});

Object.keys(VeeValidateRules).forEach((rule) => {
  if (rule !== "default") {
    VeeValidate.defineRule(rule, VeeValidateRules[rule]);
  }
});

const app = Vue.createApp({
  data() {
    return {
      apiPath: "benson-vue3",
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      products: [],
      product: {},
      cart: {
        carts: [],
      },
      loadingItem: "",
    };
  },
  components: {
    detailProduct,
    formComponent,
  },
  methods: {
    getProducts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/products/all`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err);
        });
    },

    getProductDetail(product) {
      this.product = product;
      this.$refs.detailProduct.openModal();
    },

    addToCart(id, num = 1) {
      // 外層購物車按鈕預設數量 +1
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      const data = {
        product_id: id,
        qty: num,
      };
      this.loadingItem = id;
      axios
        .post(url, { data })
        .then((res) => {
          alert(res.data.message);
          this.getCart();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err);
        });
    },

    getCart() {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart`;
      axios
        .get(url)
        .then((res) => {
          this.cart = res.data.data;
        })
        .catch((err) => {
          alert(err);
        });
    },

    clearAllCarts() {
      const url = `${this.apiUrl}/api/${this.apiPath}/carts`;

      axios
        .delete(url)
        .then((res) => {
          alert("購物車已清空");
          this.getCart();
        })
        .catch((err) => {
          alert(err);
        });
    },

    deleteCartItem(id) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${id}`;
      this.loadingItem = id;
      axios
        .delete(url)
        .then(() => {
          alert("已刪除");
          this.getCart();
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err);
        });
    },

    updateCartItem(item) {
      const url = `${this.apiUrl}/api/${this.apiPath}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };

      if (!item.qty || item.qty === "e") {
        cart.qty = 1;
        alert("商品數量不得小於 1 個");
      } else if (item.qty >= 20) {
        cart.qty = 20;
        alert("商品數量不得大於 20 個");
      }
      this.loadingItem = item.id;

      axios
        .put(url, { data: cart })
        .then(() => {
          this.getCart();
          alert("數量已更新");
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err);
        });
    },
  },
  mounted() {
    this.getProducts();
    this.getCart();
  },
});

// app.use(createPinia());
// app.use(pinia);
app.component("VForm", VeeValidate.Form);
app.component("VField", VeeValidate.Field);
app.component("ErrorMessage", VeeValidate.ErrorMessage);
app.mount("#app");
