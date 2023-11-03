import { createApp } from 'vue'
import { createPinia } from "pinia";
import App from './App.vue'
import PrimeVue from "primevue/config";

import router from './router'
import "@/assets/styles/normalize.css"
import 'primevue/resources/themes/lara-light-teal/theme.css'

const app = createApp(App);

app.use(createPinia())
app.use(router)
app.use(PrimeVue);

app.mount('#app')
