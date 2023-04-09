import { createApp, markRaw } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import ConfirmationService from 'primevue/confirmationservice'

//theme
import './assets/styles/primes/lara-light/blue/theme.scss'     
//core
import "primevue/resources/primevue.min.css";
//icons
import "primeicons/primeicons.css";
import PrimeVue from 'primevue/config';
import router from './router'
import './assets/styles/styles.scss'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

const app = createApp(App)
app.use(ConfirmationService);
app.use(Toast)
// to use router inside pinia store file
app.use( createPinia().use(({store})=>store.router = markRaw(router))  )
app.use(router)
app.use(PrimeVue)
app.mount('#app')
