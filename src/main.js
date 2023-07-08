import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import axios from 'axios';

const app = createApp(App);
app.provide('$axios', axios.create({
  baseURL: 'http://localhost:8080', // Set the base URL for your API requests
}));

app.use(router).mount('#app');
