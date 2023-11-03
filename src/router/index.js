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
            name: 'finance',
            path: '/finance',
            component: () => import('@/views/FinancePage.vue')
        },
        {
            name: 'profile',
            path: '/profile',
            component: () => import('@/views/ProfilePage.vue')
        },
    ]
})

export default router
