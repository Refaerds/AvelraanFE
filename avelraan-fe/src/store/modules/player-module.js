import { signIn, signUp } from "../../services";
import { getErrorText } from "../../helpers";

export default {

    namespaced: true,

    state: {
        isSignedIn: false,
        loading: false,
        error: null,

        playerId: null,
        playerName: null
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
        setPlayerId: (state, data) => state.playerId = data,
        setPlayerName: (state, data) => state.playerName = data,
    }
};