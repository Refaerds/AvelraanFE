<template>
<div>
    <b-alert v-if="charactersListError" variant="danger" show>{{ charactersListError }}</b-alert>
    <div v-else-if="charactersListLoading" class="text-center mt-3">
        <b-spinner></b-spinner>
    </div>
    <div v-else>
        <tabs :tabs="tabs"></tabs>
    </div>
</div>
</template>

<script>
import {mapState} from "vuex";
import Tabs from "../components/shared/Tabs";

export default {
    name: "Characters",
    components: { Tabs },
    computed: {
        ...mapState({
            charactersListLoading: state => state.charactersData.charactersListLoading,
            charactersListError: state => state.charactersData.charactersListError,
        }),
        tabs() {
            return this.$router.options.routes[0].children.find(route => route.name === this.$route.matched[1].name).children;
        }
    }
}
</script>

<style scoped></style>