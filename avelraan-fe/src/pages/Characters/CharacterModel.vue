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
                    <b-row>
                        <b-col>
                            <character-stat v-for="[key, value] in getPartialList(stats, 2, 0)"
                                            :key="key"
                                            :label="key"
                                            :value="value"
                            ></character-stat>
                        </b-col>
                        <b-col>
                            <character-stat v-for="[key, value] in getPartialList(stats, 2, 1)"
                                            :key="key"
                                            :label="key"
                                            :value="value"
                            ></character-stat>
                        </b-col>
                    </b-row>
                </div>
            </b-col>
            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section">
                    <div class="info-header">
                        <div class="info-header-text">Skills</div>
                    </div>
                    <b-row>
                        <b-col>
                            <character-stat v-for="[key, value] in getPartialList(selectedCharacter.Skills, 3, 0)"
                                            :key="key"
                                            :label="key"
                                            :value="value"
                            ></character-stat>
                        </b-col>
                        <b-col>
                            <character-stat v-for="[key, value] in getPartialList(selectedCharacter.Skills, 3, 1)"
                                            :key="key"
                                            :label="key"
                                            :value="value"
                            ></character-stat>
                        </b-col>
                        <b-col>
                            <character-stat v-for="[key, value] in getPartialList(selectedCharacter.Skills, 3, 2)"
                                            :key="key"
                                            :label="key"
                                            :value="value"
                            ></character-stat>
                        </b-col>
                    </b-row>

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

export default {
    name: "CharacterModel",
    components: { Character, CharacterStat },
    computed: {
        ...mapState({
            selectedCharacterId: (state) => state.charactersData.selectedCharacterId,
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
    },
    methods: {
        getPartialList(obj, numberOfParts, partNumber) {
            const list = Object.entries(obj);
            const length = list.length;

            let finalList = [];

            for (let i = 0; i < numberOfParts; i++) {
                let start = !i ? 0 : Math.ceil(length / numberOfParts * partNumber);
                let end = Math.ceil(length / numberOfParts * (partNumber + 1));
                finalList.push(list.slice(start, end));
            }

            return finalList[partNumber];
        }
    }
}
</script>

<style scoped>

</style>