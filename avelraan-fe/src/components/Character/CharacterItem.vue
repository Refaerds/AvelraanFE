<template>
<div>
    <div :id="item.Id">
        <b-avatar size="md" rounded="lg" button
                  :class="['shadow-none border border-2', levelClass]"
                  :disabled="item.IsConsumable || disabled"
                  :src="imgUrl"
        ></b-avatar>
    </div>
    <b-popover :target="item.Id" triggers="hover">
        <div class="font-weight-bold">{{ item.Name }}</div>
        <div v-for="bonus in bonuses" :key="getKey(bonus)">{{ getBonusDescription(bonus) }}</div>
        <div>Worth: {{ item.Worth }}</div>
    </b-popover>
</div>


</template>

<script>
export default {
    name: "CharacterItem",
    props: {
        item: {
            type: Object,
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        imgUrl() {
            return require('../../assets/images/items/'+ this.item.Type + '.png');
        },
        levelClass() {
            const { Level } = this.item;

            if (Level === 1) return 'border-secondary';
            if (Level === 2) return 'border-light';
            if (Level === 3) return 'border-warning';
            if (Level > 3) return 'border-success';
            return 'border-secondary';
        },
        bonuses() {
            return Object.entries(this.item.Bonuses)?.filter(entry => entry[1]);
        }
    },
    methods: {
        getKey(bonus) {
            return 'bonus-' + bonus[0] + this.item.Id;
        },
        getBonusDescription(bonus) {
            const [stat, value] = bonus;
            return `${value > 0 ? '+' : ''}${value} to ${stat.slice(2)}`;
        }
    }
}
</script>

<style scoped>
.border-2 {
    border-width: 2px !important;
}
</style>