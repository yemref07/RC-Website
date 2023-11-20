import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import router from './router/index.js'
import VueEasyLightbox from 'vue-easy-lightbox'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import VueTelInput from 'vue-tel-input';
import 'vue-tel-input/vue-tel-input.css';
import VueYtframe from "vue3-ytframe"
import { createI18n } from 'vue-i18n'
import langTR from './locales/tr.json'
import langEN from './locales/en.json'
import langAR from './locales/ar.json'
import langRU from './locales/ru.json'
import langAZ from './locales/az.json'

import { createHead } from '@unhead/vue'

const i18n = createI18n({
  legacy: false,
  locale: 'tr', // set locale
  fallbackLocale: 'tr', // set fallback locale
  messages: {
    tr: langTR,
    en: langEN,
    ar: langAR,
    az: langAZ,
    ru: langRU
  }
})


const globalOptions = {
  inputOptions: {
    placeholder: "534 444 44 44"
  },
};


const head = createHead()
const pinia = createPinia()
const app = createApp(App)


app.use(head)
app.use(router)
app.use(i18n)
app.use(VueYtframe)
app.use(VueTelInput, globalOptions); // Define default global options here (optional)
app.component('VueDatePicker', VueDatePicker);
app.use(VueSweetalert2);
app.use(pinia)
app.use(VueEasyLightbox)
app.use(ElementPlus)
app.mount('#app')
