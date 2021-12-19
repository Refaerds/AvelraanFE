import Vue from 'vue';
import VueRouter from 'vue-router';

import BaseLayout from "../layouts/BaseLayout";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home',
            name: 'Base',
            component: BaseLayout,
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    component: () => import('../pages/Home')
                },
                {
                    path: '/characters',
                    redirect: '/characters/list',
                    name: 'Characters',
                    component: () => import('../pages/Characters'),
                    children: [
                        {
                            path: '/characters/list',
                            name: 'My Characters',
                            component: () => import('../pages/Characters/CharactersList')
                        },
                        {
                            path: '/characters/model',
                            name: 'Model',
                            component: () => import('../pages/Characters/CharacterModel')
                        },
                        {
                            path: '/characters/levelup',
                            name: 'Level Up',
                            component: () => import('../pages/Characters/CharacterLevelUp')
                        },
                        {
                            path: '/characters/create',
                            name: 'Create',
                            component: () => import('../pages/Characters/CharacterCreate')
                        },
                    ]
                },
                {
                    path: '/party',
                    name: 'Party',
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/items',
                    name: 'Items',
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/merchant',
                    name: 'Merchant',
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/fame',
                    name: 'Fame',
                    // component: () => import('../pages/Home')
                }
            ]
        },
    ]
});

export default router;