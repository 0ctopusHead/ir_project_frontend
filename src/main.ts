import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import 'nprogress/nprogress.css'
import router from './router'
import '@/services/AxiosInterceptorSetup'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faUserPlus,
  faSignInAlt,
  faUser,
  faSignOutAlt,
  faPlus,
  faFolder
} from '@fortawesome/free-solid-svg-icons'

library.add(faSignInAlt)
library.add(faUserPlus)
library.add(faUser)
library.add(faSignOutAlt)
library.add(faPlus)
library.add(faFolder)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
