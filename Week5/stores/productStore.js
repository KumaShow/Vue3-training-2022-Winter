import { defineStore } from "pinia";

export default defineStore("product", {
  state: () => ({
    product: "",
  }),
  actions: {
    getProduct(id) {
      const url = `${this.apiUrl}/api/${this.apiPath}/product/${id}`;
      axios.get(url).then((res) => {
        console.log(res);
      });
    },
  },
});
