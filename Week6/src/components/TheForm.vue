<template>
  <div class="my-5 row justify-content-center">
    <Form ref="form" class="col-md-6" v-slot="{ errors }" @submit="submitOrder">
      <div class="mb-3">
        <label for="email" class="form-label">
          Email <span class="text-danger">*</span>
        </label>
        <Field
          :class="{ 'is-invalid': errors['email'] }"
          id="email"
          class="form-control"
          name="email"
          placeholder="請輸入 Email"
          type="email"
          rules="email|required"
          v-model="order.user.email"
        ></Field>
        <ErrorMessage name="email" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="name" class="form-label">
          收件人姓名 <span class="text-danger">*</span>
        </label>
        <Field
          :class="{ 'is-invalid': errors['姓名'] }"
          id="name"
          class="form-control"
          name="姓名"
          placeholder="請輸入姓名"
          rules="required"
          v-model="order.user.name"
          type="text"
        ></Field>
        <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="tel" class="form-label">
          收件人電話 <span class="text-danger">*</span>
        </label>
        <Field
          :class="{ 'is-invalid': errors['電話'] }"
          id="tel"
          class="form-control"
          name="電話"
          placeholder="請輸入電話"
          type="tel"
          v-model="order.user.tel"
          :rules="isPhone"
        ></Field>
        <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">
          收件人地址 <span class="text-danger">*</span>
        </label>
        <Field
          :class="{ 'is-invalid': errors['地址'] }"
          id="address"
          class="form-control"
          name="地址"
          placeholder="請輸入地址"
          rules="required"
          type="text"
          v-model="order.user.address"
        ></Field>
        <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
      </div>

      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea
          id="message"
          class="form-control"
          cols="30"
          rows="10"
          v-model="order.message"
        ></textarea>
      </div>
      <div class="text-end">
        <button
          type="submit"
          class="btn btn-danger"
          :disabled="!cart.carts.length"
        >
          送出訂單
        </button>
      </div>
    </Form>
  </div>
</template>

<script>
import { mapActions, mapState } from "pinia";
import useCartStore from "../stores/useCartStore";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      order: {
        user: {
          email: "",
          name: "",
          tel: "",
          address: "",
        },
        message: "",
      },
    };
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
  },
  methods: {
    ...mapActions(useCartStore, ["getCart"]),

    // 提交訂單
    submitOrder() {
      const url = `${import.meta.env.VITE_API}/api/${
        import.meta.env.VITE_API_PATH
      }/order`;
      const data = this.order;

      if (this.cart?.carts?.length) {
        this.$http
          .post(url, { data })
          .then(() => {
            this.getCart();
            Swal.fire({
              position: "center",
              icon: "success",
              title: "訂單已送出成功",
              showConfirmButton: false,
              timer: 1500,
            });
            this.$refs.form.resetForm();
            this.order.message = "";
          })
          .catch((err) => {
            alert(err.response);
          });
      } else {
        alert("請先加入商品才能送出訂單!");
      }
    },

    isPhone(value) {
      const phoneNumber = /^(09)[0-9]{8}$/; // 09開頭共10碼
      return phoneNumber.test(value)
        ? true
        : "需要正確的電話號碼: 09xx xxx xxx";
    },
  },
};
</script>
