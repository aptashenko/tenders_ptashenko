<template>
  <div class="login-page">
    <div class="login">
      <Form
          class="login-form"
          :validation-schema="schema"
          @submit="onSubmit"
      >
        <form-text
            type="email"
            label="Логін"
            name="email"
        />
        <form-text
            type="password"
            label="Пароль"
            name="password"
        />
        <button type="submit">Вхід</button>
      </Form>
    </div>
  </div>
</template>

<style lang="scss">
.login-page {
  min-height: calc(100vh - 157px);
  padding: 20px;
  background: #fff;
  display: grid;
  place-items: center;
}

.login {
  padding: 80px 50px;
  width: fit-content;
  border: 1px solid rgba(34, 34, 34, 0.2);
  border-radius: 25px;
}

.login-form {
  display: flex;
  flex-direction: column;
  width: fit-content;
  gap: 20px;
}
</style>
<script setup>
import * as yup from "yup";
import FormText from "@/components/Form/FormText.vue";
import { Form } from "vee-validate";
import {useAuthStore} from "@/stores/auth-store.js";

const authStore = useAuthStore()
const onSubmit = (values) => {
  authStore.signIn(values)
};
const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required().min(3).max(10),
})
</script>
