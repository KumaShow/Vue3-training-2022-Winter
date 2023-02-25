<template>
  <div class="modal fade" ref="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header bg-dark text-light">
          <span v-if="isNew">新增優惠券</span>
          <span v-else>修改優惠券</span>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <Form
          ref="form"
          class=""
          v-slot="{ errors }"
          @submit="$emit('update-coupon', tempCoupon)"
        >
          <div class="modal-body">
            <div class="container">
              <div class="mb-3">
                <label for="couponTitle" class="form-label">
                  標題 <span class="text-danger">*</span>
                </label>
                <Field
                  :class="{ 'is-invalid': errors['couponTitle'] }"
                  id="couponTitle"
                  class="form-control"
                  name="couponTitle"
                  placeholder="請輸入標題"
                  type="text"
                  rules="required"
                  v-model="tempCoupon.title"
                ></Field>
                <ErrorMessage
                  name="couponTitle"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="couponCode" class="form-label">
                  優惠碼 <span class="text-danger">*</span>
                </label>
                <Field
                  :class="{ 'is-invalid': errors['couponCode'] }"
                  id="couponCode"
                  class="form-control"
                  name="couponCode"
                  placeholder="請輸入優惠碼"
                  type="text"
                  rules="required"
                  v-model="tempCoupon.code"
                ></Field>
                <ErrorMessage
                  name="couponCode"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3">
                <label for="couponDueDate" class="form-label"
                  >到期日 <span class="text-danger">*</span></label
                >
                <input
                  type="date"
                  class="form-control"
                  id="couponDueDate"
                  v-model="due_date"
                />
              </div>

              <div class="mb-3">
                <label for="couponPercent" class="form-label">
                  折扣百分比 <span class="text-danger">*</span>
                </label>
                <Field
                  :class="{ 'is-invalid': errors['couponPercent'] }"
                  id="couponPercent"
                  class="form-control"
                  name="couponPercent"
                  placeholder="請輸入折扣百分比"
                  type="number"
                  min="0"
                  max="100"
                  rules="min_value:0|max_value:100|required"
                  v-model.number="tempCoupon.percent"
                  @blur="checkPercent"
                ></Field>
                <ErrorMessage
                  name="couponPercent"
                  class="invalid-feedback"
                ></ErrorMessage>
              </div>

              <div class="mb-3 form-check">
                <input
                  :false-value="0"
                  :true-value="1"
                  type="checkbox"
                  class="form-check-input"
                  id="couponActive"
                  v-model.number="tempCoupon.is_enabled"
                />
                <label class="form-check-label" for="couponActive"
                  >是否啟用</label
                >
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
            <button type="submit" class="btn btn-danger" :disabled="!checkDate">
              <span v-if="isNew">新增優惠券</span>
              <span v-else>修改優惠券</span>
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
import Swal from "sweetalert2";

export default {
  props: {
    coupon: {
      type: Object,
      default() {
        return {};
      },
    },
    createDate: {
      type: Function,
    },
    isNew: {
      type: Boolean,
      default: true,
    },
  },
  emits: ["update-coupon"],
  data() {
    return {
      modal: {},
      tempCoupon: {},
      due_date: "",
      todayUnix: "",
      checkDate: true,
    };
  },
  watch: {
    coupon() {
      this.tempCoupon = this.coupon;
      if (this.isNew) {
        this.tempCoupon.is_enabled = 1;
      }

      // 將時間格式改為 YYYY-MM-DD
      const dateAndTime = new Date(this.tempCoupon.due_date * 1000)
        .toISOString()
        .split("T");
      [this.due_date] = dateAndTime;
    },

    due_date() {
      this.tempCoupon.due_date = Math.floor(new Date(this.due_date) / 1000);

      if (this.isNew) {
        if (this.tempCoupon.due_date < this.todayUnix) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "到期日必需大於今天",
            showConfirmButton: true,
          });
          this.checkDate = false;
        } else {
          this.checkDate = true;
        }
      }
    },
  },
  methods: {
    openModal() {
      this.modal.show();
    },

    closeModal() {
      this.modal.hide();
    },

    // 取得今天日期的 Unix 格式
    getTodayUnixTime() {
      const [today] = new Date(Date.now()).toISOString().split("T");
      this.todayUnix = Math.floor(new Date(today) / 1000);
    },

    // 檢查折扣百分比介於 0 - 100
    checkPercent() {
      if (this.tempCoupon.percent > 100 || this.tempCoupon.percent < 0) {
        if (this.tempCoupon.percent > 100) {
          this.tempCoupon.percent = 100;
        } else if (this.tempCoupon.percent < 0) {
          this.tempCoupon.percent = 0;
        }
      }
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
    this.getTodayUnixTime();
  },
};
</script>

<style>
.object-fit-cover {
  object-fit: cover;
}
</style>
