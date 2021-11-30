<template>
<div class="py-3" id="the_nav_bar">
    <b-nav align="center">
        <b-nav-item v-for="item in navItems"
                    :key="item.name + '-nav-item'"
                    :to="item.path"
                    :active="isNavItemActive(item.name)"
                    class="mb-1"
        >
            {{ item.name }}
        </b-nav-item>
    </b-nav>
</div>
</template>

<script>
export default {
    name: "TheNavBar",
    computed: {
        navItems() {
            return this.$router.options.routes.find(route => (route.name === 'Base')).children;
        }
    },
    methods: {
        isNavItemActive(name) {
            return name === this.$route.name;
        }
    }
}
</script>

<style scoped>

</style>