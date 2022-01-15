import Vue from 'vue';
import VueRouter from 'vue-router';

import BaseLayout from "../layouts/BaseLayout";

import { PAGES } from "../helpers";

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
                    name: PAGES.home.index,
                    component: () => import('../pages/Home')
                },
                {
                    path: '/characters',
                    redirect: '/characters/list',
                    name: PAGES.characters.index,
                    component: () => import('../pages/Characters'),
                    children: [
                        {
                            path: '/characters/list',
                            name: PAGES.characters.myCharacters,
                            component: () => import('../pages/Characters/CharactersList')
                        },
                        {
                            path: '/characters/model',
                            name: PAGES.characters.model,
                            component: () => import('../pages/Characters/CharacterModel')
                        },
                        {
                            path: '/characters/levelup',
                            name: PAGES.characters.levelUp,
                            component: () => import('../pages/Characters/CharacterLevelUp')
                        },
                        {
                            path: '/characters/create',
                            name: PAGES.characters.create,
                            component: () => import('../pages/Characters/CharacterCreate')
                        },
                    ]
                },
                {
                    path: '/party',
                    name: PAGES.party.index,
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/items',
                    name: PAGES.items.index,
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/merchant',
                    name: PAGES.merchant.index,
                    // component: () => import('../pages/Home')
                },
                {
                    path: '/fame',
                    name: PAGES.fame.index,
                    // component: () => import('../pages/Home')
                }
            ]
        },
    ]
});

export default router;