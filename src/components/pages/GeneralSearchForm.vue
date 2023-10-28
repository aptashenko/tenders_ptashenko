<template>
  <div class="general-search-form">
    <main-search
        v-model="fields['general'].value"
        :placeholder="fields['general'].placeholder"
        @find-tenders="findTenders"
    />
  </div>
</template>
<script setup>
import MainSearch from "@/components/shared/inputs/MainSearch.vue";
import {useMainStore} from "@/stores/main-store.js";

const main = useMainStore()

const fields = {
  general: {
    type: 'text',
    value: '',
    placeholder: 'Назва або код товару, номер закупівлі, назва або ЄДРПОУ компанії',
    required: false,
  }
}

const findTenders = () => {
  main.getSearchResults({text: fields['general'].value})
}
</script>

<style lang="scss">
.general-search-form {
  padding: 20px;
  background: #fff;
}
</style>
