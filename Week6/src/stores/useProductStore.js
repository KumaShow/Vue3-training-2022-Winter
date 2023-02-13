import { defineStore } from "pinia";
// store 這裡需匯入 axios 方法，否則吃不到全域 this.$http 方法
import axios from "axios";
const { VITE_API, VITE_API_PATH } = import.meta.env;

const useProductStore = defineStore("useProductStore", {
  state: () => ({
    modal: {},
    isShow: false,
    products: [],
    product: {},
    loadingItem: "",
  }),
  actions: {
    // 取得所有產品
    getProducts() {
      const url = `${VITE_API}/api/${VITE_API_PATH}/products/all`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 查看產品細節
    // 傳入 this.$refs.productModal 元件 與 單一產品 id
    getProductDetail(productModal, productId) {
      // 取得單一產品資料後，使用 productModal 內的方法 openModal() 打開 Modal 元件
      this.getProduct(productId);
      this.modal = productModal;
      this.isShow = true;
      this.modal.openModal();
    },
    // 加入購物車
    addToCart(id, num = 1) {
      // 外層購物車按鈕預設數量 +1
      const url = `${VITE_API}/api/${VITE_API_PATH}/cart`;
      const data = {
        product_id: id,
        qty: num,
      };
      this.loadingItem = id;
      axios
        .post(url, { data })
        .then((res) => {
          alert(res.data.message);
          this.loadingItem = "";
          if (this.isShow) {
            this.modal.closeModal();
            this.isShow = false;
          }
        })
        .catch((err) => {
          alert(err);
        });
    },

    // 取得單一產品資料
    getProduct(productId) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/product/${productId}`;
      axios.get(url).then((res) => {
        this.product = res.data.product;
      });
    },
  },
});

export default useProductStore;
