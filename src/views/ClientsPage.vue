<template>
  <div class="clients-page">
    <ul class="cards-list">
      <clients-dashboard-card
          v-for="card of favoritesList"
          :in-work="tendersInWork"
          :item="card"
          @click="toggleToWork(card)"
      />
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ClientsDashboardCard from "@/components/pages/ClientsDashboard/ClientsDashboardCard.vue";

const favoritesList = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const tendersInWork = ref(JSON.parse(localStorage.getItem('in_work')) || [])
const toggleToWork = (data) => {
  const items = JSON.parse(localStorage.getItem('in_work')) || [];
  const idx = items.findIndex(item => item.tenderID === data.tenderID);
  idx >= 0 ? items.splice(idx, 1) : items.push(data);
  tendersInWork.value = items
  localStorage.setItem('in_work', JSON.stringify(tendersInWork.value))
}
</script>

<style lang="scss">
.clients-page {
  min-height: calc(100vh - 157px);
  padding: 20px;
  background: #fff;
}

.cards-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}


</style>
