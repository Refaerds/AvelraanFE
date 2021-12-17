import Vue from 'vue';
import Vuex from 'vuex';
import playerData from './modules/player-module';
import charactersData from './modules/characters-module';

Vue.use(Vuex);

const store = new Vuex.Store({
    root: true,
    modules: {
        playerData,
        charactersData
    },
});

export default store;