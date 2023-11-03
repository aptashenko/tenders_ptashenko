<template>
  <header class="header">
    <router-link to="/">
      LOGO
    </router-link>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item-ml">
          <router-link to="/" class="header__link">
            Головна
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/clients" class="header__link">
            Для користувачів
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/staff" class="header__link">
            Для працівників
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/analyse" class="header__link">
            Аналіз тендерої документації
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/finance" class="header__link">
            Фінанси
          </router-link>
        </li>
        <li class="header__item-ml">
          <router-link to="/profile" class="header__link">
            Кабінет
          </router-link>
        </li>
      </ul>
    </nav>
  </header>
</template>

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
}
</style>
