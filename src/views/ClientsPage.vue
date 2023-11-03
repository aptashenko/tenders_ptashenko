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
import {useDateFormat} from "@/composables/useDateFormat.js";
import {useAmountFormat} from "@/composables/useAmountFormat.js";
const {setDateFormat} = useDateFormat()
const { formatAmount } = useAmountFormat()
const favoritesList = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const main = useMainStore();
const tendersInWork = ref(JSON.parse(localStorage.getItem('in_work')) || []);
const paymentsList = ref(JSON.parse(localStorage.getItem('payments')) || [])
const checkPaymentCost = (amount) => {
  if (amount < 200000) return 1600
  else if (amount >= 200000 && amount <= 3000000) return 2900
  else return 6000
}

const setTenderToWork = (idx, data) => {
  if (idx !== -1) {
    tendersInWork.value.splice(idx, 1)
    localStorage.setItem('in_work', JSON.stringify(tendersInWork.value))
    return true
  } else {
    if (data) {
      const formattedResp = data;
      formattedResp.is_paid = false;
      formattedResp.payment = checkPaymentCost(data.value.amount);
      tendersInWork.value.push(formattedResp);
      localStorage.setItem('in_work', JSON.stringify(tendersInWork.value))

      return formattedResp
    }
    return true
  }
}

const setPayment = (idx, payment) => {
  if (idx !== -1) {
    paymentsList.value.splice(idx, 1)
    localStorage.setItem('payments', JSON.stringify(paymentsList.value))
    return true
  } else {
    if (payment) {
      const paymentsInfo = {
        id: payment.id,
        tenderID: payment.tenderID,
        date: setDateFormat(new Date(), 'DD.MM.YYYY'),
        amount: formatAmount(payment.payment, 'UAH'),
        customer: 'ТОВ ХХХ',
        category: 'Підготовка тендеру',
        comment: 'за тендер',
      }
      paymentsList.value.push(paymentsInfo)
      localStorage.setItem('payments', JSON.stringify(paymentsList.value))

      return true
    }
    return true
  }

}

const toggleToWork = async (data) => {
  const idx = tendersInWork.value.findIndex(item => item.tenderID === data.tenderID);
  const noTender = setTenderToWork(idx);
  const noPayment = setPayment(idx)

  if (noTender && noPayment) {
    const resp = await main.getTenderDetails(data.tenderID)
    const payment = await setTenderToWork(idx, resp);
    setPayment(idx, payment)
  }

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
