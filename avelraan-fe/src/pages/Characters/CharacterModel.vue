<template>
<div>
    <div class="text-center mt-3" v-if="charactersListLoading"><b-spinner></b-spinner></div>
    <b-alert v-else-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>
    <p v-else-if="!aliveCharacters.length" class="text-center pt-3">You don't have any alive characters to view</p>
    <p v-else-if="!selectedCharacterId" class="text-center pt-3">Please select a character</p>

    <div v-else class="overflow-hidden">
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
                        <div class="info-header-text">Equipment</div>
                    </div>
                    <div>
                        <b-row>
                            <b-col cols="5" sm="4" md="6" lg="5" xl="4" offset="1" offset-sm="2" offset-md="0" offset-lg="1" offset-xl="2">
                                <div class="w-100 pb-100 position-relative">
                                    <MainhandIcon class="position-absolute top-0 fill-opacity-20"></MainhandIcon>
                                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                        <character-item v-if="mainhandItem"
                                                        :item="mainhandItem"
                                                        :disabled="true"
                                        ></character-item>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="5" sm="4" md="6" lg="5" xl="4">
                                <div class="w-100 pb-100 position-relative">
                                    <OffhandIcon class="position-absolute top-0 fill-opacity-20"></OffhandIcon>
                                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                        <character-item v-if="offhandItem"
                                                        :item="offhandItem"
                                                        :disabled="true"
                                        ></character-item>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="5" sm="4" md="6" lg="5" xl="4" offset="1" offset-sm="2" offset-md="0" offset-lg="1" offset-xl="2">
                                <div class="w-100 pb-100 position-relative">
                                    <RangedIcon class="position-absolute top-0 fill-opacity-20"></RangedIcon>
                                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                        <character-item v-if="rangedItem"
                                                        :item="rangedItem"
                                                        :disabled="true"
                                        ></character-item>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="5" sm="4" md="6" lg="5" xl="4">
                                <div class="w-100 pb-100 position-relative">
                                    <ArmorIcon class="position-absolute top-0 fill-opacity-20"></ArmorIcon>
                                    <div class="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                        <character-item v-if="armorItem"
                                                        :item="armorItem"
                                                        :disabled="true"
                                        ></character-item>
                                    </div>
                                </div>
                            </b-col>
                            <b-col cols="12">
                                <div class="w-100 pb-5 position-relative mt-3">
                                    <TrinketIcon class="position-absolute top-0 left-50 translate-x-50 fill-opacity-20 h-100"></TrinketIcon>
                                    <div v-if="trinkets" class="position-absolute top-0 w-100 h-100 d-flex align-items-center justify-content-center">
                                        <character-item v-for="item in trinkets"
                                                        :key="'eq-trinket-' + item.Id"
                                                        :item="item"
                                                        :disabled="true"
                                        ></character-item>
                                    </div>
                                </div>
                            </b-col>
                        </b-row>
                    </div>
                </div>
            </b-col>

            <b-col cols="12" md="6" class="mb-3">
                <div class="info-section h-100">
                    <div class="info-header">
                        <div class="info-header-text">Inventory</div>
                    </div>
                    <div class="d-flex flex-column justify-content-between h-100">
                        <div class="d-flex flex-wrap">
                            <character-item v-for="item in selectedCharacter.Supplies"
                                            :key="item.Id"
                                            :item="item"
                                            :disabled="equipItemLoading"
                                            class="mr-1 mb-1"
                                            @click.native="equipItem(item.Id)"
                            ></character-item>
                        </div>
                        <small class="text-right">click on item to equip</small>
                    </div>
                </div>
            </b-col>
        </b-row>

    </div>
</div>
</template>

<script>
import {mapActions, mapGetters, mapState} from "vuex";
import Character from "../../components/Character/Character";
import CharacterStat from "../../components/Character/CharacterStat";
import CharacterItem from "../../components/Character/CharacterItem";
import MainhandIcon from "../../assets/images/icons/axe-sword.svg";
import OffhandIcon from "../../assets/images/icons/round-shield.svg";
import ArmorIcon from "../../assets/images/icons/lamellar.svg";
import RangedIcon from "../../assets/images/icons/pocket-bow.svg";
import TrinketIcon from "../../assets/images/icons/emerald-necklace.svg";
import { equipItem } from "../../services";
import { getErrorText } from "../../helpers";

export default {
    name: "CharacterModel",
    components: {
        Character, CharacterStat, CharacterItem,
        MainhandIcon, OffhandIcon, ArmorIcon, RangedIcon, TrinketIcon
    },
    data() {
        return {
            slotClassList: 'w-100 pb-100 position-relative fill-opacity-20',
            equipItemLoading: false
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
        },
        mainhandItem() {
            return this.selectedCharacter.Equippment?.Mainhand;
        },
        offhandItem() {
            return this.selectedCharacter.Equippment?.Offhand;
        },
        rangedItem() {
            return this.selectedCharacter.Equippment?.Ranged;
        },
        armorItem() {
            return this.selectedCharacter.Equippment?.Armour;
        },
        trinkets() {
            return this.selectedCharacter.Equippment?.Trinkets?.filter(trinket => trinket);
        }
    },
    methods: {
        ...mapActions({
            updateCharacterData: 'charactersData/updateCharacterData'
        }),
        // TODO: handle loading
        // TODO: highlight stats affected by items
        equipItem(itemId) {
            this.equipItemLoading = true;

            equipItem({
                PlayerId: this.playerId,
                CharacterId: this.selectedCharacterId,
                Id: itemId
            })
            .then(data => this.updateCharacterData(data))
            .catch(error => {
                this.$bvToast.toast(getErrorText(error), {variant: 'danger', title: 'Item equip error!'})
            })
            .finally(() => this.equipItemLoading = false)
        }
    }
}
</script>

<style scoped>
.fill-opacity-20 {
    fill-opacity: 0.2;
}
</style>