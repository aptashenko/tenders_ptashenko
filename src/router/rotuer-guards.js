import {useAuthStore} from "@/stores/auth-store.js";

export const authGuard = (to, from, next) => {
    const authStore = useAuthStore();
    authStore.isAuth ? next() : next({name: 'login'})
}
