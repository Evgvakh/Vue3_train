import { createRouter, createWebHashHistory } from 'vue-router';
import Main from '@/pages/Main';
import PostPage from '@/pages/PostPage';
import About from '@/pages/About';
import OnePost from '@/pages/OnePost';
import PostPageWithStore from '@/pages/PostPageWithStore.vue';
import PostPageCompositionAPI from '@/pages/PostPageCompositionAPI.vue';

const routes = [
    {
        path: '/',
        component: Main
    },

    {
        path: '/posts',
        component: PostPage 
    },

    {
        path: '/about',
        component: About
    },

    {
        path: '/posts/:id',
        component: OnePost
    },

    {
        path: '/store',
        component: PostPageWithStore
    },

    {
        path: '/composition',
        component: PostPageCompositionAPI
    },
    
];

const router = createRouter({
    routes,
    history: createWebHashHistory(process.env.BASE_URL) 
});

export default router;
