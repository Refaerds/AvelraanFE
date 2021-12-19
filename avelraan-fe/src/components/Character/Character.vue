<template>
    <div class="m-3 d-flex flex-column align-items-center max-w-7">
        <div class="d-flex flex-row flex-nowrap">
            <div :id="avatarId">
                <b-avatar size="lg" rounded="lg"
                          badge-variant="danger" badge-offset="-0.4rem"
                          :disabled="!char.IsAlive"
                          to="/characters/model"
                          @click="setSelectedCharacterId(char.CharacterId)"
                          :src="getImgUrl(char.Logbook.PortraitNr)"
                >
                    <template v-if="char.InFight" #badge>
                        <fight-icon class="av-icon"
                                    :id="avatarId + '-fight'"
                        ></fight-icon>
                        <b-tooltip :target="avatarId + '-fight'" placement="right">
                            {{ char.Name }} is in fight right now
                        </b-tooltip>
                    </template>
                </b-avatar>
                <div class="text-center mt-2 text-break">{{ char.Name }}</div>
            </div>

<!--            Dead tooltip-->
            <b-tooltip v-if="!char.IsAlive" :target="avatarId">
                This warrior has met his glorious end
            </b-tooltip>

<!--                Level up button-->
            <div class="d-flex flex-column pl-2">
                <!--                    TODO: add router link-->
                <b-link v-if="char.IsAlive && char.HasLevelup"
                        @mouseenter="hoverClass = 'av-icon-animated'"
                        @mouseleave="hoverClass = ''"
                        @click="setSelectedCharacterId(char.CharacterId)"
                        to="/characters/levelup"
                >
                    <upgrade-icon :class="['av-icon', hoverClass]" ></upgrade-icon>
                </b-link>
            </div>
        </div>

    </div>
</template>

<script>
import UpgradeIcon from '../../assets/images/icons/upgrade.svg';
import FightIcon from '../../assets/images/icons/fight.svg';
import { mapMutations } from "vuex";

export default {
    name: "Character",
    components: { UpgradeIcon, FightIcon },
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
    computed: {
        avatarId() {
            return 'character-avatar-' + this.char.CharacterId;
        }
    },
    methods: {
        ...mapMutations({
            setSelectedCharacterId: 'charactersData/setSelectedCharacterId'
        }),
        getImgUrl(nr) {
            return require('../../assets/images/humans/human'+ nr + '.png')
        }
    }
}
</script>

<style scoped>
.max-w-7 {
    max-width: 7rem;
}
</style>