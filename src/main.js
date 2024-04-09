import 'bootstrap/dist/css/bootstrap.css'
import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from './pages/landing/LandingPage.vue'
import StorePage from './pages/store/StorePage.vue'
import MenCategory from './pages/store/category/MenCategory.vue'
import WomenCategory from './pages/store/category/WomenCategory.vue'
import CardioCategory from './pages/store/category/CardioCategory.vue'
import CycleCategory from './pages/store/category/CycleCategory.vue'
import AccessoryCategory from './pages/store/category/AccessoryCategory.vue'
import EquipmentCategory from './pages/store/category/EquipmentCategory.vue'
import SupplementCategory from './pages/store/category/SupplementCategory.vue'
import StoreLandingPage
    from './pages/store/StoreLandingPage.vue'
import { createApp } from 'vue'
import App from './App.vue'

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";




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
        children: [
            { path: '', component: StoreLandingPage },
            { path: '/men', component: MenCategory },
            { path: '/women', component: WomenCategory },
            { path: '/cardio', component: CardioCategory },
            { path: '/cycles', component: CycleCategory },
            { path: '/accessories', component: AccessoryCategory },
            { path: '/equipments', component: EquipmentCategory },
            { path: '/supplements', component: SupplementCategory },
        ]
    }]
})

const app = createApp(App)

app.use(vuetify);
app.use(router)

app.component('font-awesome-icon', FontAwesomeIcon)


app.mount('#app')

import 'bootstrap/dist/js/bootstrap.js'

