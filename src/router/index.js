import { createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            component: () => import('@/views/HomePage.vue'),
        },
        {
            name: 'tender-details',
            path: '/tenders/:id',
            component: () => import('@/views/TenderDetails.vue')
        },
        {
            name: 'staff',
            path: '/staff',
            component: () => import('@/views/StaffPage.vue')
        },
        {
            name: 'clients',
            path: '/clients',
            component: () => import('@/views/ClientsPage.vue')
        },
        {
            path: '/finance',
            children: [
                {
                    name: 'finance',
                    path: '',
                    component: () => import('@/views/FinancePage.vue'),
                },
                {
                    name: 'stats',
                    path: 'stats',
                    component: () => import('@/components/pages/Finance/Statistic.vue'),
                },
            ]
        },
        {
            name: 'analyse',
            path: '/analyse',
            component: () => import('@/views/DocAnalys.vue')
        },
        {
            name: 'profile',
            path: '/profile',
            component: () => import('@/views/ProfilePage.vue')
        },
    ]
})

export default router
