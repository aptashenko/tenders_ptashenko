<template>
  <div class="finance-page">
    <div class="finance-page__tabs">
      <div class="balance">
        <p>Майбутні доходи:</p>
        <p class="balance__amount">
          {{formatAmount(unpaidBills, 'UAH')}}
        </p>
        <p>Майбутні витрати:</p>
        <p class="balance__amount">
          {{formatAmount(unpaidExpenses, 'UAH')}}
        </p>
        <p>На рахунку:</p>
        <p class="balance__amount">
          <b>{{formatAmount(currentBill, 'UAH')}}</b>
        </p>
        <p>Заплановане сальдо:</p>
        <p class="balance__amount">
          <b>{{formatAmount(futureCash, 'UAH')}}</b>
        </p>
      </div>
      <router-link
          class="finance-page__tabs-btn"
          :to="{name: 'stats'}"
      >
        Звіт
      </router-link>

      <button
          v-if="showPayButton"
          class="finance-page__tabs-btn-pay"
          @click="pay"
      >
        Оплачено
      </button>
    </div>
    <div class="finance-table">
      <DataTable
          v-model:selection="selectedProduct"
          v-model:expandedRows="selectedProduct"
          :value="formattedPayments"
          :row-class="rowClasses"
          dataKey="id"
      >
        <Column
            selectionMode="multiple"
            headerStyle="width: 3rem"
        />
        <Column
            v-for="column of columns"
            :field="column.field"
            :header="column.header"
            style="width: 20%; max-width: 130px"
        />
        <template #expansion="{data}">
          <DataTable
              :value="sortedMinus(data)"
              :row-class="subRowClasses"
              class="nested-table"
          >
            <Column
                :rowspan="2"
                style="width: 5%"
            />
            <Column
                v-for="column of minusCols"
                :field="column.field"
                :header="column.header"
                style="width: 17%; max-width: 90px; font-size: 14px;"
            >
              <template #body="{data, field}">
                {{field === 'amount' ? formatAmount(data[field], 'UAH') : (field === 'customer' ? persona.find(item => item.id === data[field])?.name || 'none' : data[field])}}
              </template>
            </Column>
            <Column
                style="width: 20%; max-width: 90px"
            >
              <template #body="slotProps">
                <button
                    v-if="!slotProps.data.is_paid"
                    @click="payExpen(slotProps.data)"
                >
                  +
                </button>
                <button
                    v-if="!slotProps.data.is_paid"
                    @click="payExpen(slotProps.data)"
                >
                  -
                </button>
              </template>
            </Column>
          </DataTable>
        </template>
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
import {useLocalStorageSetter} from "@/composables/useLocalStorageSetter.js";

const { formatAmount } = useAmountFormat()
const { setDateFormat } = useDateFormat();
const { setToLocaleStorage } = useLocalStorageSetter()

const columns = [
  { field: 'date', header: 'Дата' },
  { field: 'amount', header: 'Сума' },
  { field: 'customer', header: 'Контрагент' },
  { field: 'category', header: 'Категорія' },
  { field: 'comment', header: 'Коментар' },
  { field: 'updated', header: 'Оновлено' },
];

const minusCols = [
  { field: 'date', header: 'Дата'},
  { field: 'amount', header: 'Сума'},
  { field: 'customer', header: 'Працівник'},
  { field: 'category', header: 'Категорія'},
  { field: 'comment', header: 'Коментар'},
  { field: 'updated', header: 'Оновлено' },
]

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

const paymentsList = ref(JSON.parse(localStorage.getItem('payments')) || [])
const staffPayments = ref(JSON.parse(localStorage.getItem('staff_payments')) || [])

const selectedProduct = ref([]);

const showPayButton = computed(() => selectedProduct.value.length && selectedProduct.value.every(item => !item.is_paid))
const sortedMinus = (data) => {
  const value = staffPayments.value.find(item => item.id === data.tenderID)
  return [value]
}

const pay = () => {
  const item = paymentsList.value.find(item => selectedProduct.value.some(prod => item.tenderID === prod.tenderID))
  item.is_paid = true
  item.updated = setDateFormat(new Date(), 'DD.MM.YYYY, HH:mm')
  const newPayment = setToLocaleStorage('payments', paymentsList.value)
  selectedProduct.value = []
  paymentsList.value = newPayment;
}

const payExpen = (data) => {
  const dataIdx = staffPayments.value.findIndex(item => item.id === data.id);
  data.is_paid = true
  const newArray = staffPayments.value;
  newArray[dataIdx] = data;
  const newValue = setToLocaleStorage('staff_payments', newArray);

  staffPayments.value = newValue;
}

const rowClasses = (data) => {
  return data.is_paid ? 'paid' : 'unpaid'
}

const subRowClasses = (data) => {
  return data.is_paid ? 'paid-exp' : 'exp'
}

const formattedPayments = computed(() => paymentsList.value.map(item => ({...item, amount: formatAmount(item.amount, 'UAH')})))

const unpaidBills = computed(() => paymentsList.value.filter(item => !item.is_paid).reduce((acc, next) => acc + next.amount, 0))
const currentExpenses = computed(() => staffPayments.value.filter(item => item.is_paid).reduce((acc, next) => acc + next.amount, 0))
const currentBill = computed(() => paymentsList.value.filter(item => item.is_paid).reduce((acc, next) => acc + next.amount, 0) - currentExpenses.value)
const unpaidExpenses = computed(() => staffPayments.value.filter(item => !item.is_paid).reduce((acc, next) => acc + next.amount, 0))
const futureCash = computed(() => currentBill.value + currentExpenses.value + unpaidBills.value + unpaidExpenses.value)
</script>

<style lang="scss">
td[data-pc-section="rowexpansioncell"] {
  padding: 0;
}
td[data-pc-section="bodycell"] {
  box-sizing: border-box;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

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

  &__tabs {
    display: flex;
    align-items: flex-end;
    gap: 5px;

    margin-bottom: 10px;

    &-btn {
      border: none;
      padding: 10px 50px;
      background: #e4ebff;
      cursor: pointer;

      text-decoration: none;

      color: #222;

      border-radius: 25px;

      border: 1px solid transparent;

      transition: all .25s ease;

      &:hover {
        background: #F9FAFB;
        border-color: #e4ebff;
      }
    }

    &-btn-pay {
      border: none;
      padding: 10px 20px;
      background: #B4E87B;
      cursor: pointer;
      margin-left: auto;

      border-radius: 10px;

      transition: all .25s ease;

      &:hover {
        background: #94e547;
      }
    }
  }
}

.paid {
  background: #B4E87B;
  opacity: 0.5;
  transition: all .25s ease;
}

.paid-exp {
  background: #ffccca;
}

.balance {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  grid-gap: 10px;
  padding: 10px;
  border: 1px solid rgba(34, 34, 34, 0.1);
  border-radius: 10px;

  &__amount {
    text-align: right;
  }
}
</style>
