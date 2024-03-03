<template>
  <div class="modal">
    <div class="modal-dialog" :style="{ maxWidth: `${width}px` }">
      <div class="modal-content">
        <slot name="modal_body"></slot>
      </div>
    </div>
    <div class="modal-fon"></div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: Number,
    default: 480,
  },
  iconClose: {
    type: Boolean,
    default: true,
  },
  onClose: Function,
});
</script>

<style lang="scss">
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  &-fon {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 15;
  }

  &-dialog {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    z-index: 20;
    border-radius: 12px;
    width: 100%;
  }

  &-content {
    padding: 28px 40px 40px;
  }

  &-close {
    position: absolute;
    top: 14px;
    right: 14px;
  }
}

@media (max-width: 576px) {
  .modal {
    &-content {
      padding: 28px 20px 20px;
    }
    &-dialog {
      max-width: 320px !important;
    }
  }
}
</style>
