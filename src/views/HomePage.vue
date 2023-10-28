<template>
  <div class="home-page">
    <general-search-form />
    <results-list />
  </div>
</template>
<script setup>
import GeneralSearchForm from "@/components/pages/GeneralSearchForm.vue";
import ResultsList from "@/components/pages/ResultsList.vue";
</script>

<style lang="scss">
.home-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
