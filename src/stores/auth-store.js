import { defineStore } from "pinia";
import {computed, ref} from "vue";
import {useRouter} from "vue-router";
import {useLocalStorageSetter} from "@/composables/useLocalStorageSetter.js";

export const useAuthStore = defineStore('AuthStore', () => {
    const token = ref(localStorage.getItem('token'))
    const isAuth = computed({
        get: () => !!token.value,
        set: (value) => {
            token.value = value
            setToLocaleStorage('token', token.value)
        }
    })
    const router = useRouter()
    const {setToLocaleStorage} = useLocalStorageSetter()
    const signIn = (payload) => {
        setToLocaleStorage('user', payload)
        isAuth.value = '@#ewewa@ea213131123sadd##24124213412'
        router.push({name: 'home'})
    }

    return {
        isAuth,
        signIn
    }
})
