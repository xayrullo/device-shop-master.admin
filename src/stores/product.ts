import { defineStore } from "pinia";

import { $api } from "@/core/services";
import type { IProductPost, IProduct } from "@/core/models/product";
import type IPersistStrategy from "@/core/models";

export interface IState {
  products: IProduct[];
  pagination: {
    current: number;
    limit: number;
    skip: number;
    total: number;
  };
  queryParam: any;
}
export const useProductStore = defineStore({
  id: "productStore",
  state: (): IState => ({
    products: [],
    pagination: {
      current: 1,
      limit: 20,
      skip: 0,
      total: 0,
    },
    queryParam: null,
  }),
  getters: {
    getProducts: (state) => state.products,
  },
  actions: {
    fetchProducts(query: any) {
      if (JSON.stringify(this.queryParam) === JSON.stringify(query)) {
        return;
      } else {
        if (query.search) {
          $api.product.getAllBySearching({ q: query.search }).then((res) => {
            this.queryParam = { ...query };
            this.products = res.products;
            this.pagination = {
              limit: res.limit,
              skip: res.skip,
              total: res.total,
              current: Math.floor(res.skip / res.limit) + 1,
            };
          });
        } else if (query.category) {
          $api.product.getAllByCategory(query.category).then((res) => {
            this.queryParam = { ...query };
            this.products = res.products;
            this.pagination = {
              limit: res.limit,
              skip: res.skip,
              total: res.total,
              current: Math.floor(res.skip / res.limit) + 1,
            };
          });
        } else
          $api.product.getAll(query).then((res) => {
            this.queryParam = { ...query };
            this.products = res.products;
            this.pagination = {
              limit: res.limit,
              skip: res.skip,
              total: res.total,
              current: Math.floor(res.skip / res.limit) + 1,
            };
          });
      }
    },
    createProduct(e: IProductPost) {
      return new Promise((resolve, reject) => {
        $api.product
          .create(e)
          .then((res) => {
            this.products.unshift(res);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    updateProduct(e: IProductPost) {
      return new Promise((resolve, reject) => {
        $api.product
          .update(e)
          .then((res) => {
            const index = this.products.findIndex((ind) => ind.id === res.id);
            if (index > -1) this.products.splice(index, 1, res);
            resolve(res);
          })
          .catch((err) => reject(err));
      });
    },
    deleteProduct(item: IProduct) {
      return new Promise((resolve, reject) => {
        $api.product
          .delete(item.id)
          .then((res) => {
            const index = this.products.findIndex((ind) => ind.id === item.id);
            if (index > -1) this.products.splice(index, 1);
            resolve(item);
          })
          .catch((err) => reject(err));
      });
    },
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: "productStore",
  //       storage: sessionStorage,
  //       paths: ["products", "queryParam", "pagination"],
  //     },
  //   ] as IPersistStrategy<IState>[],
  // },
});
