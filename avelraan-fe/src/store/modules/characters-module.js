import { getCharacters } from "../../services";
import { getErrorText, isCustomError } from "../../helpers";

const initialState = {
    charactersList: [],
    charactersListLoading: false,
    charactersListError: null,
    selectedCharacterId: null
};

export default {

    namespaced: true,

    state: { ...initialState },
    getters: {
        aliveCharacters(state) {
            return state.charactersList ? state.charactersList.filter(char => char.IsAlive) : [];
        },
        deadCharacters(state) {
            return state.charactersList ? state.charactersList.filter(char => !char.IsAlive) : [];
        },
        selectedCharacter(state) {
            return state.selectedCharacterId
                ? state.charactersList?.find(char => char.CharacterId === state.selectedCharacterId)
                : null;
        }
    },
    actions: {
        getCharactersList({commit, rootState}) {
            commit('setCharactersListLoading', true);
            commit('setCharactersList', null);
            commit('setCharactersListError', null);

            return getCharacters({
                PlayerId: rootState.playerData.playerId,
                PlayerName: rootState.playerData.playerName
            })
                .then(data => commit('setCharactersList', data))
                .catch(error => {
                    const errorText = isCustomError(error)
                        ? "Something went wrong, we couldn't load the characters list, please try again later"
                        : getErrorText(error);
                    commit('setCharactersListError', errorText);
                })
                .finally(() => commit('setCharactersListLoading', false))
        },
        resetCharacterModule({state}) {
            Object.assign(state, initialState);
        },
        updateCharacterData({commit, state}, charData) {
            const indexOfChar = state.charactersList?.findIndex(char => char.CharacterId === charData.CharacterId);
            if (indexOfChar >= 0) {
                const updatedList = [...state.charactersList];
                updatedList.splice(indexOfChar, 1, charData)
                commit('setCharactersList', updatedList);
            }
        }
    },
    mutations: {
        setCharactersList: (state, data) => state.charactersList = data,
        setCharactersListError: (state, data) => state.charactersListError = data,
        setCharactersListLoading: (state, data) => state.charactersListLoading = data,
        setSelectedCharacterId: (state, data) => state.selectedCharacterId = data,
    }
};