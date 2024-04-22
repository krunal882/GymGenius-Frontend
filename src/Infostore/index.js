import { createStore } from 'vuex';
import productsModule from './modules/productsModule';

const store = createStore({
    modules: {
        productsModule
    },
})

export default store;