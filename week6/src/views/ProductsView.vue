<template>
  <section class="container">
    <h2 class="text-center my-3">所有產品</h2>
    <table class="table align-middle">
      <thead>
        <tr>
          <th>圖片</th>
          <th>商品名稱</th>
          <th>價格</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td style="width: 200px">
            <div
              :style="{ backgroundImage: `url(${product.imageUrl})` }"
              style="
                background-position: center;
                background-size: cover;
                height: 100px;
              "
            ></div>
          </td>
          <td>
            {{ product.title }}
          </td>
          <td>
            <div v-if="product.price === product.origin_price" class="h5">
              {{ product.price }} 元
            </div>
            <div v-else>
              <del class="h6">原價 {{ product.origin_price }} 元</del>
              <div class="h5">現在只要 {{ product.price }} 元</div>
            </div>
          </td>
          <td>
            <div class="btn-group btn-group-sm">
              <!-- 不確定這裡的寫法好不好 -->
              <button
                @click="getProductDetail(this.$refs.productModal, product.id)"
                :disable="loadingItem === product.id"
                class="btn btn-outline-secondary"
                type="button"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="loadingItem === product.id"
                ></i>
                查看更多
              </button>
              <button
                @click="addToCart(product.id)"
                :disable="loadingItem === product.id"
                class="btn btn-outline-danger"
                type="button"
              >
                <i
                  class="fas fa-spinner fa-pulse"
                  v-show="loadingItem === product.id"
                ></i>
                加到購物車
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
  <!-- 產品細節 Modal -->
  <ProductModal ref="productModal" @add-to-cart="addToCart" />
</template>

<script>
import { mapState, mapActions } from "pinia";
import ProductModal from "../components/ProductModal.vue";
import useProductStore from "../stores/useProductStore";

export default {
  components: {
    ProductModal,
  },
  computed: {
    ...mapState(useProductStore, ["products", "loadingItem"]),
  },
  methods: {
    ...mapActions(useProductStore, [
      "getProducts",
      "getProductDetail",
      "addToCart",
    ]),
  },
  mounted() {
    this.getProducts();
  },
};
</script>

<style lang="scss" scope></style>
