import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import mitt from 'mitt'

import './assets/scss/compiled/wrapper.min.css'

const emitter = mitt()
const app = createApp(App)

app.use(router)

app.config.globalProperties.emitter = emitter

app.mount('#app')
