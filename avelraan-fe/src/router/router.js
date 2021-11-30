import Vue from 'vue';
import VueRouter from 'vue-router';

import BaseLayout from "../layouts/BaseLayout";

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Base',
            component: BaseLayout,
        },
    ]
});

export default router;