<template>
    <div class="d-flex align-items-center mb-1">
        <b-badge variant="warning"
                 :class="{'text-danger': valueIsLow}"
        >
            {{ value }}
        </b-badge>
        <span class="ml-1">{{ label }}</span>
    </div>
</template>

<script>
export default {
    name: "CharacterStat",
    props: {
        label: {
            type: String,
            required: true
        },
        value: {
            type: [String, Number],
            required: true
        }
    },
    computed: {
        valueIsLow() {
            return this.value <= 0;
        }
    }
}
</script>

<style scoped>

</style>