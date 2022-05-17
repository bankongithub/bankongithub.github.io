import { createApp } from 'vue';
import App from './App.vue';

import router from './router/index';

// https://www.primefaces.org/primevue/
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
import ConfirmationService from 'primevue/confirmationservice';
import 'primevue/resources/themes/lara-light-purple/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

// https://github.com/mercs600/vue3-perfect-scrollbar
import PerfectScrollbar from 'vue3-perfect-scrollbar';
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css';

const app = createApp(App);

app.use(router);

app.use(PrimeVue);
app.use(ToastService);
app.use(ConfirmationService);

app.use(PerfectScrollbar);

app.mount('#app');
