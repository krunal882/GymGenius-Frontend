import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/landing/LandingPage.vue'
import StorePage from './pages/store/StorePage.vue'

import { createApp } from 'vue'
import App from './App.vue'

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

app.use(router)

app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'

