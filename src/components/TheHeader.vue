<template>
  <header class="header">
    <router-link to="/">
      LOGO
    </router-link>
    <nav class="header__nav">
      <ul class="header__list">
        <li
            v-for="(link, idx) of headerLinks"
            :class="[idx === 0 || idx === headerLinks.length - 1 ? 'header__item-ml' : 'header__item']"
        >
          <div
              v-if="link.id === 'auth'"
              class="header__auth-buttons"
          >
            <router-link
                v-for="button of link.data"
                :to="{name: button.name}"
            >
              {{button.label}}
            </router-link>
          </div>
          <template v-else>
            <router-link
                v-show="link.show"
                :to="{name: link.name}"
                class="header__link"
            >
              {{ link.label }}
            </router-link>
          </template>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import {computed, ref, toRef, watch} from "vue";
import {useAuthStore} from "@/stores/auth-store.js";
const authStore = useAuthStore();

const links = ref([
  {
    name: 'home',
    label: 'Головна',
    show: computed(() => authStore.isAuth),
  },
  {
    name: 'clients',
    label: 'Для користувачів',
    show: computed(() => authStore.isAuth),
  },
  {
    name: 'staff',
    label: 'Для працівників',
    show: computed(() => authStore.isAuth),
  },
  {
    name: 'analyse',
    label: 'Аналіз тендерної документації',
    show: computed(() => authStore.isAuth),
  },
  {
    name: 'finance',
    label: 'Фінанси',
    show: computed(() => authStore.isAuth),
  },
  {
    name: 'profile',
    label: 'Особистий кабінет',
    show: computed(() => authStore.isAuth),
  },
  {
    id: 'auth',
    show: computed(() => !authStore.isAuth),
    data: [
      {
        name: 'sign-up',
        label: 'Реєстрація',
      },
      {
        name: 'login',
        label: 'Вхід',
      },
    ]
  }
]);

const headerLinks = computed(() => links.value.filter(link => link.show))

</script>

<style lang="scss">
.header {
  background: #fff;
  padding: 20px;
  margin-bottom: 10px;

  display: flex;
  justify-content: space-between;
  gap: 20px;

  &__nav {
    flex-grow: 1;
  }

  &__list {
    list-style: none;
    padding: 0;
    margin: 0;

    display: flex;
    align-items: center;
    justify-content: flex-end;

    gap: 10px;
  }

  &__item-ml {
    margin-left: auto;
  }

  &__auth-buttons {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}
</style>
