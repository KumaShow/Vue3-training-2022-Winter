export default {
  template: `
    <div class="my-5 row justify-content-center">
      <v-form ref="form" class="col-md-6" v-slot="{ errors }" @submit="submitOrder">
        <div class="mb-3">
          <label for="email" class="form-label">
            Email <span class="text-danger">*</span>
          </label>
          <v-field
            :class="{ 'is-invalid': errors['email'] }"
            id="email"
            class="form-control"
            name="email"
            placeholder="請輸入 Email"
            type="email"
            rules="email|required"
            v-model="order.user.email"
          ></v-field>
          <error-message name="email" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">
            收件人姓名 <span class="text-danger">*</span>
          </label>
          <v-field
            :class="{ 'is-invalid': errors['姓名'] }"
            id="name"
            class="form-control"
            name="姓名"
            placeholder="請輸入姓名"
            rules="required"
            v-model="order.user.name"
            type="text"
          ></v-field>
          <error-message name="姓名" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">
            收件人電話 <span class="text-danger">*</span>
          </label>
          <v-field
            :class="{ 'is-invalid': errors['電話'] }"
            id="tel"
            class="form-control"
            name="電話"
            placeholder="請輸入電話"
            type="tel"
            v-model="order.user.tel"
            :rules="isPhone"
          ></v-field>
          <error-message name="電話" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">
            收件人地址 <span class="text-danger">*</span>
          </label>
          <v-field
            :class="{ 'is-invalid': errors['地址'] }"
            id="address"
            class="form-control"
            name="地址"
            placeholder="請輸入地址"
            rules="required"
            type="text"
            v-model="order.user.address"
          ></v-field>
          <error-message name="地址" class="invalid-feedback"></error-message>
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">留言</label>
          <textarea id="message" class="form-control" cols="30" rows="10" v-model="order.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger" :disabled="!cart.carts.length">送出訂單</button>
        </div>
      </v-form>
    </div>
  `,
  data() {
    return {
      apiPath: "benson-vue3",
      apiUrl: "https://vue3-course-api.hexschool.io/v2",
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
  props: ["cart", "getCart"],
  methods: {
    submitOrder() {
      const url = `${this.apiUrl}/api/${this.apiPath}/order`;
      const data = this.order;

      if (this.cart?.carts?.length) {
        axios
          .post(url, { data })
          .then((res) => {
            alert(res.data.message);
            this.getCart();
            this.$refs.form.resetForm();
          })
          .catch((err) => {
            alert(err.response.data.message);
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
