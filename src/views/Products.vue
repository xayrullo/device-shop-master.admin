<template>
  <div>
    <el-card class="px-4 sm:px-6 lg:px-8">
      <div class="sm:flex sm:items-center">
        <div class="sm:flex-auto">
          <h1 class="text-base font-semibold leading-6 text-gray-900">
            Products
          </h1>
        </div>
        <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            @click="onAction()"
          >
            Add new product
          </button>
        </div>
      </div>
      <el-table :data="products" border style="width: 100%" class="mt-4">
        <el-table-column prop="title" label="Title" width="180" />
        <el-table-column prop="category" label="Category" width="180" />
        <el-table-column prop="description" label="Description" />
        <el-table-column fixed="right" label="Action" width="150">
          <template #default="{ data }">
            <div class="flex gap-x-6 justify-center">
              <div class="cursor-pointer" @click="onAction(data)">
                <component
                  :is="PencilSquareIcon"
                  class="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                  aria-hidden="true"
                />
              </div>
              <div class="cursor-pointer" @click="onDelete(data)">
                <component
                  :is="TrashIcon"
                  class="hidden h-6 w-5 flex-none text-red-500 sm:block"
                  aria-hidden="true"
                />
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="productStore.pagination.current"
        v-model:page-size="productStore.pagination.limit"
        :page-sizes="[20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="productStore.pagination.total"
        class="w-full mt-4"
        @size-change="paginationSizeChange"
        @current-change="paginationCurrentChange"
      />
      <DeletePopup
        v-if="isDeletePopup"
        title="Are you sure want delete it?"
        @onClose="closedDeletePopup"
      />
      <ProductPopup
        v-if="isActionPopup"
        :data="selectedProduct"
        @on-close="closeActionPopup"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useProductStore } from "@/stores/product";

import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import type { IProduct } from "@/core/models/product";

import DeletePopup from "@/components/popups/Delete.vue";
import ProductPopup from "@/components/popups/Product.vue";
import type IResponse from "@/core/models/response";

const productStore = useProductStore();

const products = computed(() => productStore.getProducts);
const selectedProduct = ref<IProduct>();
const isDeletePopup = ref(false);
const isActionPopup = ref(false);

onMounted(() => {
  productStore.fetchProducts({
    limit: productStore.pagination.limit,
    skip: productStore.pagination.skip,
  });
});

function paginationSizeChange(size) {
  productStore.fetchProducts({
    limit: size,
    skip: 0,
  });
}
function paginationCurrentChange(current) {
  productStore.fetchProducts({
    limit: productStore.pagination.limit,
    skip: productStore.pagination.limit * (current - 1),
  });
}
function onAction(item?: IProduct) {
  isActionPopup.value = true;
  if (item) {
    selectedProduct.value = item;
  }
}
function closeActionPopup(e: IResponse) {
  isActionPopup.value = false;
  selectedProduct.value = {} as IProduct;
}
function onDelete(item: IProduct) {
  isDeletePopup.value = true;
  selectedProduct.value = item;
}
function closedDeletePopup(e: IResponse) {
  isDeletePopup.value = false;
  if (e.success) {
    if (selectedProduct.value)
      productStore.deleteProduct(selectedProduct.value);
    selectedProduct.value = {} as IProduct;
  }
}
</script>
