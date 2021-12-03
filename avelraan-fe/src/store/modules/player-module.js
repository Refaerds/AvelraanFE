import { signIn } from "../../services";
import { getErrorText } from "../../helpers";

export default {

    namespaced: true,

    state: {
        isSignedIn: false,
        signInLoading: false,
        signInError: null,

        playerId: null,
        playerName: null
    },
    actions: {
        signIn({commit}, payload) {
            commit('setSignInLoading', true);

            signIn(payload)
                .then(data => {
                    commit('setIsSignedIn', true);
                    commit('setPlayerId', data.PlayerId);
                    commit('setPlayerName', data.PlayerName);
                })
                .catch(error => commit('setSignInError', getErrorText(error)))
                .finally(() => commit('setSignInLoading', false))
        }
    },
    mutations: {
        setIsSignedIn: (state, data) => state.isSignedIn = data,
        setSignInLoading: (state, data) => state.signInLoading = data,
        setSignInError: (state, data) => state.signInError = data,
        setPlayerId: (state, data) => state.playerId = data,
        setPlayerName: (state, data) => state.playerName = data,
    }

};