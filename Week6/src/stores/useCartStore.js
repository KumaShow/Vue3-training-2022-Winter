import { defineStore } from "pinia";
import axios from "axios";
const { VITE_API, VITE_API_PATH } = import.meta.env;

const useCartStore = defineStore("useCartStore", {
  state: () => ({
    cart: {
      carts: [],
    },
  }),
  actions: {
    getCart() {
      const url = `${VITE_API}/api/${VITE_API_PATH}/cart`;
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
      const url = `${VITE_API}/api/${VITE_API_PATH}/carts`;

      axios
        .delete(url)
        .then(() => {
          alert("購物車已清空");
          this.getCart();
        })
        .catch((err) => {
          alert(err);
        });
    },

    deleteCartItem(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/cart/${id}`;
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
      const url = `${VITE_API}/api/${VITE_API_PATH}/cart/${item.id}`;
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
  getters: {},
});

export default useCartStore;
