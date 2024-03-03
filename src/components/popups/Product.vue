<template>
  <Popup
    @onClose="
      closedModal({
        code: 0,
        success: false,
        message: 'Canceled',
        data: null,
      })
    "
  >
    <template #modal_body>
      <div class="mb-7">Lorem ipsum dolor sit amet.</div>
      <div class="flex items-center justify-center 576:justify-between">
        <button
          class="text-center mx-2.5 font-medium py-1.5 w-[130px] border-2 border-gray-300 bg-gray-300 rounded-md 576:mx-0"
          @click="
            closedModal({
              code: 0,
              success: true,
              message: 'Successfully Delete',
              data: null,
            })
          "
        >
          Cancel
        </button>
        <button
          class="text-center mx-2.5 font-medium py-2 w-[130px] bg-green-300 text-green-950 rounded-md 576:mx-0"
          @click="onSave()"
        >
          Save
        </button>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { ValidationError } from "yup";
import type IResponse from "@/core/models/response";

import Popup from "../Popup.vue";
import { ref, computed, onMounted } from "vue";

const emits = defineEmits(["onClose"]);

const errors = ref({
  amount: "",
  itemName: "",
  category: "",
  type: "",
});
const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount required"),
  itemName: Yup.string().required("Description required"),
  category: Yup.string().required("Category required"),
  type: Yup.string().required("Type required"),
});
// function validateField(key) {
//   validationSchema
//     .validateAt(key, transaction.value)
//     .then(() => {
//       errors.value[key] = "";
//     })
//     .catch((error) => {
//       errors.value[key] = error.message;
//     });
// }
// if (props.data) {
//   transaction.value = JSON.parse(JSON.stringify(props.data));
// } else {
//   clearData();
// }
// function clearData() {
//   transaction.value = {
//     _id: "",
//     amount: null,
//     expenseDate: new Date().toString(),
//     itemName: "",
//     category: "",
//     type: "",
//   };
// }
onMounted(() => {
  //   categoryStore.fetchCategories();
});

async function onSave() {
  //   try {
  //     await validationSchema.validate(transaction.value, { abortEarly: false });
  //     if (transaction.value._id) {
  //       transactionStore.updateTransaction(transaction.value);
  //       closedModal({
  //         code: 0,
  //         success: true,
  //         message: "UPDATED",
  //         data: transaction.value,
  //       });
  //     } else {
  //       transactionStore.addTransaction(transaction.value);
  //       closedModal({
  //         code: 0,
  //         success: true,
  //         message: "ADDED",
  //         data: transaction.value,
  //       });
  //     }
  //   } catch (error) {
  //     if (error instanceof ValidationError)
  //       error.inner.forEach((err: ValidationError) => {
  //         errors.value[err.path ?? ""] = err.message;
  //       });
  //   }
}
function closedModal(e: IResponse) {
  emits("onClose", e);
}
</script>
