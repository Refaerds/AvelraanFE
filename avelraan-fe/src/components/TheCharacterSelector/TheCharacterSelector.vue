<template>
    <b-dropdown variant="link" no-caret right
                id="the-char-selector"
                toggle-class="d-flex align-items-center text-av-light-yellow"
                menu-class="bg-black-70 text-av-light-green"
                :disabled="!aliveCharacters.length"
    >
        <template #button-content>
            <div v-if="selectedCharacterId">
                <b-avatar size="sm" class="shadow-none mr-2"
                          :src="getImgUrl(selectedCharacter.Logbook.PortraitNr)"
                ></b-avatar>
                <span class="tcs-selection">{{ selectedCharacter.Name }}</span>
            </div>
            <div v-else>
                <b-avatar size="sm" class="shadow-none mr-1 bg-black-70">
                    <template #default>
                        <anonymous-icon class="fill-av-light-green"></anonymous-icon>
                    </template>
                </b-avatar>
                <span class="tcs-no-selection">No character selected</span>
            </div>
        </template>

        <b-dropdown-item v-for="char in aliveCharacters"
                         :key="'char-dd-item-' + char.CharacterId"
                         @click="setSelectedCharacterId(char.CharacterId)"
        >
            <b-avatar size="sm" class="shadow-none mr-1"
                      :src="getImgUrl(char.Logbook.PortraitNr)"
            ></b-avatar>
            {{ char.Name }}
        </b-dropdown-item>
    </b-dropdown>
</template>

<script>
import {mapGetters, mapMutations, mapState} from "vuex";
import AnonymousIcon from "../../assets/images/icons/anonymous.svg";

export default {
    name: "TheCharacterSelector",
    components: { AnonymousIcon },
    computed: {
        ...mapState({
            selectedCharacterId: (state) => state.charactersData.selectedCharacterId,
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters',
            selectedCharacter: 'charactersData/selectedCharacter'
        })
    },
    methods: {
        ...mapMutations({
            setSelectedCharacterId: 'charactersData/setSelectedCharacterId'
        }),
        getImgUrl(nr) {
            return require('../../assets/images/humans/human'+ nr + '.png')
        }
    }
}
</script>

<style scoped></style>