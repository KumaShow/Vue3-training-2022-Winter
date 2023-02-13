<template>
  <div
    class="modal fade"
    id="productModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    ref="modal"
  >
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img
                class="img-fluid"
                :src="product.imageUrl"
                :alt="product.title"
              />
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{
                product.category
              }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div v-if="product.price === product.origin_price" class="h5">
                {{ product.price }} 元
              </div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <h5 class="h5">現在只要 {{ product.price }} 元</h5>
              </div>
              <div>
                <div class="input-group">
                  <input
                    type="number"
                    class="form-control"
                    min="1"
                    v-model.number="qty"
                  />
                  <button
                    type="button"
                    class="btn btn-primary"
                    @click="addToCart(product.id)"
                  >
                    加入購物車
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import Modal from "bootstrap/js/dist/modal";
import useProductStore from "../stores/useProductStore";
import useLoadingStore from "../stores/useLoadingStore";

export default {
  data() {
    return {
      modal: {},
      qty: 1,
    };
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
  computed: {
    ...mapState(useProductStore, ["product"]),
  },
  methods: {
    ...mapActions(useProductStore, ["addToCart"]),
    ...mapActions(useLoadingStore, ["doAjax"]),

    // 打開 Modal
    openModal() {
      this.modal.show();
      this.qty = 1;
      this.doAjax(1000);
    },

    // 關閉 Modal
    closeModal() {
      this.modal.hide();
      this.qty = 1;
    },
  },
};
</script>
