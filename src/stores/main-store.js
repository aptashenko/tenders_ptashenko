import { defineStore } from "pinia";
import {ref} from "vue";
import {API} from "@/api/index.js";
import {useLoading} from "@/composables/useLoading.js";

export const useMainStore = defineStore('MainStore', () => {
    const searchResults = ref(null)
    const {isLoading, toggleLoading} = useLoading()
    const getSearchResults = async (query) => {
        toggleLoading()

        try {
            const { data, status } = await API.getTenders.tendersList(query)

            if (status === 200) {
                searchResults.value = data;
            }

        } catch(error) {
            console.log(error)
        } finally {
            toggleLoading()
        }
    }

    const getTenderDetails = async (id) => {
        toggleLoading()
        try {
            const { data: {data}, status } = await API.tenderDetails.detail(id)

            if (status === 200) {
                return data
            }

        } catch(error) {
            console.log(error)
        } finally {
            toggleLoading()
        }
    }

    return {
        searchResults,
        isLoading,
        getSearchResults,
        getTenderDetails
    }
})
