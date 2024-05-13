import { createStore } from 'vuex';
import productsModule from './modules/productsModule';
import cartModule from './modules/cartModule';
import userModule from './modules/userModule';
import exercisesModule from './modules/exercisesModule';
import yogaModule from './modules/yogaModule'
import dietPlanModule from './modules/dietPlanModule';
import foodItemModule from './modules/foodItemModule';
import bookmarkModule from './modules/bookmarkModule'
import adminModule from './modules/adminModule'
const store = createStore({
    modules: {
        productsModule,
        cartModule,
        userModule,
        exercisesModule,
        yogaModule,
        dietPlanModule,
        foodItemModule,
        bookmarkModule,
        adminModule
    },

})

export default store;