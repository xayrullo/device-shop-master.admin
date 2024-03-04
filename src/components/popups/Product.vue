<template>
  <el-dialog
    :width="400"
    @closed="
      onClosePopup({
        code: 0,
        success: false,
        message: MESSAGE.CANCELED,
        data: null,
      })
    "
    title="Product"
    :model-value="props.isPopup"
  >
    <el-form
      ref="productRef"
      :model="product"
      :rules="rules"
      label-position="top"
      @submit.prevent="onSubmitPopup(productRef)"
    >
      <el-form-item label="Category" prop="category">
        <el-select
          v-model="product.category"
          placeholder="Select category"
          clearable
        >
          <el-option
            v-for="item in categories"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Brand" prop="brand">
        <el-input v-model="product.brand" />
      </el-form-item>
      <el-form-item label="Title" prop="title">
        <el-input v-model="product.title" />
      </el-form-item>
      <el-form-item label="Description" prop="description">
        <el-input v-model="product.description" type="textarea" />
      </el-form-item>
      <el-form-item label="Price" prop="price">
        <el-input
          v-model="product.price"
          type="number"
          min="0"
          class="no-arrows"
        />
      </el-form-item>
      <el-form-item label="Stock" prop="stock">
        <el-input
          v-model="product.stock"
          type="number"
          min="0"
          class="no-arrows"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button
          @click="
            onClosePopup({
              code: 0,
              success: false,
              message: MESSAGE.CANCELED,
              data: null,
            })
          "
        >
          Cancel
        </el-button>
        <el-button
          type="primary"
          :disabled="isSameWithOldValue"
          @click="onSubmitPopup(productRef)"
        >
          {{ product.id ? "Update" : "Save" }}
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from "vue";
import { MESSAGE } from "@/core/utils/constants";

import { ElMessage, type FormInstance, type FormRules } from "element-plus";
import type { IProductPost, IProduct } from "@/core/models/product";

import { useDirectoryStore } from "@/stores/directory";
import { useProductStore } from "@/stores/product";
import type IResponse from "@/core/models/response";

const directoryStore = useDirectoryStore();
const productStore = useProductStore();

const props = defineProps<{
  isPopup: boolean;
  data: IProduct | undefined;
}>();
const categories = computed(() => directoryStore.getCategories);
const productRef = ref<FormInstance>();
const product = ref<IProductPost>({
  title: "",
  description: "",
  price: null,
  stock: null,
  brand: "",
  category: "",
  images: [],
  view: true,
});
const isSameWithOldValue = ref(false);
const rules = ref<FormRules>({
  title: {
    required: true,
    message: "Required field",
    trigger: "blur",
  },
  price: {
    required: true,
    message: "Required field",
    trigger: "blur",
  },
  brand: {
    required: true,
    message: "Required field",
    trigger: "blur",
  },
  category: {
    required: true,
    message: "Required field",
    trigger: "blur",
  },
});

watch(
  () => product.value,
  () => {
    if (JSON.stringify(product.value) === JSON.stringify(props.data))
      isSameWithOldValue.value = true;
    else isSameWithOldValue.value = false;
  },
  { deep: true },
);

if (props.data) {
  product.value = JSON.parse(JSON.stringify(props.data));
} else {
  clearData();
}

function clearData() {
  product.value = {
    title: "",
    description: "",
    price: null,
    stock: null,
    brand: "",
    category: "",
    images: [],
    view: true,
  };
}
const emits = defineEmits(["onSubmit", "onClose"]);
const onSubmitPopup = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    try {
      if (valid) {
        if (product.value.id) {
          productStore
            .updateProduct(product.value)
            .then((res) => {
              onClosePopup({
                code: 0,
                success: true,
                message: MESSAGE.UPDATED,
                data: res,
              });
            })
            .catch((err) => {
              ElMessage({
                message: "Something Wrong",
                type: "error",
              });
            });
        } else {
          productStore
            .createProduct(product.value)
            .then((res) => {
              onClosePopup({
                code: 0,
                success: true,
                message: MESSAGE.CREATED,
                data: res,
              });
            })
            .catch((err) => {
              ElMessage({
                message: "Something Wrong",
                type: "error",
              });
            });
        }
      } else {
        // console.log("Error in Submit", fields);
      }
    } catch (error) {
      // console.error("On Submit Popup", error);
    }
  });
};
function onClosePopup(e: IResponse) {
  emits("onClose", e);
}
</script>

<style scoped>
.no-arrows .el-input__inner::-webkit-inner-spin-button,
.no-arrows .el-input__inner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
