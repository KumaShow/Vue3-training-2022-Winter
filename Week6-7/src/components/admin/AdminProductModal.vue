<template>
  <div
    id="productModal"
    ref="modal"
    class="modal fade"
    tabindex="-1"
    aria-labelledby="productModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 id="productModalLabel" class="modal-title">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
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
            <div class="col-sm-4">
              <div class="mb-2">
                <h3 class="mb-3">主圖新增</h3>
                <div class="mb-3">
                  <label for="imageUrl" class="form-label"
                    >輸入主要圖片網址</label
                  >
                  <input
                    type="text"
                    class="form-control"
                    placeholder="請輸入圖片連結"
                    v-model="tempProduct.imageUrl"
                  />
                </div>
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label"
                  >或 上傳圖片
                  <!-- <i
                    class="fas fa-spinner fa-spin"
                    v-if="status.fileUploading"
                  ></i> -->
                </label>
                <input
                  type="file"
                  id="customFile"
                  class="form-control"
                  ref="fileInput"
                  @blur="uploadFile"
                />
              </div>
              <img
                class="img-fluid mb-3"
                :src="tempProduct.imageUrl"
                :alt="tempProduct.title"
              />

              <h3 class="mb-3">多圖新增</h3>
              <!-- 判斷是否為陣列 -->
              <div v-if="Array.isArray(tempProduct.imagesUrl)">
                <div
                  class="mb-1"
                  v-for="(image, key) in tempProduct.imagesUrl"
                  :key="key"
                >
                  <div class="mb-3">
                    <div class="d-flex mb-2">
                      <label for="imageUrl" class="form-label me-auto mb-0"
                        >圖片網址</label
                      >
                      <a
                        class="btn btn-sm btn-outline-danger text-decoration-none"
                        @click.prevent="deleteImage(image)"
                        >X
                      </a>
                    </div>
                    <input
                      v-model="tempProduct.imagesUrl[key]"
                      type="text"
                      class="form-control"
                      placeholder="請輸入圖片連結"
                    />
                  </div>
                  <img class="img-fluid" :src="image" />
                </div>
                <!-- v-if 先判斷陣列有沒有內容 || 再判斷 陣列特定索引位置 是否有輸入文字 -->
                <!-- 當有輸入文字的時候可以新增下一筆 -->
                <div
                  v-if="
                    !tempProduct.imagesUrl.length ||
                    tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]
                  "
                >
                  <button
                    class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')"
                  >
                    新增圖片
                  </button>
                </div>
                <div v-else>
                  <button
                    class="btn btn-outline-danger btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.pop()"
                  >
                    取消新增
                  </button>
                </div>
              </div>
              <div v-else>
                <button
                  class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImages"
                >
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
                />
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
                  />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input
                    v-model="tempProduct.unit"
                    id="unit"
                    class="form-control"
                    placeholder="請輸入單位"
                    type="text"
                  />
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
                  />
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
                  />
                </div>
              </div>
              <hr />

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
                  />
                  <label class="form-check-label" for="is_enabled"
                    >是否啟用</label
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-outline-secondary"
            data-bs-dismiss="modal"
          >
            取消
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click="$emit('update-product', tempProduct)"
          >
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  props: {
    isNew: {
      type: Boolean,
    },
    product: {
      type: Object,
      default() {
        return {
          imagesUrl: [],
        };
      },
    },
  },
  emits: ["update-product"],
  data() {
    return {
      modal: null,
      tempProduct: {
        imagesUrl: [],
      },
      status: {},
    };
  },
  watch: {
    product() {
      this.tempProduct = this.product;
    },
  },
  methods: {
    // 產生新增圖片
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push("");
    },

    // 刪除新增的圖片
    deleteImage(imageUrl) {
      const imgsArr = this.tempProduct.imagesUrl;
      const idx = Object.values(imgsArr).findIndex((item) => item === imageUrl);
      this.tempProduct.imagesUrl.splice(idx, 1);
    },

    // 打開 Modal
    openModal() {
      this.modal.show();
    },
    // 關閉 Modal
    closeModal() {
      this.modal.hide();
    },

    // 上傳圖片
    uploadFile() {
      const file = this.$refs.fileInput.files[0];
      // 產生一個表單格式的物件
      const formData = new FormData();
      formData.append("file-to-upload", file);
      console.log(this.formData);
      this.$http
        .post(`${VITE_API}/api/${VITE_API_PATH}/admin/upload`, formData)
        .then((res) => {
          console.log(res);
          this.tempProduct.imageUrl = res.data.imageUrl;
          this.$refs.files.value = "";
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
