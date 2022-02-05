<template>
<div>
    <div class="text-center mt-3" v-if="charactersListLoading || levelUpDataLoading"><b-spinner></b-spinner></div>
    <b-alert v-else-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>
    <b-alert v-else-if="levelUpDataError" variant="danger" show>{{ levelUpDataError }}</b-alert>
    <p v-else-if="!aliveCharacters.length" class="text-center pt-3">You don't have any alive characters to view</p>
    <p v-else-if="!selectedCharacterId" class="text-center pt-3">Please select a character</p>

    <div v-else class="overflow-hidden">
<!--        Avatar -->
        <div class="d-flex">
            <character :char="selectedCharacter" :show-name="false"></character>
            <div class="px-3 line-height-sm">
                <div>Name: {{ selectedCharacter.Name }}</div>
            </div>
        </div>

<!--        Stats & Skills-->
        <div>
            <b-row class="pt-3">
                <b-col cols="12" md="4" class="mb-3">
                    <div class="info-section h-100">
                        <div class="info-header">
                            <div class="info-header-text">Stats points: <strong>{{ statPoints || 0 }}</strong></div>
                        </div>
                        <div v-for="[key, value] in Object.entries(stats)"
                             :key="key"
                             class="d-flex flex-row flex-nowrap align-items-center"
                        >
                            <b-button variant="success" class="mr-1 mb-1 math-btn"
                                      :disabled="!statPoints || !hasLevelUp"
                                      @click="updateStats(key, 1)"
                            >+</b-button>
                            <b-button variant="danger" class="mr-1 mb-1 math-btn"
                                      :disabled="value <= 1 || !hasLevelUp"
                                      @click="updateStats(key, -1)"
                            >-</b-button>
                            <character-stat :label="key" :value="value"></character-stat>
                        </div>
                    </div>
                </b-col>
                <b-col cols="12" md="8" class="mb-3">
                    <div class="info-section h-100">
                        <div class="info-header">
                            <div class="info-header-text">Skills points: <strong>{{ skillPoints || 0 }}</strong></div>
                        </div>
                        <div class="av-columns-2">
                            <div v-for="([key, value], i) in Object.entries(skills)"
                                 :key="key"
                                 :class="['d-flex flex-row flex-nowrap align-items-center', i === 7 ? 'pb-1' : '']"
                            >
                                <b-button variant="success" class="mr-1 mb-1 math-btn"
                                          :disabled="!skillPoints || !hasLevelUp"
                                          @click="updateSkills(key, 1)"
                                >+</b-button>
                                <b-button variant="danger" class="mr-1 mb-1 math-btn"
                                          :disabled="value <= 10 || !hasLevelUp"
                                          @click="updateSkills(key, -1)"
                                >-</b-button>
                                <character-stat :label="key" :value="value"></character-stat>
                            </div>
                        </div>
                    </div>
                </b-col>
            </b-row>

            <div class="text-right">
                <span id="save-level-up-action">
                    <b-button variant="success" :disabled="hasUnusedPoints || !hasLevelUp" @click="saveCharacterLevelUp">
                        <b-spinner v-if="levelUpLoading" class="mx-2" small></b-spinner>
                        <span v-else>Save</span>
                    </b-button>
                </span>
                <b-tooltip v-if="hasUnusedPoints" target="save-level-up-action" placement="left">
                    Please distribute all stat and skill points first
                </b-tooltip>
                <b-tooltip v-else-if="!hasLevelUp" target="save-level-up-action" placement="left">
                    This character doesn't have any level up points left
                </b-tooltip>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Character from "../../components/Character/Character";
import CharacterStat from "../../components/Character/CharacterStat";
import { getCharacterLevelUp, characterLevelUp } from "../../services";
import { getErrorText } from "../../helpers";

export default {
    name: "CharacterLevelUp",
    components: { Character, CharacterStat },
    data() {
        return {
            levelUpDataLoading: false,
            levelUpDataError: null,
            statPoints: 0,
            skillPoints: 0,

            stats: {},
            skills: {},

            levelUpLoading: false,
        }
    },
    computed: {
        ...mapState({
            playerId: state => state.playerData.playerId,
            playerName: state => state.playerData.playerName,
            selectedCharacterId: state => state.charactersData.selectedCharacterId,
            charactersListLoading: state => state.charactersData.charactersListLoading,
            charactersListError: state => state.charactersData.charactersListError
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters',
            selectedCharacter: 'charactersData/selectedCharacter'
        }),
        hasLevelUp() {
            return this.selectedCharacter?.HasLevelup;
        },
        hasUnusedPoints() {
            return (this.skillPoints + this.statPoints) > 0;
        }
    },
    mounted() {
        if (this.selectedCharacterId) {
            this.getCharacterLevelUpData();
            this.setCurrentSkillsStats();
        }
    },
    watch: {
        selectedCharacterId(newVal) {
            if (newVal) {
                this.getCharacterLevelUpData();
                this.setCurrentSkillsStats();
            }
        }
    },
    methods: {
        ...mapActions({
            getCharactersList: 'charactersData/getCharactersList'
        }),
        getCharacterLevelUpData() {
            this.levelUpDataLoading = true;

            getCharacterLevelUp({
                PlayerId: this.playerId,
                CharacterId: this.selectedCharacterId
            })
            .then(data => {
                const { Bonuses } = data;
                this.statPoints = Bonuses?.find(item => item.BonusTo === 'Stats')?.Value ?? 0;
                this.skillPoints = Bonuses?.find(item => item.BonusTo === 'Skills')?.Value ?? 0;
            })
            .catch(error => this.levelUpDataError = getErrorText(error))
            .finally(() => this.levelUpDataLoading = false);
        },
        setCurrentSkillsStats() {
            this.stats = {...this.selectedCharacter?.Stats};
            this.skills = {...this.selectedCharacter?.Skills};
        },
        updateStats(statName, points) {
            this.statPoints -= points;
            this.stats[statName] += points;
        },
        updateSkills(skillName, points) {
            this.skillPoints -= points;
            this.skills[skillName] += points;
        },
        saveCharacterLevelUp() {
            this.levelUpLoading = true;

            characterLevelUp({
                PlayerId: this.playerId,
                CharacterId: this.selectedCharacterId,
                Stats: this.stats,
                Skills: this.skills
            })
            .then(() => {
                this.getCharactersList();
            })
            .catch(error => {
                this.$bvToast.toast(getErrorText(error), { variant: 'danger', title: 'Level up error!' });
            })
            .finally(() => this.levelUpLoading = false);
        }
    }
}
</script>

<style scoped>
.math-btn {
    height: 1rem;
    width: 1rem;
    line-height: 0;
    border-radius: 2px;
    color: black;
    font-size: 1.25rem;
    padding: 0 !important;
    padding-top: 0.35rem !important;
}
.math-btn:active {
    color: black !important;
}
@media screen and (max-width: 400px) {
    .av-columns-2 { columns: 1; }
}
</style>