<template>
  <ul class="tenders-list">
    <template v-if="!main.isLoading">
      <slot v-if="tenders" />
    </template>
    <template v-else>
      <div class="tenders-list__loader">
        <the-loader />
      </div>
    </template>
  </ul>
</template>

<script setup>
import TheLoader from "@/components/ui/TheLoader.vue";
import {useMainStore} from "@/stores/main-store.js";

const main = useMainStore()
defineProps({
  tenders: {
    type: Array,
    default: () => []
  }
})
</script>

<style lang="scss">
.tenders-list {
  flex-grow: 1;
  list-style: none;

  display: flex;
  flex-direction: column;
  gap: 20px;

  overflow: scroll;
  max-height: calc(100vh - 263px);

  &::-webkit-scrollbar {
    display: none;
  }
}

.tenders-list__loader {
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
}
</style>
