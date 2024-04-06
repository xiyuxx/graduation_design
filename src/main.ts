import { createApp } from "vue";
import {createPinia} from "pinia";
import {VueQueryPlugin} from "vue-query";
import router from "./routes";
import "./styles.css";
import App from "./App.vue";
import ElementPlus from 'element-plus'
import 'element-plus/es/components/button/style/css'
import * as Icons from '@element-plus/icons-vue'
const app = createApp(App)
const pinia = createPinia()
Object.keys(Icons).forEach(key => {
    app.component(key, Icons[key as keyof typeof Icons])
})

app
    .use(router)
    .use(ElementPlus)
    .use(pinia)
    .use(VueQueryPlugin)
    .mount("#app");
