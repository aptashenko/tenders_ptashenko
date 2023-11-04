import { createRouter, createWebHistory} from "vue-router";
import { authGuard } from "@/router/rotuer-guards.js";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: 'home',
            path: '/',
            beforeEnter: authGuard,
            component: () => import('@/views/HomePage.vue'),
        },
        {
          name: 'login',
          path: '/login',
          component: () => import('@/views/AuthPage.vue')
        },
        {
            name: 'sign-up',
            path: '/registration',
        },
        {
            name: 'tender-details',
            path: '/tenders/:id',
            beforeEnter: authGuard,
            component: () => import('@/views/TenderDetails.vue')
        },
        {
            name: 'staff',
            path: '/staff',
            beforeEnter: authGuard,
            component: () => import('@/views/StaffPage.vue')
        },
        {
            name: 'clients',
            path: '/clients',
            beforeEnter: authGuard,
            component: () => import('@/views/ClientsPage.vue')
        },
        {
            path: '/finance',
            beforeEnter: authGuard,
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
            beforeEnter: authGuard,
            component: () => import('@/views/DocAnalys.vue')
        },
        {
            name: 'profile',
            path: '/profile',
            beforeEnter: authGuard,
            component: () => import('@/views/ProfilePage.vue')
        },
    ]
})

export default router
