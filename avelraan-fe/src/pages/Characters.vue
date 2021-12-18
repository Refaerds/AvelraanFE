<template>
<div>
    <b-alert v-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>
    <div v-else-if="charactersListLoading" class="text-center mt-3">
        <b-spinner></b-spinner>
    </div>
    <div v-else>
        <b-tabs content-class="mt-3" align="right">
            <b-tab title="Characters" active>
                <characters-list></characters-list>
            </b-tab>
            <b-tab title="Create"></b-tab>
            <b-tab title="Level Up" disabled></b-tab>
        </b-tabs>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";
import CharactersList from "./Characters/CharactersList";

export default {
    name: "Characters",
    components: {CharactersList},
    computed: {
        ...mapState({
            charactersListLoading: state => state.charactersData.charactersListLoading,
            charactersListError: state => state.charactersData.charactersListError,
        })
    }
}
</script>

<style scoped></style>