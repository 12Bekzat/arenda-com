<template>
  <div class="create">
    <div class="create__label">
      <label for="">Название</label>
      <InputText v-model="item.title" />
    </div>
    <div class="create__label">
      <label for="">Тип обьявления</label>
      <Select
        v-model="item.type"
        :options="typeOfHome"
        :option-label="'name'"
        :option-value="'value'"
      />
    </div>
    <div class="create__label">
      <label for="">Тип сделки</label>
      <Select
        v-model="item.deal"
        :options="typeOfDeal"
        :option-label="'name'"
        :option-value="'value'"
      />
    </div>
    <div class="create__label">
      <label for="">Цена</label>
      <InputText v-model="item.price" type="number" />
    </div>
    <div class="create__label">
      <label for="">Адрес</label>
      <InputText v-model="item.address" />
    </div>
    <div class="create__label">
      <label for="">Площадь</label>
      <InputText v-model="item.area" type="number" />
    </div>
    <div class="create__label">
      <label for="">Количество комнат</label>
      <InputText v-model="item.rooms" type="number" />
    </div>
    <div class="create__label">
      <label for="">Есть парковка</label>
      <ToggleSwitch v-model="item.hasParking" />
    </div>
    <div class="create__label">
      <label for="">Есть мебель</label>
      <ToggleSwitch v-model="item.withFurniture" />
    </div>
    <div class="create__label">
      <label for="">Фото</label>
      <InputText v-model="item.image" />
    </div>
    <div class="create__label">
      <Message v-if="error" severity="error" variant="simple">{{ error }}</Message>
      <Button label="Создать" @click="save" />
    </div>
  </div>
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { Button, InputText, Message, Select, ToggleSwitch } from "primevue";
import { ref } from "vue";
import { useRouter } from "vue-router";

const item = ref({});
const images = ref([]);
const typeOfDeal = ref([
  {
    name: "Продажа",
    value: "sell",
  },
  {
    name: "Аренда",
    value: "rent",
  },
]);

const typeOfHome = ref([
  {
    name: "Дом",
    value: "house",
  },
  {
    name: "Квартира",
    value: "flat",
  },
]);

const error = ref('')

const { create } = useQuery();

const store = useUserStore();
const { user } = storeToRefs(store);

const fields = [
  "title",
  "type",
  "deal",
  "price",
  "address",
  "area",
  "rooms",
  "hasParking",
  "withFurniture",
  "image",
];

const router = useRouter()

const save = async () => {
  const ans = fields.every(field => {
    console.log('field', field, item.value[field]);
    
    return item.value[field]
  })
  console.log(ans);

  if (!ans) {
    error.value = 'Заполните все поля!'
    return
  }

  let answer = null
  try {
    const createItem = {
      ...item.value,
      userId: user.value?.id
    }
    answer = await create({ item: createItem, serviceName: 'property' })
  } catch (err) {
    error.value = 'Ошибка при создании!'
    return
  }

  if (answer) {
    router.push({ name: 'Catalog' })
  }
};
</script>
