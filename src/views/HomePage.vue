<template>
  <div class="home-page">
    <general-search-form />
    <div class="home-page__list">
      <results-list />
    </div>
  </div>
</template>
<script setup>
import GeneralSearchForm from "@/components/pages/GeneralSearchForm.vue";
import ResultsList from "@/components/pages/ResultsList.vue";
</script>

<style lang="scss">
.home-page {
  display: flex;
  flex-direction: column;
  gap: 20px;

  &__list {
    position: relative;
    height: 100%;
    padding-bottom: 10px;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 30px;
      background: linear-gradient(0deg,#D0D5DD 0%,rgba(255,255,255,0) 75%);
      z-index: 10;
      pointer-events: none;
    }
  }
}
</style>
