<template>
  <Breadcrumb :home="home" :model="items" />
  <div class="filter">
    <div class="filter__settings">
      
    </div>
    <div class="filter__main">
     
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
import { onMounted, ref, watch } from "vue";
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
const rangePrice = ref([]);
const sortField = ref("title");
const sortOrder = ref("asc");
const filter = ref({
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

const setSort = (sortName) => {
  sortField.value = sortName;
  sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc";

  sort();
};

const store = useUserStore();
const { user, currentHome } = storeToRefs(store);
const router = useRouter();

const clearFilter = () => {
  filter.value = {
    rooms: [],
  };
};

const isCan = (roleNames = ["ROLE_SELLER", "ROLE_ADMIN"]) => {
  return !!user.value?.roles?.find((role) => roleNames.includes(role?.name));
};

onMounted(async () => {
  if (!user.value) router.push({ name: "Catalog" });
  await get();
});

const openDetails = (home) => {
  currentHome.value = home;

  router.push({ name: "HomeDetails" });
};

const { getPaged } = useQuery();

const get = async () => {
  try {
    testProperties.value = await getPaged(
      { serviceName: "favorite" },
      user.value?.id
    );
    testProperties.value = testProperties.value
      .filter((item) => item?.property)
      .map((item) => item.property);
  } catch {
    testProperties.value = [];
  }

  console.log(testProperties.value);
  
};

const testProperties = ref([]);

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Избранные" }]);
</script>
