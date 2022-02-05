<template>
<div>
    <p>Roll dice infinite times to save the best stats, but beware, Luck can be volatile...</p>

    <div class="d-flex align-items-center mb-3">
        <b-button variant="outline-warning" class="text-nowrap"
                  @click="rollDice"
                  :disabled="rollLoading"
        >
            Roll stats
        </b-button>

        <div class="d-flex flex-row flex-wrap justify-content-around flex-grow-1 ml-3">
            <div :class="[roll ? computeRollClass(roll) : 'text-white-50', 'px-2']">
                {{ roll || 'Current roll' }}
            </div>
            <div :class="[prevRoll1 ? computeRollClass(prevRoll1) : 'text-white-40', 'px-2']">
                {{ prevRoll1 || 'Previous roll' }}
            </div>
            <div :class="[prevRoll2 ? computeRollClass(prevRoll2) : 'text-white-30', 'px-2']">
                {{ prevRoll2 || 'Previous roll' }}
            </div>
        </div>
    </div>

    <div class="d-flex align-items-center mb-3">
        <span id="store_roll">
            <b-button variant="warning" class="text-nowrap"
                      @click="storeRoll"
                      :disabled="!roll || rollLoading || storeRollLoading"
            >
                <span>Store roll</span>
                <b-badge v-if="storedRoll" variant="warning" class="ml-2">{{ storedRoll }}</b-badge>
            </b-button>
        </span>
        <b-tooltip target="store_roll" v-if="!roll" placement="right">
            You need to roll the dice first
        </b-tooltip>
    </div>

    <div class="mb-3">
        <b-input type="text" trim size="sm"
                 placeholder="Character name"
                 v-model="name"
                 :state="nameIsValid"
                 :disabled="!storedRoll || storeRollLoading"
                 class="mr-3 w-50"
        ></b-input>
        <b-form-invalid-feedback>
            The character name should not exceed 50 characters.
        </b-form-invalid-feedback>
    </div>

    <span id="save_roll">
        <b-button variant="success" class="text-nowrap"
                  @click="saveRoll"
                  :disabled="!storedRoll || storeRollLoading || !name || createCharacterLoading"
        >
            <b-spinner v-if="createCharacterLoading" class="mx-3" small></b-spinner>
            <span v-else>Save roll</span>
        </b-button>
    </span>
    <b-tooltip target="save_roll" v-if="!storedRoll || !name" placement="right">
        You need to store a roll and enter the new character name first.
    </b-tooltip>


</div>

</template>

<script>
import { rollDice, createCharacter, storeRoll } from "../../services";
import { PAGES, getErrorText } from "../../helpers";
import {mapActions, mapMutations, mapState} from "vuex";

export default {
    name: "CharacterCreate",
    data() {
        return {
            rollLoading: false,
            roll: null,
            prevRoll1: null,
            prevRoll2: null,

            storedRoll: null,
            storeRollLoading: false,

            name: null,
            createCharacterLoading: false,
        }
    },
    computed: {
        ...mapState({
            playerId: state => state.playerData.playerId,
            playerName: state => state.playerData.playerName,
            charactersList: state => state.charactersData.charactersList
        }),
        nameIsValid() {
            return this.name ? this.name.length <= 50 : null;
        },
    },
    methods: {
        ...mapActions({
            getCharactersList: 'charactersData/getCharactersList'
        }),
        ...mapMutations({
            setSelectedCharacterId: 'charactersData/setSelectedCharacterId'
        }),
        rollDice() {
            this.rollLoading = true;

            rollDice({
                PlayerId: this.playerId,
                PlayerName: this.playerName
            })
            .then(data => {
                this.prevRoll2 = this.prevRoll1;
                this.prevRoll1 = this.roll;
                this.roll = data.Logbook.StatsRoll;
            })
            .catch(error => {
                this.$bvToast.toast(getErrorText(error), { variant: 'danger', title: 'Roll error!' });
            })
            .finally(() => this.rollLoading = false)
        },
        storeRoll() {
            this.storeRollLoading = true;

            storeRoll({
                PlayerId: this.playerId,
                PlayerName: this.playerName
            })
            .then(data => this.storedRoll = data)
            .catch(error => {
                this.$bvToast.toast(getErrorText(error), { variant: 'danger', title: 'Store roll error!' });
            })
            .finally(() => this.storeRollLoading = false)
        },
        saveRoll() {
            this.createCharacterLoading = true;

            createCharacter({
                PlayerId: this.playerId,
                PlayerName: this.playerName,
                Name: this.name
            })
            .then(() => (this.getCharactersList()))
            .then(() => {
                // if character is found in the updated list, redirect to char Model.
                // if not found or multiple chars with the same name found, redirect to char List.
                const newCharacter = this.charactersList?.filter(char => char.Name.toLowerCase() === this.name.toLowerCase());

                if (newCharacter.length === 1) {
                    this.setSelectedCharacterId(newCharacter[0].CharacterId);
                    this.$router.push({name: PAGES.characters.model});
                }
                else this.$router.push({name: PAGES.characters.myCharacters});
            })
            .catch(error => {
                this.$bvToast.toast(getErrorText(error), { variant: 'danger', title: 'Create character error!' });
            })
            .finally(() => this.createCharacterLoading = false)
        },
        computeRollClass(roll) {
            return roll > 40 ? 'text-info' : roll > 20 ? 'text-success' : 'text-white-50';
        }
    }
}
</script>

<style scoped>

</style>