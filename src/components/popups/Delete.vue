<template>
  <Popup>
    <template #modal_body>
      <div class="mb-7">
        <div
          class="font-medium text-lg mb-4 text-center 576:text-left"
          v-html="props.title"
        ></div>
        <div v-html="props.message" class="text-center 576:text-left"></div>
      </div>
      <div class="flex items-center justify-center 576:justify-between">
        <button
          class="text-center mx-2.5 font-medium py-1.5 w-[130px] border-2 border-red-600 bg-red-600 text-red-950 rounded-md 576:mx-0"
          @click="
            closedModal({
              code: 0,
              success: true,
              message: 'Successfully Delete',
              data: null,
            })
          "
        >
          Delete
        </button>
        <button
          class="text-center mx-2.5 font-medium py-2 w-[130px] bg-gray-300 rounded-md 576:mx-0"
          @click="
            closedModal({
              code: 0,
              success: false,
              message: 'Canceled',
              data: null,
            })
          "
        >
          Cancel
        </button>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import type IResponse from "@/core/models/response";
import Popup from "../Popup.vue";

const props = defineProps({
  title: String,
  message: String,
});
const emits = defineEmits(["onClose"]);

function closedModal(e: IResponse) {
  emits("onClose", e);
}
</script>
