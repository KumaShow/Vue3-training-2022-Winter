import { defineStore } from "pinia";
import axios from "axios";
import Swal from "sweetalert2";
const { VITE_API, VITE_API_PATH } = import.meta.env;

const useCartStore = defineStore("useCartStore", {
  state: () => ({
    cart: {
      carts: [],
    },
    // loadingItem,
  }),
  actions: {
    // 取得購物車資料
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

    // 清空購物車
    clearAllCarts() {
      const url = `${VITE_API}/api/${VITE_API_PATH}/carts`;

      axios
        .delete(url)
        .then(() => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "購物車已清空",
            showConfirmButton: false,
            timer: 1500,
          });
          this.getCart();
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 刪除購物車單一產品
    deleteCartItem(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/cart/${id}`;
      this.loadingItem = id;
      axios
        .delete(url)
        .then(() => {
          this.getCart();
          Swal.fire({
            position: "center",
            icon: "success",
            title: "已刪除",
            showConfirmButton: false,
            timer: 1500,
          });
          this.loadingItem = "";
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 更新購物車產品數量
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
          Swal.fire({
            position: "center",
            icon: "success",
            title: "數量已更新",
            showConfirmButton: false,
            timer: 1500,
          });
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
