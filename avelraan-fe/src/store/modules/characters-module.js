import { getCharacters } from "../../services";
import { getErrorText, isCustomError } from "../../helpers";

export default {

    namespaced: true,

    state: {
        charactersList: null,
        charactersListLoading: false,
        charactersListError: null
    },
    getters: {
        aliveCharacters(state) {
            return state.charactersList ? state.charactersList.filter(char => char.IsAlive) : [];
        },
        deadCharacters(state) {
            return state.charactersList ? state.charactersList.filter(char => !char.IsAlive) : [];
        }
    },
    actions: {
        getCharactersList({commit}, payload) {
            commit('setCharactersListLoading', true);
            commit('setCharactersList', null);
            commit('setCharactersListError', null);

            getCharacters(payload)
                .then(data => commit('setCharactersList', data))
                .catch(error => {
                    const errorText = isCustomError(error)
                        ? "Something went wrong, we couldn't load the characters list, please try again later"
                        : getErrorText(error);
                    commit('setCharactersListError', errorText);
                })
                .finally(() => commit('setCharactersListLoading', false))
        }
    },
    mutations: {
        setCharactersList: (state, data) => state.charactersList = data,
        setCharactersListError: (state, data) => state.charactersListError = data,
        setCharactersListLoading: (state, data) => state.charactersListLoading = data
    }
};