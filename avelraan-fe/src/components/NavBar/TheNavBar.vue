<template>
<div class="py-3" id="the_nav_bar">
    <b-navbar toggleable="sm" type="dark">
        <b-navbar-toggle target="nav-collapse" class="border-0">
            <template>
                <menu-icon class="menu-icon"></menu-icon>
            </template>
        </b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
            <b-navbar-nav class="mx-auto">
                <b-nav-item v-for="item in navItems"
                            :key="item.name + '-nav-item'"
                            :to="item.path"
                            :active="isNavItemActive(item.name)"
                            class="mb-1 text-center"
                            style="min-width: 4rem"
                >
                    {{ item.name }}
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>

    </b-navbar>
</div>
</template>

<script>
import MenuIcon from '../../assets/images/icons/hamburger-menu.svg';

export default {
    name: "TheNavBar",
    components: { MenuIcon },
    computed: {
        navItems() {
            return this.$router.options.routes.find(route => (route.name === 'Base')).children;
        }
    },
    methods: {
        isNavItemActive(name) {
            return name === this.$route.matched[1].name;
        }
    }
}
</script>

<style scoped>

</style>