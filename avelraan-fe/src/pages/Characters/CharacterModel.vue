<template>
<div>
    <p v-if="!aliveCharacters.length" class="text-center pt-3">You don't have any alive characters to view</p>
    <p v-else-if="!selectedCharacterId" class="text-center pt-3">Please select a character</p>
    <div v-else>
    </div>
</div>
</template>

<script>
import {mapGetters, mapState} from "vuex";

export default {
    name: "CharacterModel",
    computed: {
        ...mapState({
            selectedCharacterId: (state) => state.charactersData.selectedCharacterId,
        }),
        ...mapGetters({
            aliveCharacters: 'charactersData/aliveCharacters'
        })
    }
}
</script>

<style scoped>

</style>