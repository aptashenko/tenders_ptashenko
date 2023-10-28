import { defineStore } from "pinia";
import {ref} from "vue";
import {API} from "@/api/index.js";

export const useMainStore = defineStore('MainStore', () => {
    const searchResults = ref(null)
    const tendersLoading = ref(false)

    console.log(tendersLoading.value)
    const getSearchResults = async (query) => {
        tendersLoading.value = true

        try {
            const { data, status } = await API.getTenders.tendersList(query)

            if (status === 200) {
                searchResults.value = data;
            }

        } catch(error) {
            console.log(error)
        } finally {
            tendersLoading.value = false
        }
    }

    const getTenderDetails = async (id) => {
        try {
            const { data, status } = await API.tenderDetails.detail(id)

            if (status === 200) {
                return data
            }

        } catch(error) {
            console.log(error)
        }
    }

    return {
        searchResults,
        tendersLoading,
        getSearchResults,
        getTenderDetails
    }
})
