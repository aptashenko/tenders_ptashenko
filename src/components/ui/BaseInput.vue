<template>
  <div class="input-wrapper">
    <input
        :type="$attrs.type || 'text'"
        :placeholder="$attrs.placeholder"
        :id="$attrs.id"
        :name="$attrs.name"
        :value="$attrs.value"
        :class="[mainClass, 'input']"
    />
  </div>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})

const mainClass = computed(() => ({
  default: 'base-input'
})[props.variant])
</script>

<style lang="scss">
.input-wrapper {
  padding: 10px 14px;
  border-radius: 999px;
  border: 1px solid $gray-500;
  box-shadow: 0px 1px 2px 0px rgba(16, 24, 40, 0.05);
  background: #fff;

  & input {
    width: 100%;
    border: none;
    outline: none;
    padding: 0;

    &:focus .input-wrapper {
      border: 1px solid $primary-300;
    }
  }
}
.base-input {

}
</style>
