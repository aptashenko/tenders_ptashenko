<template>
  <tenders-list
      :tenders="main.searchResults"
  >
    <tenders-item
        v-for="tender of main.searchResults.data"
        :data="tender"
    />
  </tenders-list>
</template>
<script setup>
import TendersList from "@/components/shared/tenders-table/TendersList.vue";
import TendersItem from "@/components/shared/tenders-table/TendersItem.vue";

import {useMainStore} from "@/stores/main-store.js";

const main = useMainStore()

main.getSearchResults()
</script>
