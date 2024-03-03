import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import router from "./router";
import "../src/assets/style.css";
import App from "./App.vue";

import { initVeeValidate } from "@/core/plugins/vee-validate";

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPersist);
app.use(pinia);
app.use(router);

initVeeValidate();

app.mount("#app");
