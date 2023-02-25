<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog modal-xl">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <h2 class="fs-5">訂單編號 : {{ tempOrder.id }}</h2>
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
              <!-- 訂購人資料 -->
              <div class="col-md-5">
                <h3 class="mb-3">訂購人資料</h3>
                <table class="table">
                  <tbody v-if="tempOrder.user">
                    <tr>
                      <th style="width: 100px">姓名</th>
                      <td>{{ tempOrder.user.name }}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td>{{ tempOrder.user.email }}</td>
                    </tr>
                    <tr>
                      <th>電話</th>
                      <td>{{ tempOrder.user.tel }}</td>
                    </tr>
                    <tr>
                      <th>地址</th>
                      <td>{{ tempOrder.user.address }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <!-- 訂單明細 -->
              <div class="col-md-7">
                <h3 class="mb-3">訂單明細</h3>
                <table class="table">
                  <tbody>
                    <tr>
                      <th style="width: 100px">訂單編號</th>
                      <td>{{ tempOrder.id }}</td>
                    </tr>
                    <tr>
                      <th>下單時間</th>
                      <td>{{ createDate(tempOrder.create_at) }}</td>
                    </tr>
                    <!-- <tr>
                      <th>付款時間</th>
                      <td>
                        <span v-if="tempOrder.paid_date">
                          {{ $filters.date(tempOrder.paid_date) }}
                        </span>
                        <span v-else>時間不正確</span>
                      </td>
                    </tr> -->
                    <tr>
                      <th>付款狀態</th>
                      <td>
                        <strong v-if="tempOrder.is_paid" class="text-success"
                          >已付款</strong
                        >
                        <span v-else class="text-muted">尚未付款</span>
                      </td>
                    </tr>
                    <tr>
                      <th>總金額</th>
                      <td>
                        {{ tempOrder.total }}
                      </td>
                    </tr>
                  </tbody>
                </table>
                <!-- 訂購商品 start -->
                <h4>訂購商品</h4>
                <table class="table">
                  <thead>
                    <tr>
                      <th width="15%"></th>
                      <th width="35%"></th>
                      <th width="20%"></th>
                      <th width="15%"></th>
                      <th width="15%"></th>
                    </tr>
                  </thead>
                  <!-- 產品明細 tbody -->
                  <tbody>
                    <tr
                      v-for="item in tempOrder.products"
                      :key="item.id"
                      class="align-middle"
                    >
                      <td class="text-center">
                        <img
                          :src="item.product.imageUrl"
                          class="object-fit-cover"
                          style="height: 100px; width: 100px"
                        />
                      </td>

                      <td class="fs-5">{{ item.product.title }}</td>

                      <td>NT$ {{ item.product.price }}</td>

                      <td>{{ item.qty }} {{ item.product.unit }}</td>

                      <td class="text-end">$ {{ item.final_total }}</td>
                    </tr>
                  </tbody>
                </table>
                <!-- 訂購商品 End -->
                <div class="d-flex justify-content-end">
                  <div class="form-check">
                    <input
                      class="form-check-input"
                      type="checkbox"
                      value=""
                      id="flexCheckDefault"
                      v-model="tempOrder.is_paid"
                    />
                    <label class="form-check-label" for="flexCheckDefault">
                      <span v-if="tempOrder.is_paid">已付款</span>
                      <span v-else>未付款</span>
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
            type="button"
            class="btn btn-danger"
            @click="$emit('updateOrder', tempOrder)"
          >
            修改訂單
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  props: {
    order: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  emits: ["updateOrder"],
  data() {
    return {
      modal: {},
      tempOrder: {
        products: {},
        user: {},
      },
    };
  },
  watch: {
    order() {
      this.tempOrder = this.order;
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },
    closeModal() {
      this.modal.hide();
    },

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
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>

<style>
.object-fit-cover {
  object-fit: cover;
}
</style>
