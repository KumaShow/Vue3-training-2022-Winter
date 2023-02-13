<template>
  <div class="text-center" v-if="!cart.carts.length">
    <p class="fs-4">購物車空空的，快去買東西吧</p>
  </div>
  <div v-else>
    <div class="text-end">
      <button
        @click="clearAllCarts"
        class="btn btn-outline-danger"
        type="button"
        :disabled="!cart?.carts?.length"
      >
        清空購物車
      </button>
    </div>
    <table class="table align-middle">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th style="width: 150px">數量/單位</th>
          <th>單價</th>
        </tr>
      </thead>
      <tbody>
        <template v-if="cart.carts">
          <tr v-for="item in cart.carts" :key="item.id">
            <td>
              <button
                @click="deleteItem(item.id)"
                class="btn btn-outline-danger btn-sm"
                type="button"
              >
                <!-- :disabled="loadingItem === item.id" -->
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon_code">
                已套用優惠券
              </div>
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <input
                    v-model.number="item.qty"
                    @blur="updateCartItem(item)"
                    class="form-control"
                    min="1"
                    max="20"
                    type="number"
                  />
                  <!-- :disabled="loadingItem === item.id" -->
                  <span class="input-group-text" id="basic-addon2">{{
                    item.product.unit
                  }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-if="item.coupon_code"
                >折扣價：</small
              >
              {{ item.total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr v-if="cart.total === cart.final_total">
          <td colspan="3" class="text-end">總計</td>
          <td class="text-end">{{ cart.total }}</td>
        </tr>
        <tr v-else>
          <td colspan="3" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cart.final_total }}</td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useCartStore from "../stores/useCartStore.js";
import useLoadingStore from "../stores/useLoadingStore";

export default {
  data() {
    return {
      cartStatus: false,
    };
  },
  mounted() {
    this.getCart();
  },
  computed: {
    ...mapState(useCartStore, ["cart"]),
  },
  methods: {
    ...mapActions(useCartStore, [
      "getCart",
      "clearAllCarts",
      "deleteCartItem",
      "updateCartItem",
    ]),
    ...mapActions(useLoadingStore, ["doAjax"]),

    deleteItem(id) {
      this.deleteCartItem(id);
      this.doAjax(1000);
    },
  },
};
</script>
