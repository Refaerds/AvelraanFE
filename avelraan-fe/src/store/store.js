import Vue from 'vue';
import Vuex from 'vuex';
import playerData from './modules/player-module';

Vue.use(Vuex);

const store = new Vuex.Store({
    root: true,
    modules: {
        playerData
    },
});

export default store;