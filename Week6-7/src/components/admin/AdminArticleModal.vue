<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <Form ref="form" class="" v-slot="{ errors }" @submit="submitArticle">
          <div class="modal-header bg-dark text-light">
            <h2 class="fs-5">編輯文章</h2>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container-fluid">
              <div class="row">
                <div class="col-md-5">
                  <div class="mb-3">
                    <label for="articleTitle" class="form-label"
                      >標題 <span class="text-danger">*</span></label
                    >
                    <Field
                      type="text"
                      :class="{ 'is-invalid': errors['articleTitle'] }"
                      class="form-control"
                      id="articleTitle"
                      name="articleTitle"
                      rules="required"
                      placeholder="請輸入標題"
                      v-model="tempArticle.title"
                    />
                    <ErrorMessage
                      name="articleTitle"
                      class="invalid-feedback"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="articleAuthor" class="form-label"
                      >作者 <span class="text-danger">*</span></label
                    >
                    <Field
                      type="text"
                      :class="{ 'is-invalid': errors['articleAuthor'] }"
                      class="form-control"
                      id="articleAuthor"
                      name="articleAuthor"
                      placeholder="請入作者"
                      rules="required"
                      v-model="tempArticle.author"
                    />
                    <ErrorMessage
                      name="articleAuthor"
                      class="invalid-feedback"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="articleImageUrl" class="form-label"
                      >輸入圖片網址</label
                    >
                    <input
                      type="text"
                      class="form-control"
                      id="articleImageUrl"
                      placeholder="請入圖片網址"
                      v-model="tempArticle.image"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="articleCreateDate" class="form-label"
                      >文章建立日期</label
                    >
                    <input
                      type="date"
                      class="form-control"
                      id="articleCreateDate"
                      v-model="create_at"
                      readonly
                    />
                  </div>
                </div>
                <div class="col-md-7">
                  <label for="tag" class="form-label">標籤</label>
                  <div class="row gx-1 mb-3">
                    <div
                      class="col-md-2 mb-1"
                      v-for="(label, key) in tempArticle.tag"
                      :key="key"
                    >
                      <div class="input-group input-group-sm">
                        <input
                          type="text"
                          class="form-control form-control"
                          id="tag"
                          v-model="tempArticle.tag[key]"
                          placeholder="請輸入標籤"
                        />
                        <button
                          type="button"
                          class="btn btn-outline-danger"
                          @click="tempArticle.tag.splice(key, 1)"
                        >
                          <i class="bi bi-x"></i>
                        </button>
                      </div>
                    </div>
                    <div
                      class="col-md-2 mb-1"
                      v-if="
                        tempArticle.tag[tempArticle.tag.length - 1] ||
                        !tempArticle.tag.length
                      "
                    >
                      <button
                        class="btn btn-outline-primary btn-sm d-block w-100"
                        type="button"
                        @click="tempArticle.tag.push('')"
                      >
                        新增標籤
                      </button>
                    </div>
                  </div>
                  <div class="mb-3">
                    <label for="articleDescription" class="form-label"
                      >文章描述 <span class="text-danger">*</span></label
                    >
                    <Field
                      type="text"
                      :class="{ 'is-invalid': errors['articleDescription'] }"
                      class="form-control"
                      id="articleDescription"
                      name="articleDescription"
                      rules="required"
                      v-model="tempArticle.description"
                      placeholder="請輸入文章描述"
                    />
                    <ErrorMessage
                      name="articleDescription"
                      class="invalid-feedback"
                    />
                  </div>

                  <div class="mb-3">
                    <p class="mb-1">
                      文章內容
                      <span class="text-danger">*</span>
                    </p>
                    <ckeditor
                      id="ckeditor"
                      :editor="editor"
                      :config="editorConfig"
                      v-model="tempArticle.content"
                    ></ckeditor>
                  </div>

                  <div class="mb-3">
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        v-model="tempArticle.isPublic"
                        id="isPublic"
                      />
                      <label class="form-check-label" for="isPublic">
                        是否公開
                      </label>
                    </div>
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
              type="submit"
              class="btn btn-danger"
              :disabled="!tempArticle.content"
            >
              <span v-if="isNew">新增文章</span>
              <span v-else>修改文章</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  props: {
    article: {
      type: Object,
      default() {
        return {};
      },
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update-article"],
  data() {
    return {
      modal: {},
      tempArticle: {
        tag: [""],
      },
      create_at: "",
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ["heading", "|", "bold", "italic"],
      },
    };
  },
  watch: {
    article() {
      this.tempArticle = {
        ...this.article,
        tag: this.article.tag || [],
        isPublic: this.article.isPublic || false,
      };

      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempArticle.create_at * 1000)
        .toISOString()
        .split("T");
      [this.create_at] = dateAndTime;
    },

    create_at() {
      this.tempArticle.create_at = Math.floor(new Date(this.create_at) / 1000);
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },

    // 新增文章
    submitArticle() {
      if (this.tempArticle.content) {
        this.$emit("update-article", this.tempArticle);
      } else {
        alert("必須輸入文章內容");
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style>
.ck-editor__editable_inline {
  min-height: 300px;
}
</style>
