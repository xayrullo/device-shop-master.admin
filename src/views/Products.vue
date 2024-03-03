<template>
  <div class="px-4 sm:px-6 lg:px-8">
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
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0 w-full">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Title
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                >
                  Created Date
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  Actions
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                >
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, ind) in products" :key="ind">
                <td
                  :class="[
                    ind !== products.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                  ]"
                >
                  <div class="flex-auto">
                    <div class="flex items-start gap-x-3">
                      <div class="text-sm font-medium leading-6 text-gray-900">
                        {{ item.title }}
                      </div>
                      <div
                        :class="[
                          viewAction[item.view ? 'available' : 'notAvailable'],
                          'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset',
                        ]"
                      >
                        Active
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  :class="[
                    ind !== products.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell',
                  ]"
                >
                  {{ item.category }}
                </td>
                <td
                  :class="[
                    ind !== products.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell',
                  ]"
                >
                  {{ item.description }}
                </td>
                <td
                  :class="[
                    ind !== products.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                  ]"
                >
                  {{ getDateTime(item.createdAt) }}
                </td>
                <td
                  :class="[
                    ind !== products.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8',
                  ]"
                >
                  <div class="flex gap-x-6 justify-center">
                    <div class="cursor-pointer" @click="onAction(item)">
                      <component
                        :is="PencilSquareIcon"
                        class="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="cursor-pointer" @click="onDelete(item)">
                      <component
                        :is="TrashIcon"
                        class="hidden h-6 w-5 flex-none text-red-500 sm:block"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
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

import { getDateTime } from "@/core/utils/tools";

const productStore = useProductStore();

const viewAction = {
  available: "text-green-700 bg-green-50 ring-green-600/20",
  notAvailable: "text-gray-700 bg-gray-50 ring-gray-600/10",
};

const products = computed(() => productStore.getProducts);
const selectedProduct = ref<IProduct>();
const isDeletePopup = ref(false);
const isActionPopup = ref(false);
onMounted(() => {
  productStore.fetchProducts();
});

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
