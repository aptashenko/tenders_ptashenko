<template>
  <li class="tender-item">
    <div class="tender-item__left">
      <base-button
          variant="link"
          :label="data.title"
          class="tender-item__title"
          :to="{name: 'tender-details', params: {id: data.tenderID}}"
      />
      <p class="tender-item__status">{{statusLabel}}</p>
      <p class="tender-item__buyer">{{data.procuringEntity.name}}</p>
      <p class="tender-item__address">{{buyersAdress}}</p>
      <p class="tender-item__id">ID: {{data.tenderID}}</p>
    </div>
    <div class="tender-item__right">
      <p class="tender-item__amount-title">
        Очікувана вартість
      </p>
      <p class="tender-item__amount">
        {{amount}}
      </p>
      <button
          class="tender-item__add-btn"
          @click="addToFavorite(data)"
      >
        {{ isInFavorite ? '-' : '+' }}
      </button>
    </div>
  </li>
</template>

<script setup>
import {useFindStatusLabel} from "@/composables/useFindStatusLabel.js";
import {computed, ref} from "vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import {useAmountFormat} from "@/composables/useAmountFormat.js";
const { formatAmount } = useAmountFormat()
const props = defineProps({
  data: {
    type: Object,
    default: () => {}
  }
})

const { statusLabel } = useFindStatusLabel(props.data.status)

const buyersAdress = computed(() => {
  const { locality, region } = props.data.procuringEntity.address;

  return `${region}, ${locality}`
})

const amount = computed(() => formatAmount(props.data.value.amount, props.data.value.currency))

const favoritesList = ref(JSON.parse(localStorage.getItem('favorites')) || [])

const isInFavorite = computed(() => favoritesList.value.find(item => item.tenderID === props.data.tenderID))

const addToFavorite = (data) => {
  const favoriteIds = JSON.parse(localStorage.getItem('favorites')) || [];
  const idx = favoriteIds.findIndex(item => item.tenderID === data.tenderID);

  idx >= 0 ? favoriteIds.splice(idx, 1) : favoriteIds.push(data);
  favoritesList.value = favoriteIds
  localStorage.setItem('favorites', JSON.stringify(favoritesList.value))
}

</script>

<style lang="scss">
.tender-item {
  padding: 16px 24px;
  border-radius: 5px;
  display: flex;

  background: #fff;

  &__left {
    width: 100%;
    max-width: 65%;
  }

  &__right {
    display: flex;
    flex-direction: column;
    max-width: 30%;
    width: 100%;
    margin-left: 40px;
  }

  &__title {
    margin-bottom: 10px;
  }

  &__status {
    font-size: 14px;
    margin-bottom: 10px;
    color: $success-2;
  }

  &__buyer {
    margin-bottom: 5px;
  }

  &__address {
    font-size: 14px;
    margin-bottom: 5px;
  }

  &__amount {
    font-size: 20px;
    color: $success-2;
  }

  &__amount-title {
    font-size: 14px;
    color: $gray-500;
    margin-bottom: 5px;
  }

  &__add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 25px;
    height: 25px;
    padding: 0;
    line-height: 1;
    margin-top: 10px;
  }
}
</style>
