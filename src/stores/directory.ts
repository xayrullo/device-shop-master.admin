import { defineStore } from "pinia";
import type IPersistStrategy from "@/core/models";
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
      if (this.categories.length > 0) return;
      else
        $api.product.getCategories().then((res) => {
          this.categories = res;
        });
    },
  },
  // persist: {
  //   enabled: true,
  //   strategies: [
  //     {
  //       key: "directoryStore",
  //       storage: sessionStorage,
  //       paths: ["categories"],
  //     },
  //   ] as IPersistStrategy<IState>[],
  // },
});
