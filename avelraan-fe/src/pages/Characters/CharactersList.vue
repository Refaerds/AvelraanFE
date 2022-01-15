<template>
<div>
    <div v-if="charactersListLoading" class="text-center mt-3"><b-spinner></b-spinner></div>
    <b-alert v-else-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>

    <div v-else>
        <div class="text-center mb-3">
            <span class="mx-2">Alive: {{ aliveCharacters.length }}</span>
            <span class="mx-2">Dead: {{ deadCharacters.length }}</span>
        </div>

        <div v-if="charListSorted" class="d-flex flex-row flex-wrap justify-content-around">
            <character v-for="char in charListSorted"
                       :key="char.CharacterId"
                       :char="char"
                       class="m-3"
            ></character>
        </div>
    </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Character from "../../components/Character/Character";

export default {
    name: "CharactersList",
    components: { Character },
    computed: {
        ...mapState({
            charactersList: state => state.charactersData.charactersList,
            charactersListLoading: state => state.charactersData.charactersListLoading,
            charactersListError: state => state.charactersData.charactersListError
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters',
            deadCharacters: 'charactersData/deadCharacters'
        }),
        charListSorted() {
            return [...this.charactersList]?.sort((a, b) => ((a.IsAlive === b.IsAlive) ? 0 : a.IsAlive ? -1 : 1));
        }
    }
}
</script>

<style scoped></style>