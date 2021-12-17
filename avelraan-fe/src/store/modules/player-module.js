import { signIn, signUp } from "../../services";
import { getErrorText } from "../../helpers";

const updateStorage = (key, value) => {
    // pushes the login data to localStorage, for persistence
    if (value) localStorage.setItem(key, value);
    else localStorage.removeItem(key);
};

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
        signIn({commit, dispatch}, payload) {
            commit('setLoading', true);
            commit('setError', null);

            return signIn(payload)
                .then(data => {
                    dispatch('setCoreData', {
                        playerId: data.PlayerId,
                        playerName: data.PlayerName,
                        getCharacters: true
                    });
                })
                .catch(error => commit('setError', getErrorText(error)))
                .finally(() => commit('setLoading', false));
        },
        signUp({commit, dispatch}, payload) {
            commit('setLoading', true);
            commit('setError', null);

            return signUp(payload)
                .then(data => {
                    dispatch('setCoreData', {
                        playerId: data.PlayerId,
                        playerName: data.PlayerName
                    });
                })
                .catch(error => commit('setError', getErrorText(error)))
                .finally(() => commit('setLoading', false));
        },
        setCoreData({commit, dispatch}, payload) {
            // is called on signIn, signUp, or when initializing login data from the localStorage
            // sets the login data in the store, and initiates the call for characters list in the above cases, except signUp
            const {playerId, playerName, getCharacters} = payload;
            if (playerId && playerName) {
                commit('setIsSignedIn', true);
                commit('setPlayerId', playerId);
                commit('setPlayerName', playerName);

                if (getCharacters) {
                    const getCharactersPayload = {
                        PlayerId: playerId,
                        PlayerName: playerName
                    };
                    dispatch('charactersData/getCharactersList', getCharactersPayload, {root: true});
                }
            }
        },
        initializeFromStorage({dispatch}) {
            // gets the persisted login data from localStorage
            const playerId = localStorage.getItem('playerId');
            const playerName = localStorage.getItem('playerName');

            if (playerId && playerName) {
                dispatch('setCoreData', { playerId, playerName, getCharacters: true });
            }
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
        }
    }
};