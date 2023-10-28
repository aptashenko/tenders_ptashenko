<template>
  <base-input
      :value="modelValue"
      @input="emit('update:modelValue', $event.target.value )"
      @change="handleChange"
  />
</template>
<script setup>
import BaseInput from "@/components/ui/BaseInput.vue";

defineProps({
  modelValue: {
    type: String
  }
})

const emit = defineEmits(['update:modelValue', 'find-tenders'])

const handleChange = () => {
  emit('find-tenders')
}
</script>
