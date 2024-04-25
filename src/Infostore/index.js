import { createStore } from 'vuex';
import productsModule from './modules/productsModule';
import cartModule from './modules/cartModule';
import userModule from './modules/userModule';
const store = createStore({
    modules: {
        productsModule,
        cartModule,
        userModule,
    },
})

export default store;