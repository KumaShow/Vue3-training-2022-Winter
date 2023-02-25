<template>
  <div class="container my-4">
    <h2 class="text-center my-3">最新消息管理</h2>
    <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        建立新的頁面
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="25%">標題</th>
          <th width="10%">作者</th>
          <th width="30%">描述</th>
          <th width="15%">建立時間</th>
          <th width="10%">是否公開</th>
          <th width="10%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="article in articles" :key="article.id">
          <td>{{ article.title }}</td>
          <td>{{ article.author }}</td>
          <td>{{ article.description }}</td>
          <td>{{ createDate(article.create_at) }}</td>
          <td>
            <div
              :class="{
                'text-success': article.isPublic,
                'text-muted': !article.isPublic,
              }"
            >
              {{ article.isPublic ? "已公開" : "未公開" }}
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="getArticle(article.id)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', article)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!--分頁元件 -->
    <ThePagination
      v-if="pagination.total_pages > 1"
      :pages="pagination"
      @get-data="getArticles"
    />
    <!-- 文章 Modal -->
    <AdminArticleModal
      ref="articleModal"
      :is-new="isNew"
      :article="tempArticle"
      @get-article="getArticle"
      @update-article="updateArticle"
    />
    <!-- 文章 刪除 Modal -->
    <AdminArticleDeleteModal
      ref="deleteArticleModal"
      :article="tempArticle"
      @delete-article="deleteArticle"
    />
  </div>
</template>

<script>
import ThePagination from "@/components/ThePagination.vue";
import AdminArticleModal from "@/components/admin/AdminArticleModal.vue";
import AdminArticleDeleteModal from "@/components/admin/AdminArticleDeleteModal.vue";
import useLoadingStore from "@/stores/useLoadingStore";
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  components: {
    ThePagination,
    AdminArticleModal,
    AdminArticleDeleteModal,
  },
  data() {
    return {
      articles: [],
      tempArticle: {},
      pagination: {},
      currentPage: 1,
      isNew: false,
    };
  },
  methods: {
    ...mapActions(useLoadingStore, ["loadingState"]),
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    // 取得文章資料
    getArticles(page = 1) {
      this.currentPage = page;
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/articles?page=${page}`;
      this.loadingState(true);
      this.$http
        .get(url)
        .then((res) => {
          this.articles = res.data.articles;
          this.pagination = res.data.pagination;
          this.loadingState(false);
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "取得文章資料失敗",
            content: `${err.response.data.message}`,
          });
          this.loadingState(false);
        });
    },

    // 取得單一文章
    getArticle(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/article/${id}`;
      this.$http
        .get(url)
        .then((res) => {
          this.tempArticle = res.data.article;
          this.isNew = false;
          this.$refs.articleModal.openModal();
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "取得文章資料失敗",
            content: `${err.response.data.message}`,
          });
        });
    },

    // 新增、編輯文章
    updateArticle(tempArticle) {
      this.tempArticle = tempArticle;
      let url = `${VITE_API}/api/${VITE_API_PATH}/admin/article/${this.tempArticle.id}`;
      let method = "put";
      let data = this.tempArticle;

      if (this.isNew) {
        url = `${VITE_API}/api/${VITE_API_PATH}/admin/article`;
        method = "post";
        data = tempArticle;
      }
      this.$http[method](url, { data })
        .then(() => {
          this.getArticles(this.currentPage);
          this.$refs.articleModal.closeModal();
          this.pushMessage({
            title: `${method === "put" ? "更新" : "新增"}文章成功`,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: `${method === "put" ? "更新" : "新增"}文章失敗`,
            content: `${err.response.data.message}`,
          });
        });
    },

    // 刪除單一文章
    deleteArticle(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/article/${id}`;
      this.$http
        .delete(url)
        .then(() => {
          this.getArticles(this.currentPage);
          this.$refs.deleteArticleModal.closeModal();
          this.pushMessage({ title: "文章已刪除" });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "刪除文章資料失敗",
            content: `${err.response.data.message}`,
          });
        });
    },

    // 打開 Article Modal 元件
    openModal(status, article) {
      if (status === "new") {
        this.isNew = true;
        this.tempArticle = {
          isPublic: false,
          create_at: new Date().getTime() / 1000,
          tag: [],
        };
        this.$refs.articleModal.openModal();
      } else if (status === "delete") {
        this.tempArticle = { ...article };
        this.$refs.deleteArticleModal.openModal();
      }
    },

    // 轉換時間格式
    createDate(ms) {
      const timer = new Date(ms * 1000);
      const y = timer.getFullYear();
      const m =
        timer.getMonth() + 1 >= 10
          ? timer.getMonth() + 1
          : `0${timer.getMonth() + 1}`;
      const d = timer.getDate() >= 10 ? timer.getDate() : `0${timer.getDate()}`;
      return `${y}/${m}/${d}`;
    },
  },
  mounted() {
    this.getArticles();
  },
};
</script>
