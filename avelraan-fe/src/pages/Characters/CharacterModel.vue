<template>
<div>
    <div class="text-center mt-3" v-if="charactersListLoading"><b-spinner></b-spinner></div>
    <b-alert v-else-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>
    <p v-if="!aliveCharacters.length" class="text-center pt-3">You don't have any alive characters to view</p>
    <p v-else-if="!selectedCharacterId" class="text-center pt-3">Please select a character</p>

    <div v-else>
<!--        Avatar & basic info-->
        <div class="d-flex">
            <character :char="selectedCharacter" :show-name="false"></character>
            <div class="px-3 line-height-sm">
                <div>Name: {{ selectedCharacter.Name }}</div>
                <div>Race: {{ selectedCharacter.Logbook.Race }}</div>
                <div>Culture: {{ selectedCharacter.Logbook.Culture }}</div>
            </div>
        </div>

<!--        Stats & Skills-->
        <b-row class="pt-3">
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section h-100">
                    <div class="info-header">
                        <div class="info-header-text">Stats</div>
                    </div>
                    <div class="av-columns-2">
                        <character-stat v-for="[key, value] in Object.entries(stats)"
                                        :key="key"
                                        :label="key"
                                        :value="value"
                        ></character-stat>
                    </div>
                </div>
            </b-col>
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section h-100">
                    <div class="info-header">
                        <div class="info-header-text">Skills</div>
                    </div>
                    <div class="av-columns-3">
                        <character-stat v-for="[key, value] in Object.entries(selectedCharacter.Skills)"
                                        :key="key"
                                        :label="key"
                                        :value="value"
                        ></character-stat>
                    </div>
                </div>
            </b-col>
        </b-row>

<!--        Inventory-->
        <b-row>
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section h-100">
                    <div class="info-header">
                        <div class="info-header-text">Inventory</div>
                    </div>
                    <div></div>
                </div>
            </b-col>

            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section h-100">
                    <div class="info-header">
                        <div class="info-header-text">Supplies</div>
                    </div>
                    <div>
                        <character-item v-for="item in selectedCharacter.Supplies"
                                        :key="item.Id"
                                        :item="item"
                        ></character-item>
                    </div>
                </div>
            </b-col>
        </b-row>

    </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";
import Character from "../../components/Character/Character";
import CharacterStat from "../../components/Character/CharacterStat";
import CharacterItem from "../../components/Character/CharacterItem";

export default {
    name: "CharacterModel",
    components: { Character, CharacterStat, CharacterItem },
    computed: {
        ...mapState({
            selectedCharacterId: state => state.charactersData.selectedCharacterId,
            charactersListLoading: state => state.charactersData.charactersListLoading,
            charactersListError: state => state.charactersData.charactersListError
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters',
            selectedCharacter: 'charactersData/selectedCharacter'
        }),
        stats() {
            if (this.selectedCharacter) {
                const { Logbook, Assets, Expertise, Stats } = this.selectedCharacter;
                return {
                    Level: Logbook.EntityLevel,
                    Experience: Expertise.Experience,
                    Health: Assets.Health,
                    Mana: Assets.Mana,
                    Harm: Assets.Harm,
                    DRM: Expertise.DRM,
                    Strength: Stats.Strength,
                    Toughness: Stats.Toughness,
                    Awareness: Stats.Awareness,
                    Abstract: Stats.Abstract
                }
            }
            return {};
        }
    }
}
</script>

<style scoped>
.av-columns-3 {
    columns: 3;
}

.av-columns-2 {
    columns: 2;
}

@media screen and (min-width: 768px) and (max-width: 992px), (max-width: 450px) {
    .av-columns-3 {
        columns: 2;
    }
}
</style>