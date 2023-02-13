<!-- BUG: 重新整理會出現驗證錯誤 -->
<template>
  <h2 class="text-center my-3">後台產品列表</h2>
  <div class="text-end">
    <button class="btn btn-primary me-4" @click="openModal('new')">
      建立新的產品
    </button>
  </div>
  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="120">分類</th>
        <th>產品名稱</th>
        <th width="120">原價</th>
        <th width="120">售價</th>
        <th width="100">是否啟用</th>
        <th width="120">編輯</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="product in products" :key="product.id">
        <td>{{ product.category }}</td>
        <td>{{ product.title }}</td>
        <td>{{ product.origin_price }}</td>
        <td>{{ product.price }}</td>
        <td>
          <a
            @click.prevent="product.is_enabled = !product.is_enabled"
            class="text-decoration-none link-dark p-2"
            href="#!"
          >
            <span
              :class="{
                'text-success': product.is_enabled,
                'text-danger': !product.is_enabled,
              }"
            >
              {{ product.is_enabled ? "啟用" : "未啟用" }}
            </span>
          </a>
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
  <ThePagination :pages="pagination" @get-products="getProducts" />
  <!-- 產品 Modal 新增、編輯 -->
  <AdminProductModal
    ref="productModal"
    :is-new="isNew"
    :temp-product="tempProduct"
    @get-products="getProducts"
  />
  <!-- 產品 Modal 刪除 -->
  <AdminProductModalDelete
    ref="deleteProductModal"
    :temp-product="tempProduct"
    @get-products="getProducts"
  />
</template>

<script>
import AdminProductModal from "@/components/AdminProductModal.vue";
import AdminProductModalDelete from "@/components/AdminProductModalDelete.vue";
import ThePagination from "../../components/ThePagination.vue";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: false,
      pagination: {},
    };
  },
  components: {
    AdminProductModal,
    AdminProductModalDelete,
    ThePagination,
  },
  mounted() {
    this.getProducts();
  },
  methods: {
    // 取得後台產品資料
    getProducts(page = 1) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/products?page=${page}`;
      this.$http
        .get(url)
        .then((res) => {
          this.products = res.data.products;
          this.pagination = res.data.pagination;
        })
        .catch((err) => alert(err));
    },

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
          this.$refs.productModal.hide();
          this.getProducts();
        })
        .catch((err) => console.dir(err));
    },

    // 打開 AdminProductModal 元件
    openModal(status, product) {
      if (status === "new") {
        this.isNew = true;
        this.tempProduct = {
          imagesUrl: [],
        };
        // 這裡使用 refs 抓取元件 DOM 實體後，就使用內層元件方法
        this.$refs.productModal.openModal(this.tempProduct);
      } else if (status === "edit") {
        this.isNew = false;
        this.tempProduct = { ...product };
        this.$refs.productModal.openModal(this.tempProduct);
      } else if (status === "delete") {
        this.tempProduct = { ...product };
        this.$refs.deleteProductModal.openModal();
      }
    },
  },
};
</script>

<style lang="scss" scope></style>
