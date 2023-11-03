<template>
  <div class="finance-page">
    <div>
      <button @click="changeTab(0)">Очікують оплати</button>
      <button @click="changeTab(1)">Оплачені</button>
    </div>
    <div v-if="!paid" class="finance-table">
      <DataTable
          v-model:selection="selectedProduct"
          v-model:expandedRows="selectedProduct"
          :value="unpaidPayments"
          dataKey="id"
          tableStyle="min-width: 50rem"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem" />
        <Column
            v-for="column of columns"
            :field="column.field"
            :header="column.header"
        />
        <template #expansion="{data}">
          <DataTable
              :value="sortedMinus(data)"
              class="nested-table"
          >
            <Column
                v-for="column of minusCols"
                :field="column.field"
                :header="column.header"
            />
          </DataTable>
        </template>
      </DataTable>
    </div>
    <div v-else>
      <DataTable
          v-model:selection="selectedProduct"
          :value="!unpaidPayments"
          dataKey="id"
          tableStyle="min-width: 50rem"
      >
        <Column selectionMode="multiple" headerStyle="width: 3rem" />
        <Column
            v-for="column of columns"
            :field="column.field"
            :header="column.header"
        />
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from 'vue';
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import {useAmountFormat} from "@/composables/useAmountFormat.js";
import {useDateFormat} from "@/composables/useDateFormat.js";

const { formatAmount } = useAmountFormat()
const { setDateFormat } = useDateFormat();
const paid = ref(0)

const columns = [
  { field: 'date', header: 'Дата' },
  { field: 'amount', header: 'Сума' },
  { field: 'customer', header: 'Контрагент' },
  { field: 'category', header: 'Категорія' },
  { field: 'comment', header: 'Коментар' },
];

const minusCols = [
  { field: 'amount', header: 'Сума'},
  { field: 'customer', header: 'Працівник'},
  { field: 'category', header: 'Категорія'},
  { field: 'date', header: 'Дата'},
  { field: 'comment', header: 'Коментар'},
]

const paymentsList = ref(JSON.parse(localStorage.getItem('payments')) || [])
const tendersInWork = ref(JSON.parse(localStorage.getItem('in_work')) || [])

const unpaidPayments = computed(() => {
  return paymentsList.value.filter(payment => {
    const tender = tendersInWork.value.find(item => item.id === payment.id);
    if (!tender.is_paid) {
      return payment.id === tender.id
    }
  })
})

const selectedProduct = ref(null);

const staffPaymentsList = computed(() => {
  return tendersInWork.value.map(tender => {
    return {
      id: tender.tenderID,
      amount: formatAmount(-700, 'UAH'),
      category: 'Підготовка тендеру',
      customer: tender.resp_id || 'none',
      date: setDateFormat(tender.next_check || tender.date, 'DD.MM.YYYY'),
      comment: `за тендер ${tender.tenderID}`
    }
  })
})

const sortedMinus = (data) => {
  const value = staffPaymentsList.value.find(item => item.id === data.tenderID)
  console.log(value)
  return [value]
}

const changeTab = (tab) => {
  paid.value = tab
}

</script>

<style lang="scss">
.nested-table {
  & thead {
    display: none;
  }

  & .p-datatable-tbody > tr > td {
    border-bottom: none;
  }
}
.finance-page {
  min-height: calc(100vh - 157px);
  padding: 20px;
  background: #fff;
}
</style>
