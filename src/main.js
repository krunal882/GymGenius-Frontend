import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/landing/LandingPage.vue'
import StorePage from './pages/store/StorePage.vue'

import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'


const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
})

const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/', component: LandingPage,
    },
    {
        path: '/store', component: StorePage,

    }]
})

const app = createApp(App)

app.use(vuetify);
app.use(router)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'

