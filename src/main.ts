import { createApp } from "vue";
import {createPinia} from "pinia";
import {VueQueryPlugin} from "vue-query";
import router from "./routes";
import "./styles.css";
import App from "./App.vue";

const pinia = createPinia()
createApp(App)
    .use(router)
    .use(pinia)
    .use(VueQueryPlugin)
    .mount("#app");
