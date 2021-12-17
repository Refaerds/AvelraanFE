import { signIn, signUp } from "../../services";
import { getErrorText } from "../../helpers";

const updateStorage = (key, value) => {
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
};

const persistedParams = {
    playerId: null,
    playerName: null
};

export default {

    namespaced: true,

    state: {
        isSignedIn: false,
        loading: false,
        error: null,
        ...persistedParams
    },
    actions: {
        signIn({commit}, payload) {
            commit('setLoading', true);
            commit('setError', null);

            return signIn(payload)
                .then(data => {
                    commit('setIsSignedIn', true);
                    commit('setPlayerId', data.PlayerId);
                    commit('setPlayerName', data.PlayerName);
                })
                .catch(error => commit('setError', getErrorText(error)))
                .finally(() => commit('setLoading', false));
        },
        signUp({commit}, payload) {
            commit('setLoading', true);
            commit('setError', null);

            return signUp(payload)
                .then(data => {
                    commit('setIsSignedIn', true);
                    commit('setPlayerId', data.PlayerId);
                    commit('setPlayerName', data.PlayerName);
                })
                .catch(error => commit('setError', getErrorText(error)))
                .finally(() => commit('setLoading', false));
        },
        logOut({commit}) {
            commit('setIsSignedIn', false);
            commit('setPlayerId', null);
            commit('setPlayerName', null);
        }
    },
    mutations: {
        setIsSignedIn: (state, data) => state.isSignedIn = data,
        setLoading: (state, data) => state.loading = data,
        setError: (state, data) => state.error = data,
        setPlayerId: (state, data) => {
            state.playerId = data;
            updateStorage('playerId', data);
        },
        setPlayerName: (state, data) => {
            state.playerName = data;
            updateStorage('playerName', data);
        },
        initializeFromStorage: (state) => {
            Object.keys(persistedParams).forEach(key => {
                const value = localStorage.getItem(key);
                if (value) state[key] = value;
            });
            if (state.playerId) state.isSignedIn = true;
        }
    }
};