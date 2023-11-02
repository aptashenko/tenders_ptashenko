<template>
  <li
      class="card"
      :class="{active: activeCard}"
  >
    <p class="card__id">
      {{item.tenderID}}
    </p>
    <p class="card__title">
      {{item.title}}
    </p>
  </li>
</template>

<script setup>
import {computed} from "vue";
const props = defineProps({
  item: {
    type: Object
  },
  inWork: {
    type: Array
  }
})

const activeCard = computed(() => props.inWork.find(tender => tender.tenderID === props.item.tenderID))

</script>

<style lang="scss">
.card {
  padding: 10px;
  border: 1px solid #222;
  border-radius: 10px;

  max-width: 300px;

  cursor: pointer;

  opacity: 0.7;

  transition: all .25s ease;

  &__title {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
}

.active {
  opacity: 1;
  box-shadow: 4px 4px 8px 0px rgba(34, 60, 80, 0.2);
}
</style>
