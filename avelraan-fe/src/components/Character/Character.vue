<template>
    <div class="m-3 d-flex flex-column align-items-center max-w-7">
        <div class="d-flex flex-row flex-nowrap">
            <div>
<!--                    TODO: add router link-->
                <b-avatar size="lg" rounded="lg"
                          :disabled="!char.IsAlive"
                          to="/"
                          @click="onCharacterClick"
                          :src="getImgUrl(char.Logbook.PortraitNr)"
                ></b-avatar>
                <div class="text-center mt-2 text-break">{{ char.Name }}</div>
            </div>
            <div class="d-flex flex-column pl-2">
<!--                    TODO: add router link-->
                <b-link v-if="char.HasLevelup"
                        @mouseenter="hoverClass = 'av-icon-animated'"
                        @mouseleave="hoverClass = ''"
                        to="/"
                >
                    <UpgradeIcon :class="['av-icon', hoverClass]" ></UpgradeIcon>
                </b-link>
            </div>
        </div>

    </div>
</template>

<script>
import UpgradeIcon from '../../assets/images/icons/upgrade.svg';

export default {
    name: "Character",
    components: {UpgradeIcon},
    props: {
        char: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            hoverClass: ''
        }
    },
    methods: {
        getImgUrl(nr) {
            return require('../../assets/images/humans/human'+ nr + '.png')
        },
        onCharacterClick() {
            //TODO
        }
    }
}
</script>

<style scoped>
.max-w-7 {
    max-width: 7rem;
}
</style>