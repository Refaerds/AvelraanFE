<template>
<b-tabs content-class="overflow-auto pt-3"
        class="h-100 d-flex flex-column"
        nav-wrapper-class="d-flex justify-content-center justify-content-md-end"
        align="center"
>
    <b-tab v-for="(tab,index) in tabs"
           :key="'tab-' + index"
           title-item-class="mt-1"
           @click="$router.push(computeUrl(tab.name)).catch(()=>{})"
           :active="isTabActive(tab.name)"
           :title="tab.name"
    ></b-tab>

    <router-view/>
</b-tabs>
</template>

<script>

export default {
    name: "Tabs",
    props: {
        tabs: {
            type: Array,
            required: true
        }
    },
    methods: {
        isTabActive(tabName) {
            return tabName === this.$route.name;
        },
        computeUrl(tabName) {
            let path = { name: tabName };
            return this.$router.resolve(path).location;
        }
    }
}
</script>

<style scoped>

</style>