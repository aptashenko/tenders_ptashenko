<template>
  <div class="clients-page">
    <ul class="cards-list">
      <clients-dashboard-card
          v-for="card of favoritesList"
          :in-work="tendersInWork"
          :item="card"
          :class="{deactivated: main.isLoading}"
          @click="toggleToWork(card)"
      />
    </ul>
  </div>
</template>

<script setup>
import {ref} from "vue";
import ClientsDashboardCard from "@/components/pages/ClientsDashboard/ClientsDashboardCard.vue";
import {useMainStore} from "@/stores/main-store.js";
const favoritesList = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const main = useMainStore();
const tendersInWork = ref(JSON.parse(localStorage.getItem('in_work')) || []);
const toggleToWork = async (data) => {
  const idx = tendersInWork.value.findIndex(item => item.tenderID === data.tenderID);
  if (idx >= 0) {
    tendersInWork.value.splice(idx, 1)
    localStorage.setItem('in_work', JSON.stringify(tendersInWork.value))
    return
  }

  const resp = await main.getTenderDetails(data.tenderID)
  tendersInWork.value.push(resp);

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

.deactivated {
  opacity: 0.1;
}
</style>
