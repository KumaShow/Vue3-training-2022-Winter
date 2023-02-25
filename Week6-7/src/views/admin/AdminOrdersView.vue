<template>
  <div class="container my-4">
    <h2 class="text-center my-3">訂單列表</h2>
    <table class="table mt-4 container">
      <thead>
        <tr>
          <th width="15%">訂單日期</th>
          <th width="25%">訂購人資訊</th>
          <th width="30%">訂購商品</th>
          <th width="15%">訂單狀態</th>
          <th width="15%">操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.id" class="align-middle">
          <td>{{ createDate(order.create_at) }}</td>
          <td>
            <div class="d-flex flex-column">
              <span>
                {{ order?.user?.name }}
              </span>
              <a :href="`mailto:${order?.user?.email}`" class="d-block">{{
                order?.user?.email
              }}</a>
            </div>
          </td>
          <td>
            <ul>
              <li v-for="item in order.products" :key="item.id">
                {{ item.product.title }}
              </li>
            </ul>
          </td>
          <td>
            <div class="form-check form-switch">
              <input
                class="form-check-input"
                type="checkbox"
                :id="`paidSwitch${order.id}`"
                @change="updateOrder(order)"
                v-model="order.is_paid"
              />
              <label
                class="form-check-label"
                :class="{
                  'text-success': order.is_paid,
                  'text-danger': !order.is_paid,
                }"
                :for="`paidSwitch${order.id}`"
                >{{ order.is_paid ? "已付款" : "未付款" }}</label
              >
            </div>
          </td>
          <td>
            <div class="btn-group">
              <button
                type="button"
                class="btn btn-outline-primary btn-sm"
                @click="openModal('edit', order)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="openModal('delete', order)"
              >
                刪除
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <!-- 分頁 -->
    <ThePagination :pages="pagination" @get-data="getOrders" />
    <!-- 訂單 Modal -->
    <AdminOrderModal
      @update-order="updateOrder"
      ref="orderModal"
      :order="tempOrder"
    />
    <!-- 刪除訂單 Modal -->
    <AdminOrderDeleteModal
      ref="deleteOrderModal"
      :temp-order="tempOrder"
      @delete-order="deleteOrder"
    />
  </div>
</template>

<script>
import AdminOrderModal from "@/components/admin/AdminOrderModal.vue";
import AdminOrderDeleteModal from "@/components/admin/AdminOrderDeleteModal.vue";
import ThePagination from "@/components/ThePagination.vue";
import useLoadingStore from "@/stores/useLoadingStore";
import useToastMessageStore from "@/stores/useToastMessageStore";
import { mapActions } from "pinia";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  components: {
    AdminOrderModal,
    AdminOrderDeleteModal,
    ThePagination,
  },
  data() {
    return {
      orders: [],
      tempOrder: {},
      pagination: {},
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions(useLoadingStore, ["loadingState"]),
    ...mapActions(useToastMessageStore, ["pushMessage"]),
    // 取得後台訂單資料
    getOrders(page = 1) {
      this.currentPage = page;
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/orders?page=${page}`;
      this.loadingState(true);
      this.$http
        .get(url)
        .then((res) => {
          this.orders = res.data.orders;
          this.pagination = res.data.pagination;
          this.loadingState(false);
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "取得訂單資料失敗",
            content: `${err.response.data.message}`,
          });
          this.loadingState(false);
        });
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

    // 打開編輯訂單 Modal
    openModal(status, order) {
      if (status === "edit") {
        this.tempOrder = { ...order };
        this.$refs.orderModal.openModal();
      } else {
        this.tempOrder = { ...order };
        this.$refs.deleteOrderModal.openModal();
      }
    },

    // 更改訂單資料
    updateOrder(order) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/order/${order.id}`;
      this.loadingState(true);
      this.tempOrder = { ...order };
      this.$http
        .put(url, { data: this.tempOrder })
        .then(() => {
          this.getOrders(this.currentPage);
          this.loadingState(false);
          this.$refs.orderModal.closeModal();
          this.pushMessage({
            title: "更改訂單成功",
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "更改失敗，請稍後再試",
            content: `${err.response.data.message}`,
          });
          this.loadingState(false);
        });
    },

    // 刪除單一訂單
    deleteOrder(id) {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/order/${id}`;
      this.loadingState(true);
      this.$http
        .delete(url)
        .then(() => {
          this.getOrders(this.currentPage);
          this.loadingState(false);
          this.pushMessage({
            title: "已刪除訂單",
          });
        })
        .catch((err) => {
          this.pushMessage({
            style: "danger",
            title: "更改失敗，請稍後再試",
            content: `${err.response.data.message}`,
          });
          this.loadingState(false);
        });
    },
  },
  mounted() {
    this.getOrders();
  },
};
</script>
