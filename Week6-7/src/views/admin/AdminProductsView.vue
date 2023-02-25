<template>
  <div class="container my-4">
    <h2 class="text-center my-3">後台產品列表</h2>
    <div class="text-end">
      <button class="btn btn-primary me-4" @click="openModal('new')">
        建立新的產品
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="15%">分類</th>
          <th width="35%">產品名稱</th>
          <th width="15%">原價</th>
          <th width="15%">售價</th>
          <th width="10%">是否啟用</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.category }}</td>
          <td>{{ product.title }}</td>
          <td>{{ product.origin_price }}</td>
          <td>{{ product.price }}</td>
          <td>
            <span
              v-if="product.is_enabled === 1"
              class="material-symbols-outlined text-success"
            >
              check_circle
            </span>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', product)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', product)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁元件 -->
    <ThePagination
      v-if="pagination.total_pages > 1"
      :pages="pagination"
      @get-data="getProducts"
    />
    <!-- 產品 Modal 新增、編輯 -->
    <AdminProductModal
      ref="productModal"
      :is-new="isNew"
      :product="tempProduct"
      @get-products="getProducts"
      @update-product="updateProduct"
    />
    <!-- 產品 Modal 刪除 -->
    <AdminProductDeleteModal
      ref="deleteProductModal"
      :temp-product="tempProduct"
      @get-products="getProducts"
      @delete-product="deleteProduct"
    />
  </div>
</template>

<script>
import AdminProductModal from "@/components/admin/AdminProductModal.vue";
import AdminProductDeleteModal from "@/components/admin/AdminProductDeleteModal.vue";
import ThePagination from "@/components/ThePagination.vue";
import useToastMessageStore from "@/stores/useToastMessageStore";
import useLoadingStore from "@/stores/useLoadingStore";
import { mapActions } from "pinia";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  components: {
    AdminProductModal,
    AdminProductDeleteModal,
    ThePagination,
  },
  data() {
    return {
      products: [],
      isEnabled: 0,
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useLoadingStore, ["loadingState"]),
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    // 取得後台產品資料
    getProducts(page = 1) {
      this.currentPage = page;
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/products?page=${page}`;

      this.loadingState(true);

      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
          this.loadingState(false);
        })
        .catch((err) => {
          this.loadingState(false);
          this.pushMessage({
            style: "danger",
            title: "取得產品資料失敗",
            content: `${err.response.data.message}`,
          });
        });
    },

    // 打開 AdminProductModal 元件
    openModal(status, product) {
      if (status === "new") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        // 這裡使用 refs 抓取元件 DOM 實體後，就使用內層元件方法
        this.$refs.productModal.openModal();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.productModal.openModal();
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        this.$refs.deleteProductModal.openModal();
      }
    },

    // 編輯 Product Modal 預設為更新
    updateProduct() {
      // 預設為更新產品
      let url = `${VITE_API}/api/${VITE_API_PATH}/admin/product/${this.tempProduct.id}`;
      let method = "put";

      // 建立新產品
      if (this.isNew === true) {
        url = `${VITE_API}/api/${VITE_API_PATH}/admin/product`;
        method = "post";
      }

      this.$http[method](url, { data: this.tempProduct })
        .then(() => {
          this.getProducts(this.currentPage);
          this.$refs.productModal.closeModal();
          this.pushMessage({
            title: `${method === "put" ? "更新" : "新增"}產品成功`,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: `${method === "put" ? "更新" : "新增"}產品失敗`,
            content: `${err.response.data.message}`,
          });
        });
    },

    // 刪除單一產品
    deleteProduct(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/product/${id}`;

      this.$http
        .delete(url)
        .then(() => {
          this.$refs.deleteProductModal.closeModal();
          this.getProducts(this.currentPage);
          this.pushMessage({
            title: "已刪除產品",
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "刪除產品失敗，請稍後再試",
            content: `${err.response.data.message}`,
          });
        });
    },
  },
  mounted() {
    this.getProducts();
  },
};
</script>
