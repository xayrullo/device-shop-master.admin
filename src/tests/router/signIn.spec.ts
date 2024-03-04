import { createMemoryHistory, createRouter } from "vue-router";

import AppVue from "@/App.vue";
import { mount } from "@vue/test-utils";
import router from "@/router/index.ts";

describe("App", () => {
  it("renders component via routing", async () => {
    const history = createMemoryHistory();
    const routerInstance = createRouter({
      history,
      routes: router.options.routes,
    });
    const wrapper = mount(AppVue, {
      global: {
        plugins: [routerInstance],
      },
    });
    await routerInstance.push("/sign-in");
    await routerInstance.isReady();
    expect(wrapper.findComponent({ name: "sign-in" }).exists()).toBe(true);
  });
});
