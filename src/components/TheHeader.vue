<template>
  <header class="header">
    <router-link to="/">
      LOGO
    </router-link>
    <nav class="header__nav">
      <ul class="header__list">
        <li class="header__item">
          <router-link to="/" class="header__link">
            Home
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/clients" class="header__link">
            Clients window
          </router-link>
        </li>
        <li class="header__item">
          <router-link to="/staff" class="header__link">
            Staff window
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
}
</style>
