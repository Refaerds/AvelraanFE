<template>
    <div class="max-w-7">
        <div :id="avatarId" class="d-flex flex-column align-items-center">
            <div class="d-flex flex-nowrap">
<!--                Avatar-->
                <b-avatar size="lg" rounded="lg"
                          badge-variant="danger" badge-offset="-0.4rem"
                          :disabled="!char.IsAlive"
                          to="/characters/model"
                          @click.native="setSelectedCharacterId(char.CharacterId)"
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
<!--                Level up icon-->
                <div v-if="hasLevelUp" class="d-flex flex-column pl-2">
                    <b-link @mouseenter="hoverClass = 'av-icon-animated'"
                            @mouseleave="hoverClass = ''"
                            @click.native="setSelectedCharacterId(char.CharacterId)"
                            to="/characters/levelup"
                    >
                        <upgrade-icon :class="['av-icon', 'fill-av-light-yellow', hoverClass]" ></upgrade-icon>
                    </b-link>
                </div>
            </div>
<!--            Char name-->
            <div v-if="showName" :class="['text-center mt-2 text-break', hasLevelUp ? 'pr-3' : '']">
                {{ char.Name }}
            </div>
        </div>

<!--            Dead tooltip-->
        <b-tooltip v-if="!char.IsAlive" :target="avatarId">
            This warrior has met his glorious end
        </b-tooltip>
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
        },
        showName: {
            type: Boolean,
            default: true
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
        },
        hasLevelUp() {
            return this.char.IsAlive && this.char.HasLevelup;
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