<template>
  <div v-if="tenderInfo">
    {{ tenderInfo.data.title }}
    {{ tenderInfo.data.tenderID }}
  </div>
</template>

<script setup>
import {useMainStore} from "@/stores/main-store.js";
import {useRouter} from "vue-router";
import {ref, watchEffect} from "vue";

const main = useMainStore()
const { currentRoute } = useRouter();

const tenderInfo = ref(null)

watchEffect(async () => {
  tenderInfo.value = await main.getTenderDetails(currentRoute.value.params.id)
})

</script>
