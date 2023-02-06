export default {
  data() {
    return {
      modal: null,
    };
  },
  props: ["tempProduct", "isNew"],
  template: `
  <div id="productModal" ref="modal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">輸入圖片網址</label>
                    <input type="text" class="form-control"
                          placeholder="請輸入圖片連結"  v-model="tempProduct.imageUrl">
                  </div>
                  <img class="img-fluid" :src="tempProduct.imageUrl" :alt="tempProduct.title">
                </div>
                <h3 class="mb-3">多圖新增</h3>
                <!-- 判斷是否為陣列 -->
                <div v-if="Array.isArray(tempProduct.imagesUrl)">
                  <div class="mb-1" v-for="(image, key) in tempProduct.imagesUrl" :key="key">
                    <div class="mb-3">
                      <div class="d-flex mb-2">
                        <label for="imageUrl" class="form-label me-auto mb-0">圖片網址</label>
                        <a
                          class="btn btn-sm btn-outline-danger text-decoration-none" href="#!"
                          @click="deleteImage(image)">X
                        </a>
                      </div>
                      <input v-model="tempProduct.imagesUrl[key]" type="text" class="form-control"
                        placeholder="請輸入圖片連結">
                    </div>
                    <img class="img-fluid" :src="image">
                  </div>
                  <!-- v-if 先判斷陣列有沒有內容 || 再判斷 陣列特定索引位置 是否有輸入文字 -->
                  <!-- 當有輸入文字的時候可以新增下一筆 -->
                  <div v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="tempProduct.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="tempProduct.imagesUrl.pop()">
                      取消新增
                    </button>
                  </div>
                </div>
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100" @click="createImages">
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input
                    v-model="tempProduct.title"
                    id="title"
                    class="form-control"
                    placeholder="請輸入標題"
                    type="text"
                  >
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input
                      v-model="tempProduct.category"
                      id="category"
                      class="form-control"
                      placeholder="請輸入分類"
                      type="text"
                    >
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">單位</label>
                    <input
                      v-model="tempProduct.unit"
                      id="unit"
                      class="form-control"
                      placeholder="請輸入單位"
                      type="text"
                    >
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <input
                      v-model.number="tempProduct.origin_price"
                      id="origin_price"
                      class="form-control"
                      min="0"
                      placeholder="請輸入原價"
                      type="number"
                    >
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <input
                      v-model.number="tempProduct.price"
                      id="price"
                      class="form-control"
                      min="0"
                      placeholder="請輸入售價"
                      type="number"
                    >
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea
                    v-model="tempProduct.description"
                    id="description"
                    class="form-control"
                    placeholder="請輸入產品描述"
                    type="text"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea
                    v-model="tempProduct.content"
                    id="description"
                    class="form-control"
                    placeholder="請輸入說明內容"
                    type="text"
                  >
                  </textarea>
                </div>
                <div class="mb-3">
                  <div class="form-check">
                    <input
                      :false-value="0"
                      :true-value="1"
                      v-model="tempProduct.is_enabled"
                      id="is_enabled"
                      class="form-check-input"
                      type="checkbox"
                    >
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
              取消
            </button>
            <button type="button" class="btn btn-primary" @click="updateProduct">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  methods: {
    updateProduct() {
      // 預設為更新產品
      let url = `${apiUrl}/api/${apiPath}/admin/product/${this.tempProduct.id}`;
      let method = "put";

      // 建立新產品
      if (this.isNew === true) {
        url = `${apiUrl}/api/${apiPath}/admin/product`;
        method = "post";
      }

      axios[method](url, { data: this.tempProduct })
        .then(() => {
          this.modal.hide();
          this.$emit("get-products");
        })
        .catch((err) => alert(err));
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },
    deleteImage(imageUrl) {
      const imgsArr = this.tempProduct.imagesUrl;
      const idx = Object.values(imgsArr).findIndex((item) => item === imageUrl);
      this.tempProduct.imagesUrl.splice(idx, 1);
    },
    openModal() {
      this.modal.show();
    },
  },
  mounted() {
    this.modal = new bootstrap.Modal(this.$refs.modal);
  },
};
