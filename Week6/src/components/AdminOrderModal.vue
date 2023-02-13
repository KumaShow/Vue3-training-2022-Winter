<template>
  <div class="modal" ref="modal" tabindex="-1">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h2>這個人很懶甚麼都還沒做</h2>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <p>訂單編號 {{ orderId }}</p>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Modal from "bootstrap/js/dist/modal";
export default {
  data() {
    return {
      modal: {},
      orderId: "",
    };
  },
  methods: {
    openModal(id) {
      this.modal.show();
      this.orderId = id;
    },
  },
  mounted() {
    this.modal = new Modal(this.$refs.modal);
  },
};
</script>
