import { defineStore } from "pinia";

const useLoadingStore = defineStore("useLoadingStore", {
  state: () => ({
    isLoading: false,
    fullPage: true,
  }),

  actions: {
    loadingState(boolean) {
      this.isLoading = boolean;
    },
    // doAjax(sec = 3000) {
    //   this.isLoading = true;
    //   // simulate AJAX
    //   setTimeout(() => {
    //     this.isLoading = false;
    //   }, sec);
    // },
    onCancel() {
      console.log("User cancelled the loader.");
    },
  },
});

export default useLoadingStore;
