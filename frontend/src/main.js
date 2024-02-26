import './assets/styles.css'
import 'primevue/resources/themes/aura-light-green/theme.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import Tooltip from 'primevue/tooltip'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'
// register as global component

const app = createApp(App)
app.use(createPinia())
// Make the stores available globally
app.use(PrimeVue)
app.directive('tooltip', Tooltip)
app.component('v-select', vSelect)

app.mount('#app')
