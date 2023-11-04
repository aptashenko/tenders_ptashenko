<template>
  <label class="label">
    {{label}}
    <input
        v-mode="value"
        :type="$attrs.type || 'text'"
        :name="name"
        :value="inputValue"
        :placeholder="$attrs.placeholder"
        class="input"
        @input="handleInput"
    >
    <p class="help-message" v-show="errorMessage">
      {{ errorMessage }}
    </p>
  </label>
</template>

<script setup>
import {useField} from "vee-validate";
import {toRef} from "vue";

const props = defineProps({
  name: { type: String, required: true },
  label: { type: String, required: false },
})

const name = toRef(props, 'name');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value
});

const handleInput = ($event) => {
  handleChange($event.target.value)
}
</script>

<style lang="scss">
.label {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.help-message {
  font-size: 10px;
  margin-top: 5px;
  color: #FF3932;
}
</style>
