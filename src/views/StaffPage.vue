<template>
  <div class="staff-page">
    <crm-component />
  </div>
</template>

<script setup>
import CrmComponent from '@/components/CrmComponent/index.vue'
</script>

<style lang="scss">
.staff-page {
  min-height: calc(100vh - 157px);
  padding: 20px;
  background: #fff;
}
</style>
