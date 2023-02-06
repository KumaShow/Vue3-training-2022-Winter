export default {
  template: `
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span>{{ product.title }}</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-6">
              <img class="img-fluid" :src="product.imageUrl" :alt="product.title">
            </div>
            <div class="col-sm-6">
              <span class="badge bg-primary rounded-pill">{{ product.category }}</span>
              <p>商品描述：{{ product.description }}</p>
              <p>商品內容：{{ product.content }}</p>
              <div v-if="product.price === product.origin_price" class="h5">{{ product.price }} 元</div>
              <div v-else>
                <del class="h6">原價 {{ product.origin_price }} 元</del>
                <h5 class="h5">現在只要 {{ product.price }} 元</h5>
              </div>
              <div>
                <div class="input-group">
                  <input type="number" class="form-control" min="1" v-model.number="qty">
                    <button type="button" class="btn btn-primary" @click="addToCart">加入購物車</button>
                </div>
              </div>
            </div>
            <!-- col-sm-6 end -->
          </div>
        </div>
      </div>
    </div>
  </div>
  `,
  data() {
    return {
      apiPath: "benson-vue3",
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
      modal: {},
      qty: 1,
      isShow: true,
    };
  },
  props: ["product"],
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },
    addToCart() {
      // 發送加入購物車事件給外層
      // const cartItem = {
      //   id: this.product.id,
      //   qty: this.qty,
      // };

      this.$emit("addToCart", this.product.id, this.qty);
      this.closeModal();
      this.qty = 1;
    },
    // getProduct() {
    //   const url = `${this.apiUrl}/api/${this.apiPath}/product/${this.productId}`;
    //   axios.get(url).then((res) => {
    //     this.product = res.data.product;
    //     console.log(this.product);
    //   });
    // },
  },
};
