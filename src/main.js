import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';
import store from './vuex/store.js';

const app = createApp(App);
/*app.provide('$axios', axios.create({
  baseURL: 'http://54.81.120.103:8080', // Set the base URL for your API requests
}));*/

app.config.globalProperties.$store = store;
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$serverUrl='//54.81.120.103:8080'

app.use(router)
    .use(store)
    .mount('#app');

