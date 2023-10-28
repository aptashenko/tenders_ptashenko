import {computed} from "vue";
import { statuses } from "@/static/filter-names/index.js";

export const useFindStatusLabel = (id) => {
    const statusLabel = computed(() => statuses.find(item => item.id === id)?.name)

    return {
        statusLabel
    }
}
