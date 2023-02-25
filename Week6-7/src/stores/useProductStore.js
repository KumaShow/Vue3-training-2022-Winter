import { defineStore } from "pinia";
// store 這裡需匯入 axios 方法，否則吃不到全域 this.$http 方法
import axios from "axios";
import useLoadingStore from "./useLoadingStore";
import useToastMessageStore from "./useToastMessageStore";

const { VITE_API, VITE_API_PATH } = import.meta.env;
const { loadingState } = useLoadingStore();
const { pushMessage } = useToastMessageStore();
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

      loadingState(true);

      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          loadingState(false);
        })
        .catch((err) => {
          loadingState(false);
          pushMessage({
            style: "danger",
            title: "取得產品失敗",
            content: `${err.response.data.message}`,
          });
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
      loadingState(true);

      axios
        .post(url, { data })
        .then(() => {
          loadingState(false);
          if (this.isShow) {
            this.modal.closeModal();
            this.isShow = false;
            loadingState(false);
          }
          this.pushMessage({
            title: "已加入購物車",
          });
        })
        .catch((err) => {
          pushMessage({
            style: "danger",
            title: "加入購物車失敗，請稍後再試",
            content: `${err.response.data.message}`,
          });
        });
    },

    // 取得單一產品資料
    getProduct(productId) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/product/${productId}`;
      loadingState(true);
      // 打開前清空上一次產品資料
      this.product = {};
      axios.get(url).then((res) => {
        this.product = res.data.product;
        loadingState(false);
      });
    },
  },
});

export default useProductStore;
