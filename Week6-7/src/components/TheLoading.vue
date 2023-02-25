<template>
  <div class="vl-parent">
    <loading
      v-model:active="isLoading"
      :can-cancel="false"
      :on-cancel="onCancel"
      :is-full-page="fullPage"
    />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useLoadingStore from "@/stores/useLoadingStore";
import Loading from "vue-loading-overlay";
import "vue-loading-overlay/dist/css/index.css";

export default {
  components: {
    Loading,
  },
  // 將 vue-loading 資料、方法移到 useLoadingStore 管理
  computed: {
    ...mapState(useLoadingStore, ["isLoading", "fullPage"]),
  },
  methods: {
    ...mapActions(useLoadingStore, ["doAjax", "onCancel"]),
  },
};
</script>
