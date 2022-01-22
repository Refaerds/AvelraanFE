<template>
<div class="h-100">
    <tabs :tabs="tabs"></tabs>
</div>
</template>

<script>
import Tabs from "../components/shared/Tabs";

export default {
    name: "Characters",
    components: { Tabs },
    computed: {
        tabs() {
            return this.$router.options.routes[0].children.find(route => route.name === this.$route.matched[1].name).children;
        }
    }
}
</script>

<style scoped></style>