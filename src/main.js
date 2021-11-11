import { createApp } from "vue";
import {
  // create naive ui
  create,
  // component
  NButton,
} from "naive-ui";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const naive = create({
  components: [NButton],
});
createApp(App).use(naive).use(store).use(router).mount("#app");
