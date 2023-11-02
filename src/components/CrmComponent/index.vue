<template>
  <div class="crm">
    <div class="crm__head">
      <div class="crm__head-card">
        <p>
          Найближчий тендер: UA-2021-20-12-13-1
        </p>
        <p>
          Відповідальний: Артем Пташенко
        </p>
        <p>
          Залишилось часу: 2г 5хв
        </p>
        <p>
          Статус: Завантаження
        </p>
      </div>
      <div class="crm__head-card">
        <p>
          Найближчий тендер: UA-2021-20-12-13-1
        </p>
        <p>
          Відповідальний: Артем Пташенко
        </p>
        <p>
          Залишилось часу: 4г 5хв
        </p>
        <p>
          Статус: Підготовка документів
        </p>
      </div>
    </div>
    <div class="table">
      <ul class="table__tabs">
        <li
            class="table__tab"
            @click="selectUser(0)"
        >
          Всі
        </li>
        <li
            v-for="tab of persona"
            :key="tab.id"
            class="table__tab"
            @click="selectUser(tab.id)"
        >
          {{tab.name}}
        </li>
        <li class="table__tab-search">
          <input type="text" placeholder="Пошук..." />
        </li>
      </ul>
      <ul class="table__body">
        <li
            v-for="item of filteredTodos"
            :key="item.id"
            class="table__body-rows"
            @click="handleTodosOpen(item.id)"
        >
          <div class="table__body-card">
            <div class="table__body-card-part">
              <h2 class="table__body-card-title">
                {{item.title}}
              </h2>
              <p>
                {{ setDateFormat(item.next_check, 'DD MMMM YYYY') || setDateFormat(item.date, 'DD MMMM YYYY')}}
              </p>
            </div>
            <div class="table__body-card-part">
              <p>
                Замовник: ТОВ ХХХХ
              </p>
              <p>
                Вартість: {{ formatAmount(item.value.amount, item.value.currency) }}
              </p>
            </div>
            <div class="table__body-card-part-resp">
              <p>
                ID: {{item.tenderID}}
              </p>
              <div class="table__body-card">
                <p v-show="item.resp_id">
                  Відповідальний: {{ personaName(item.resp_id) }}
                </p>
                <select
                    v-show="!item.resp_id"
                    class="table__body-card-resp-input"
                    @click.stop
                    @input="assignResp($event, item)"
                >
                  <option>Не назначено</option>
                  <option
                      v-for="resp of persona"
                      :value="resp.id"
                  >
                    {{resp.name}}
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div v-show="openedIds.includes(item.id)" class="table__body-card-details">
            <div class="table__body-card-part">
              <p>Вартість: 2500,00 грн</p>
              <p>Витрати: 1000,00 грн</p>
            </div>
            <div class="table__body-card-part">
              <p>
                Статус: Оплачено
              </p>
              <p>
                Статус: Очікує оплати
              </p>
            </div>
            <div class="table__body-card-part">
              <p>
                Дата: 11.10.2023
              </p>
              <p>
                Дата: -
              </p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
import {computed, ref} from "vue";
import {useDateFormat} from "@/composables/useDateFormat.js";
import {useAmountFormat} from "@/composables/useAmountFormat.js";
const {setDateFormat} = useDateFormat()
const {formatAmount} = useAmountFormat()
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

const selectedUser = ref(0)

const openedIds = ref([])
const handleTodosOpen = (id) => {
  const idx = openedIds.value.findIndex(todo => todo === id)
  idx >= 0 ? openedIds.value.splice(idx, 1) : openedIds.value.push(id)
}

const assignResp = (event, tender) => {
  const idx = tendersInWork.value.findIndex(item => item.tenderID === tender.tenderID);
  if (idx !== -1) {
    const id = Number(event.target.value);

    tendersInWork.value.splice(idx, 1, {
      ...tendersInWork.value[idx],
      resp_id: id
    });
  }
}

const tendersInWork = computed(() => {
  let tendersWithResp = JSON.parse(localStorage.getItem('in_work'));
  if (tendersWithResp) {
    tendersWithResp = tendersWithResp.map(tender => ({
      ...tender,
      resp_id: tender.resp_id || 0
    }));
  }

  return tendersWithResp || [];
})

const selectUser = (id) => {
  selectedUser.value = id
}

const filteredTodos = computed(() => selectedUser.value ? tendersInWork.value.filter(item => item.resp_id === selectedUser.value) : tendersInWork.value)

const personaName = (id) => {
  return persona.find(user => user.id === id)?.name
}
</script>

<style lang="scss">
.crm {
  height: 100%;

  &__head {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  &__head-card {
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    gap: 5px;

    border: 1px solid #222;
    width: fit-content;

    padding: 10px;
  }
}

.table {
  margin-top: 10px;

  &__tabs {
    list-style: none;
    padding: 0;

    display: flex;
    align-items: center;

    gap: 5px;
  }

  &__tab {
    background: #ececec;
    padding: 10px;
    cursor: pointer;

    &-search {
      flex-grow: 1;
      display: flex;
      justify-content: flex-end;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;

    list-style: none;

    &-head {
      display: flex;
      align-items: flex-end;
      justify-content: space-between;

      background: #e4ebff;
      border: 1px solid #222;

      padding: 10px;
    }
    &-rows {
      padding: 10px;
    }

    &-card {
      display: flex;
      align-items: center;
      justify-content: space-between;


      cursor: pointer;

      &-part {
        flex: 1;

        &-resp {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 5px;
        }
      }

      &-resp {


        &-input {
          border: none;
          width: 140px;
        }
      }

      &-title {
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        max-width: 310px;
      }

      &-details {
        margin-top: 10px;

        padding: 5px;

        border: 1px solid #222;

        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
}
</style>
