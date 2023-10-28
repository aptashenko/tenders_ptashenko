<template>
  <component
      :is="$attrs.to ? RouterLink : 'button'"
      :to="$attrs.to"
      :class="mainClass"
  >{{label}}</component>
</template>

<script setup>
import { RouterLink } from "vue-router";
import {computed} from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  },
  label: {
    type: String,
    default: ''
  }
})

const mainClass = computed(() => ({
  default: 'button',
  link: 'link'
})[props.variant])

</script>

<style lang="scss">
.link {
  display: inline-block;
  color: $primary-600;
  text-decoration: none;
}
</style>
