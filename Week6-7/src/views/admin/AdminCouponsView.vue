<template>
  <div class="container">
    <h2 class="text-center my-3">優惠券管理</h2>
    <div class="text-end">
      <button class="btn btn-primary" type="button" @click="openModal('new')">
        新增優惠券
      </button>
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th width="30%">名稱</th>
          <th width="20%">折扣百分比</th>
          <th width="20%">到期日</th>
          <th width="20%">是否啟用</th>
          <th width="20%">操作</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in coupons" :key="item.id">
          <tr>
            <th scope="row">{{ item.title }}</th>
            <td>{{ item.percent }}%</td>
            <td>{{ createDate(item.due_date) }}</td>
            <td>
              <span
                v-if="item.is_enabled === 1"
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
                  @click="openModal('edit', item)"
                >
                  編輯
                </button>
                <button
                  type="button"
                  class="btn btn-outline-danger btn-sm"
                  @click="openModal('delete', item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
  <!-- Pagination -->
  <ThePagination
    v-if="pagination.total_pages > 1"
    :pages="pagination"
    @get-data="getCoupons"
  />
  <!-- 優惠券 Modal -->
  <AdminCouponModal
    ref="couponModal"
    :coupon="tempCoupon"
    :is-new="isNew"
    @update-coupon="updateCoupon"
    :create-date="createDate"
  />
  <!-- 優惠券 刪除 Modal -->
  <AdminCouponDeleteModal
    ref="deleteCouponModal"
    :coupon="tempCoupon"
    @delete-coupon="deleteCoupon"
  />
</template>

<script>
import AdminCouponModal from "@/components/admin/AdminCouponModal.vue";
import AdminCouponDeleteModal from "@/components/admin/AdminCouponDeleteModal.vue";
import ThePagination from "@/components/ThePagination.vue";
import useLoadingStore from "@/stores/useLoadingStore";
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  components: {
    AdminCouponModal,
    AdminCouponDeleteModal,
    ThePagination,
  },
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      pagination: {},
      currentPage: 1,
      messages: [],
      isNew: false,
    };
  },
  methods: {
    // 使用 Vue-Loading
    ...mapActions(useLoadingStore, ["loadingState"]),
    ...mapActions(useToastMessageStore, ["pushMessage"]),

    // 取得優惠券資料
    getCoupons(page = 1) {
      this.currentPage = page;
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/coupons?page=${page}`;

      this.loadingState(true);

      this.$http
        .get(url)
        .then((res) => {
          this.coupons = res.data.coupons;
          this.messages = res.data.messages;
          this.pagination = res.data.pagination;
          this.loadingState(false);
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "取得優惠券資料失敗",
            content: `${err.response.data.message}`,
          });
          this.loadingState(false);
        });
    },

    // 新增、編輯優惠券
    updateCoupon(tempCoupon) {
      let url = `${VITE_API}/api/${VITE_API_PATH}/admin/coupon/${tempCoupon.id}`;
      let method = "put";
      let data = this.tempCoupon;

      if (this.isNew) {
        url = `${VITE_API}/api/${VITE_API_PATH}/admin/coupon`;
        method = "post";
        data = tempCoupon;
      }
      this.$http[method](url, { data })
        .then(() => {
          this.getCoupons(this.currentPage);
          this.$refs.couponModal.closeModal();
          this.pushMessage({
            title: `${method === "put" ? "更新" : "新增"}成功`,
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: `${method === "put" ? "更新" : "新增"}失敗`,
            content: `${err.response.data.message}`,
          });
        });
    },

    // 刪除單一優惠券
    deleteCoupon(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/coupon/${id}`;

      this.$http
        .delete(url)
        .then(() => {
          this.getCoupons(this.currentPage);
          this.$refs.deleteCouponModal.closeModal();
          this.pushMessage({
            title: "已刪除優惠券",
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "刪除失敗",
            content: `${err.response.data.message}`,
          });
        });
    },

    // 打開 優惠券 Modal
    openModal(status, coupon) {
      if (status === "new") {
        this.isNew = true;
        this.tempCoupon = {
          due_date: new Date().getTime() / 1000,
        };
        this.$refs.couponModal.openModal();
      } else if (status === "edit") {
        this.isNew = false;
        this.tempCoupon = { ...coupon };
        this.$refs.couponModal.openModal();
      } else {
        this.tempCoupon = { ...coupon };
        this.$refs.deleteCouponModal.openModal();
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
    this.getCoupons();
  },
};
</script>
