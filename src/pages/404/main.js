import { createApp } from "vue";
import { createHead } from "@vueuse/head";
import App from "./Page.vue";

const app = createApp(App);
const head = createHead();

app.use(head);
app.mount("#page");
