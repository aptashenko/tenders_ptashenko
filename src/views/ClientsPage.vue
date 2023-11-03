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
const {setDateFormat} = useDateFormat();

const main = useMainStore();

const favoritesList = ref(JSON.parse(localStorage.getItem('favorites')) || [])
const tendersInWork = ref(JSON.parse(localStorage.getItem('in_work')) || []);
const paymentsList = ref(JSON.parse(localStorage.getItem('payments')) || [])
const staffPayments = ref(JSON.parse(localStorage.getItem('staff_payments')) || [])
const checkPaymentCost = (amount) => {
  if (amount < 200000) return 1600
  else if (amount >= 200000 && amount <= 3000000) return 2900
  else return 6000
}

const persona = [
  {
    id: 1,
    name: 'Артем П.'
  },
  {
    id: 2,
    name: 'Дарина Р.'
  },
]

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
    staffPayments.value.splice(idx, 1)
    localStorage.setItem('payments', JSON.stringify(paymentsList.value))
    localStorage.setItem('staff_payments', JSON.stringify(staffPayments.value))
    return true
  } else {
    if (payment) {
      const paymentsInfo = {
        id: payment.id,
        tenderID: payment.tenderID,
        date: setDateFormat(new Date(), 'DD.MM.YYYY'),
        amount: payment.payment,
        customer: 'ТОВ ХХХ',
        category: 'Підготовка тендеру',
        comment: 'за тендер',
        updated: setDateFormat(new Date(), 'DD.MM.YYYY'),
      }

      const staffPayment = {
        id: payment.tenderID,
        date: setDateFormat(payment.next_check || payment.date, 'DD.MM.YYYY'),
        amount: -700,
        category: 'Підготовка тендеру',
        customer: persona.find(item => item.id === payment.resp_id)?.name || 'none',
        comment: `за тендер ${payment.tenderID}`,
        is_paid: false
      }

      paymentsList.value.push(paymentsInfo)
      staffPayments.value.push(staffPayment)
      localStorage.setItem('payments', JSON.stringify(paymentsList.value))
      localStorage.setItem('staff_payments', JSON.stringify(staffPayments.value))

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
