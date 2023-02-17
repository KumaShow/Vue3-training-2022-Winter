<template>
  <h2 class="text-center my-3">訂單列表</h2>
  <table class="table mt-4 container">
    <thead>
      <tr>
        <th width="15%">訂單日期</th>
        <th width="25%">訂單編號</th>
        <th width="20%">訂購人</th>
        <th width="20%">信箱</th>
        <th width="10%">訂單狀態</th>
        <th width="10%">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="order in orders" :key="order.id" class="align-middle">
        <td>{{ createDate(order.create_at) }}</td>
        <td>{{ order.id }}</td>
        <td>{{ order.user.name }}</td>
        <td>{{ order.user.email }}</td>
        <td>
          <span
            :class="{
              'text-success': order.is_paid,
              'text-danger': !order.is_paid,
            }"
            >{{ order.is_paid ? "已付款" : "未付款" }}
          </span>
        </td>
        <td>
          <button
            class="btn btn-outline-primary"
            type="button"
            @click="openModal(order.id)"
          >
            編輯
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  <!-- 訂單 Modal -->
  <AdminOrderModal ref="orderModal" />
  <!-- Loading 元件 -->
  <TheLoading />
</template>

<script>
import AdminOrderModal from "@/components/AdminOrderModal.vue";
import TheLoading from "@/components/TheLoading.vue";
import useLoadingStore from "@/stores/useLoadingStore";
import { mapActions } from "pinia";
const { VITE_API, VITE_API_PATH } = import.meta.env;

export default {
  components: {
    AdminOrderModal,
    TheLoading,
  },
  data() {
    return {
      orders: [],
      pagination: {},
    };
  },
  mounted() {
    this.getOrders();
  },
  computed: {
    orderDate() {
      return this.orders.create_at;
    },
  },
  methods: {
    ...mapActions(useLoadingStore, ["loadingState"]),

    // 取得後台訂單資料
    getOrders() {
      const url = `${VITE_API}/api/${VITE_API_PATH}/admin/orders`;
      this.loadingState(true);
      this.$http.get(url).then((res) => {
        this.orders = res.data.orders;
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
    openModal(id) {
      this.$refs.orderModal.openModal(id);
    },
  },
};
</script>

<style lang="scss" scope></style>
