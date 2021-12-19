<template>
<div>
    <p v-if="!aliveCharacters.length" class="text-center pt-3">You don't have any alive characters to view</p>
    <p v-else-if="!selectedCharacterId" class="text-center pt-3">Please select a character</p>
    <div v-else>
<!--        Avatar & basic info-->
        <div class="d-flex">
            <character :char="selectedCharacter" :show-name="false"></character>
            <div class="px-3 line-height-sm">
                <div>Name: {{ selectedCharacter.Name }}</div>
                <div>Level: {{ selectedCharacter.Logbook.EntityLevel }}</div>
                <div>Race: {{ selectedCharacter.Logbook.Race }}</div>
                <div>Culture: {{ selectedCharacter.Logbook.Culture }}</div>
            </div>
        </div>

        <b-row class="pt-3">
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section">
                    <div class="info-header">
                        <div class="info-header-text">Stats</div>
                    </div>
                    bla<br>
                    bla<br>
                    bla
                </div>
            </b-col>
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section">
                    <div class="info-header">
                        <div class="info-header-text">Skills</div>
                    </div>
                    bla<br>
                    bla<br>
                    bla
                </div>
            </b-col>
        </b-row>
    </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Character from "../../components/Character/Character";

export default {
    name: "CharacterModel",
    components: { Character },
    computed: {
        ...mapState({
            selectedCharacterId: (state) => state.charactersData.selectedCharacterId,
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters',
            selectedCharacter: 'charactersData/selectedCharacter'
        })
    }
}
</script>

<style scoped>

</style>