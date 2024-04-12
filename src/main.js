import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createVuetify } from 'vuetify'
import '@mdi/font/css/materialdesignicons.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.js'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import LandingPage from './pages/landing/LandingPage.vue'
import StorePage from './pages/store/StorePage.vue'
import MenCategory from './pages/store/category/MenCategory.vue'
import WomenCategory from './pages/store/category/WomenCategory.vue'
import CardioCategory from './pages/store/category/CardioCategory.vue'
import CycleCategory from './pages/store/category/CycleCategory.vue'
import AccessoryCategory from './pages/store/category/AccessoryCategory.vue'
import EquipmentCategory from './pages/store/category/EquipmentCategory.vue'
import SupplementCategory from './pages/store/category/SupplementCategory.vue'
import StoreLandingPage from './pages/store/StoreLandingPage.vue'
import UserAuth from './pages/userAuth/UserAuth.vue'
import ForgotPassword from './pages/userAuth/ForgotPassword.vue'
import ResetPassword from './pages/userAuth/ResetPassword.vue'
import FitnessTrackers from './pages/fitness-trackers/FitnessTrackers.vue'
import BmiCalculator from './pages/fitness-trackers/BmiCalculator.vue'
import TrackerLandingPage from './pages/fitness-trackers/TrackerLandingPage.vue'

const vuetify = createVuetify({
    components,
    directives,
    ssr: true,
})

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes: [
        { path: '/', component: LandingPage },
        { path: '/authentication', component: UserAuth },
        { path: '/forgotPassword', component: ForgotPassword },
        { path: '/resetPassword', component: ResetPassword },
        {
            path: '/fitnessTrackers',
            component: FitnessTrackers,
            children: [
                { path: '', component: TrackerLandingPage },
                { path: 'bmi-calculator', component: BmiCalculator }
            ]
        },
        {
            path: '/store',
            component: StorePage,
            children: [
                { path: '', component: StoreLandingPage },
                { path: '/men', component: MenCategory },
                { path: '/women', component: WomenCategory },
                { path: '/cardio', component: CardioCategory },
                { path: '/cycles', component: CycleCategory },
                { path: '/accessories', component: AccessoryCategory },
                { path: '/equipments', component: EquipmentCategory },
                { path: '/supplements', component: SupplementCategory }
            ]
        }
    ]
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
