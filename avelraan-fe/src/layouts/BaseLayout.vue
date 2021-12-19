<template>
<b-container fluid id="base" class="h-100 d-flex flex-column justify-content-between">

    <the-nav-bar></the-nav-bar>

    <b-container class="h-75" style="min-height: 500px;">
        <div class="d-flex justify-content-between align-items-center mt-n4">
            <h4 class="text-av-light-yellow mb-0 py-1">{{ pageName }}</h4>
            <the-character-selector v-if="pageName !== 'Home'"></the-character-selector>
        </div>

        <div class="bg-black-70 rounded-lg p-3 p-lg-4 overflow-auto h-100">
            <router-view></router-view>
        </div>
    </b-container>

    <div class="text-right text-white-50">
        <img src="../assets/images/base/white_aquila.jpeg" style="width: 1rem;" class="mr-1">
        <small>First playable prototype of Avelraangame version 1.0</small>
    </div>
</b-container>
</template>

<script>
import TheNavBar from "../components/NavBar/TheNavBar";
import TheCharacterSelector from "../components/TheCharacterSelector/TheCharacterSelector";

export default {
    name: "BaseLayout",
    components: { TheNavBar, TheCharacterSelector },
    computed: {
        pageName() {
            return this.$route.matched[1].name;
        }
    }
}
</script>

<style scoped>

#base {
    background-image: url('../assets/images/base/IronCrown_flag.jpeg');
    background-repeat: no-repeat;
    background-size: cover;
}
</style>