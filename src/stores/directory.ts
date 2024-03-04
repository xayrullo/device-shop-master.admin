import { defineStore } from "pinia";

import { $api } from "@/core/services";

export interface IState {
  categories: string[];
}
export const useDirectoryStore = defineStore({
  id: "directoryStore",
  state: (): IState => ({
    categories: [],
  }),
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    fetchCategories() {
      $api.product.getCategories().then((res) => {
        this.categories = res;
      });
    },
  },
});
