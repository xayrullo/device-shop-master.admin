import { defineStore } from "pinia";

import { $api } from "@/core/services";
import type { IProductPost, IProduct } from "@/core/models/product";

export interface IState {
  products: IProduct[];
  pagination: {
    limit: number;
    skip: number;
    total: number;
  };
}
export const useProductStore = defineStore({
  id: "productStore",
  state: (): IState => ({
    products: [],
    pagination: {
      limit: 0,
      skip: 0,
      total: 0,
    },
  }),
  getters: {
    getProducts: (state) => state.products,
  },
  actions: {
    fetchProducts() {
      $api.product.getAll().then((res) => {
        this.products = res.products;
        this.pagination = {
          limit: res.limit,
          skip: res.skip,
          total: res.total,
        };
      });
    },
    // addProduct(e: IProductPost) {
    //   this.products.push({
    //     ...e,
    //     _id: "23143214321n23l14231",
    //     isDeleted: false,
    //     amount: Number(e.amount),
    //   });
    // },
    // updateProduct(e: IProductPost) {
    //   const index = this.products.findIndex((ind) => ind._id === e._id);
    //   if (index > -1)
    //     this.products.splice(index, 1, {
    //       ...e,
    //       _id: e._id ? e._id : "",
    //       isDeleted: false,
    //       amount: Number(e.amount),
    //     });
    // },
    deleteProduct(item: IProduct) {
      const index = this.products.findIndex((ind) => ind.id === item.id);
      if (index > -1) this.products.splice(index, 1);
    },
  },
});
