<template>
<span>
    <span v-b-tooltip="item.Name">
        <b-avatar size="md" rounded="lg" button
                  :class="['shadow-none border border-2', levelClass]"
                  :disabled="item.IsConsumable"
                  :src="imgUrl"
        ></b-avatar>
    </span>
</span>


</template>

<script>
export default {
    name: "CharacterItem",
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    computed: {
        imgUrl() {
            return require('../../assets/images/items/'+ this.item.Type + '.png');
        },
        levelClass() {
            const { Level } = this.item;

            if (Level === 1) return 'border-danger';
            if (Level === 2) return 'border-warning';
            if (Level === 3) return 'border-success';
            if (Level > 3) return 'border-info';
            return 'border-secondary';
        }
    }
}
</script>

<style scoped>
.border-2 {
    border-width: 2px !important;
}
</style>