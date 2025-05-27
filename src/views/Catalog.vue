<template>
  <Breadcrumb :home="home" :model="items" />
  <div class="filter">
    <div class="filter__settings">
      <InputText type="text" v-model="filter.search" placeholder="Введите" />
      <Button
        :icon="
          'pi pi-filter-slash'
        "
        aria-label="Save"
        severity="secondary"
        @click="clearFilter"
      />
      <Button
        :icon="
          'pi ' +
          (sortOrder === 'desc' ? 'pi-sort-alpha-down' : 'pi-sort-alpha-up')
        "
        aria-label="Save"
        severity="secondary"
        @click="setSort('title')"
      />
      <Button
        :icon="
          'pi ' +
          (sortOrder === 'desc' ? 'pi-sort-numeric-down' : 'pi-sort-numeric-up')
        "
        aria-label="Save"
        severity="secondary"
        @click="setSort('price')"
      />
      <Button
        label="Создать обьявление"
        v-if="isCan()"
        @click="$router.push({ name: 'CreateHome' })"
      />
    </div>
    <div class="filter__main">
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-map"></i>
        </InputGroupAddon>
        <InputText
          v-model="filter.address"
          :options="cities"
          optionLabel="name"
          placeholder="Локация"
        />
      </InputGroup>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-shop"></i>
        </InputGroupAddon>
        <Select
          v-model="filter.type"
          :options="cities"
          optionLabel="name"
          placeholder="Тип недвижимости"
        />
      </InputGroup>
      <div style="display: flex; flex-direction: column; width: 100%; gap: 8px">
        <label for="">Диапазон цен</label>
        <InputText
          v-model="filter.price"
          type="text"
          readonly
          placeholder="Диапазон"
          style="width: 100%"
        />
        <Slider
          v-model="filter.price"
          range
          style="width: 100%"
          max="1000000000"
          min="5000"
        />
      </div>

      <div
        style="
          display: flex;
          flex-direction: row;
          flex-wrap: wrap;
          width: 100%;
          gap: 8px;
          justify-content: space-between;
        "
      >
        <label for="" style="width: 100%">Площадь</label>
        <InputText
          v-model="filter.from"
          type="number"
          placeholder="От"
          style="width: 46%"
        />
        <InputText
          v-model="filter.to"
          type="number"
          placeholder="До"
          style="width: 46%"
        />
      </div>
      <div
        style="
          display: flex;
          align-items: flex-start;
          width: 100%;
          flex-direction: column;
          flex-wrap: wrap;
          gap: 8px;
        "
      >
        <label for="" style="width: 100%">Количество комнат</label>
        <span>
          <Checkbox
            v-model="filter.rooms"
            inputId="countOfRooms1"
            name="countOfRooms"
            value="1"
          />
          <label for="countOfRooms1"> 1 </label>
        </span>
        <span>
          <Checkbox
            v-model="filter.rooms"
            inputId="countOfRooms2"
            name="countOfRooms"
            value="2"
          />
          <label for="countOfRooms2"> 2 </label>
        </span>
        <span>
          <Checkbox
            v-model="filter.rooms"
            inputId="countOfRooms3"
            name="countOfRooms"
            value="3"
          />
          <label for="countOfRooms3"> 3 </label>
        </span>
        <span>
          <Checkbox
            v-model="filter.rooms"
            inputId="countOfRooms4"
            name="countOfRooms"
            value="4"
          />
          <label for="countOfRooms4"> 4+ </label>
        </span>
      </div>
      <InputGroup>
        <InputGroupAddon>
          <i class="pi pi-chart-pie"></i>
        </InputGroupAddon>
        <Select
          v-model="filter.deal"
          :options="deals"
          optionLabel="name"
          placeholder="Тип сделки"
        />
      </InputGroup>
      <div style="display: flex; flex-direction: column; width: 100%">
        <label for="">Мебель</label>
        <ToggleButton
          v-model="filter.withFurniture"
          onLabel="С мебелью"
          offLabel="Без мебели"
          class="w-36"
          aria-label="Do you confirm"
        />
      </div>
      <div style="display: flex; flex-direction: column; width: 100%">
        <label for="">Парковка</label>
        <ToggleButton
          v-model="filter.hasParking"
          onLabel="Есть"
          offLabel="Нет"
          class="w-36"
          aria-label="Do you confirm"
        />
      </div>
    </div>
    <div class="filter__list">
      <div class="home" v-for="h in testProperties">
        <div class="home__img">
          <img :src="h.image" alt="" />
        </div>
        <div class="home__title">{{ h.title }}</div>
        <div class="home__price">
          <span class="price">{{ h.price }}</span>
          {{ h.deal === "sell" ? " тг" : " тг/месяц" }}
        </div>
        <Button label="Посмотреть" @click="openDetails(h)" />
      </div>
      <div class="title" v-if="testProperties.length <= 0">Обьявлении нет!</div>
    </div>
  </div>
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import {
  Breadcrumb,
  Button,
  Checkbox,
  InputGroup,
  InputGroupAddon,
  InputText,
  Select,
  Slider,
  ToggleButton,
} from "primevue";
import { computed, onMounted, ref, watch } from "vue";
import { useRouter } from "vue-router";

const search = ref("");
const selectedCity = ref("");
const cities = ref([
  {
    name: "Дом",
    value: "house",
  },
  {
    name: "Квартира",
    value: "flat",
  },
]);
const deals = ref([
  {
    name: "Продажа",
    value: "sell",
  },
  {
    name: "Аренда",
    value: "rent",
  },
]);

const sortOrder = ref("asc");
const sortField = ref("title");

const filter = ref({
  price: [5000, 1000000000],
  rooms: [],
});

const sort = () => {
  testProperties.value = testProperties.value.sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];

    if (aValue < bValue) return sortOrder.value === "asc" ? -1 : 1;
    if (aValue > bValue) return sortOrder.value === "asc" ? 1 : -1;
    return 0;
  });
};

const store = useUserStore();
const { user, currentHome } = storeToRefs(store);
const router = useRouter();

const setSort = (sortName) => {
  sortField.value = sortName;
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";

  sort();
};

const clearFilter = () => {
  filter.value = {
    rooms: []
  }
}

const isCan = (roleNames = ["ROLE_SELLER", "ROLE_ADMIN"]) => {
  return !!user.value?.roles?.find((role) => roleNames.includes(role?.name));
};

watch(search, () => {});

onMounted(async () => {
  await get();
});

const openDetails = (home) => {
  currentHome.value = home;

  router.push({ name: "HomeDetails" });
};

const { getPaged } = useQuery();

const get = async () => {
  try {
    testProperties.value = await getPaged({ serviceName: "property" });
  } catch {
    testProperties.value = [];
  }
};

const testProperties = ref([]);

watch(
  () => filter.value,
  async () => {
    console.log("filter change");
    console.log(filter.value);

    await get();
    sort();

    const items = testProperties.value.filter((item) => {
      console.log(item);

      const matchesSearch =
        !filter.value.search || item.title.includes(filter.value.search);
      const matchesAddress =
        !filter.value.address || item.address.includes(filter.value.address);
      const matchesType =
        !filter.value?.type || item.type === filter.value?.type?.value;
      const matchesDeal =
        !filter.value?.deal || item.deal === filter.value?.deal?.value;
      const matchesPrice =
        !filter.value?.price?.length ||
        (item.price >= filter.value?.price[0] &&
          item.price <= filter.value?.price[1]);
      const matchesArea =
        (!filter.value.from || item.area >= filter.value?.from) &&
        (!filter.value.to || item.area <= filter.value?.to);
      const matchesRooms =
        filter.value?.rooms?.length === 0 ||
        filter.value?.rooms?.includes(item.rooms + "");
      const matchesFurniture =
        (!filter.value?.withFurniture && typeof(filter.value?.withFurniture) != 'boolean') ||
        item.withFurniture === filter.value?.withFurniture;
      const matchesParking =
        (!filter.value?.hasParking && typeof(filter.value?.hasParking) != 'boolean') ||
        item.hasParking === filter.value?.hasParking;

      console.log(
        matchesSearch,
        matchesAddress,
        matchesType,
        matchesDeal,
        matchesPrice,
        matchesArea,
        matchesRooms,
        matchesFurniture,
        matchesParking
      );

      return (
        matchesSearch &&
        matchesAddress &&
        matchesType &&
        matchesDeal &&
        matchesPrice &&
        matchesArea &&
        matchesRooms &&
        matchesFurniture &&
        matchesParking
      );
    });

    testProperties.value = items;
  },
  { immediate: true, deep: true }
);

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Каталог" }]);
</script>
