<template>
    <Breadcrumb :home="home" :model="items" />
    <div class="filter">
        <div class="filter__settings">
            <InputText type="text" v-model="search" placeholder="Введите" />
            <Button icon="pi pi-sort-amount-up-alt" aria-label="Save" severity="secondary"/>
            <Button icon="pi pi-sort-alpha-up" aria-label="Save" severity="secondary"/>
            <Button icon="pi pi-sort-numeric-up" aria-label="Save" severity="secondary"/>
        </div>
        <div class="filter__main">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-map"></i>
                </InputGroupAddon>
                <InputText v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Локация" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-shop"></i>
                </InputGroupAddon>
                <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Тип недвижимости" />
            </InputGroup>
            <div style="display: flex; flex-direction: column; width: 100%; gap: 8px;">
                <label for="">Диапазон цен</label>
                <InputText v-model="rangePrice" type="text" readonly placeholder="Диапазон" style="width: 100%;" />
                <Slider v-model="rangePrice" range style="width: 100%;" max="1000000000" min="5000" />
            </div>

            <div
                style="display: flex; flex-direction: row; flex-wrap: wrap; width: 100%; gap: 8px; justify-content: space-between;">
                <label for="" style="width: 100%;">Площадь</label>
                <InputText v-model="fromPlace" type="number" placeholder="От" style="width: 46%;" />
                <InputText v-model="toPlace" type="number" placeholder="До" style="width: 46%;" />
            </div>
            <div style="display: flex; align-items: flex-start; width: 100%; flex-direction: column;  flex-wrap: wrap; gap: 8px;">
                <label for="" style="width: 100%;">Количество комнат</label>
                <span>
                    <Checkbox v-model="countOfRooms" inputId="countOfRooms1" name="countOfRooms" value="1" />
                    <label for="countOfRooms1"> 1 </label>
                </span>
                <span>
                    <Checkbox v-model="countOfRooms" inputId="countOfRooms2" name="countOfRooms" value="2" />
                    <label for="countOfRooms2"> 2 </label>
                </span>
                <span>
                    <Checkbox v-model="countOfRooms" inputId="countOfRooms3" name="countOfRooms" value="3" />
                    <label for="countOfRooms3"> 3 </label>
                </span>
                <span>
                    <Checkbox v-model="countOfRooms" inputId="countOfRooms4" name="countOfRooms" value="4" />
                    <label for="countOfRooms4"> 4+ </label>
                </span>
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-chart-pie"></i>
                </InputGroupAddon>
                <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Тип сделки" />
            </InputGroup>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-chart-pie"></i>
                </InputGroupAddon>
                <Select v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Состояние" />
            </InputGroup>
            <div style="display: flex; flex-direction: column; width: 100%;">
                <label for="">Мебель</label>
                <ToggleButton v-model="checked" onLabel="С мебелью" offLabel="Без мебели" class="w-36" aria-label="Do you confirm" />
            </div>
            <div style="display: flex; flex-direction: column; width: 100%;">
                <label for="">Можно с животными?</label>
                <ToggleButton v-model="checked" onLabel="Да" offLabel="Нет" class="w-36" aria-label="Do you confirm" />
            </div>
            <div style="display: flex; flex-direction: column; width: 100%;">
                <label for="">Парковка</label>
                <ToggleButton v-model="checked" onLabel="Есть" offLabel="Нет" class="w-36" aria-label="Do you confirm" />
            </div>
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-chevron-circle-up"></i>
                </InputGroupAddon>
                <InputText v-model="selectedCity" :options="cities" optionLabel="name" placeholder="Этаж" />
            </InputGroup>
        </div>
        <div class="filter__list">
            <div class="home" v-for="h in testProperties">
                <div class="home__img">
                    <img :src="h.image" alt="" />
                </div>
                <div class="home__title">{{ h.title }}</div>
                <div class="home__price"><span class="price">{{ h.price }}</span> {{ h.deal === 'Продажа' ? ' тг' : ' тг/месяц' }}</div>
                <Button label="Посмотреть" @click="$router.push({ name: 'HomeDetails' })"/>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Breadcrumb, Button, Checkbox, InputGroup, InputGroupAddon, InputText, Select, Slider, ToggleButton } from 'primevue';
import { ref } from 'vue';

const search = ref('')
const selectedCity = ref('')
const cities = ref([])
const rangePrice = ref([])
const fromPlace = ref([])
const toPlace = ref([])
const countOfRooms = ref([])

const testProperties = [
  {
    id: 1,
    title: "Уютный дом в пригороде с садом",
    type: "Дом",
    deal: "Продажа",
    price: 45000000, // тенге
    address: "Алматинская обл., п. Бесагаш, ул. Абая 12",
    area: 120, // м²
    rooms: 4,
    hasParking: true,
    withFurniture: true,
    image: "https://bigfoto.name/uploads/posts/2021-11/1637858864_3-bigfoto-name-p-dizain-domov-v-kazakhstane-3.jpg",
  },
  {
    id: 2,
    title: "2-комнатная квартира возле метро",
    type: "Квартира",
    deal: "Аренда",
    price: 180000, // в месяц
    address: "г. Алматы, пр. Абая 78, кв. 25",
    area: 65,
    rooms: 2,
    hasParking: false,
    withFurniture: true,
    image: "https://krisha-photos.kcdn.online/webp/6e/6ef8a06c-b7f3-491d-8b9f-181a9ec8238b/3-750x470.jpg",
  },
  {
    id: 3,
    title: "Новая квартира в ЖК HighVill",
    type: "Квартира",
    deal: "Продажа",
    price: 52000000,
    address: "г. Астана, ул. Сыганак 20",
    area: 75,
    rooms: 3,
    hasParking: true,
    withFurniture: false,
    image: "https://krisha-photos.kcdn.online/webp/95/9535a059-225f-478f-856a-7a826a3c3d10/21-750x470.jpg",
  },
  {
    id: 4,
    title: "Дом в горах с панорамным видом",
    type: "Дом",
    deal: "Аренда",
    price: 350000,
    address: "Алматинская обл., Бутаковка",
    area: 160,
    rooms: 5,
    hasParking: true,
    withFurniture: true,
    image: "https://kostanews.kz/wp-content/uploads/2023/02/nedvizhka.jpg",
  },
  {
    id: 5,
    title: "Коммерческое помещение в центре",
    type: "Коммерческая",
    deal: "Аренда",
    price: 500000,
    address: "г. Алматы, ул. Байтурсынова 45",
    area: 90,
    rooms: 2,
    hasParking: true,
    withFurniture: false,
    image: "https://krisha-photos.kcdn.online/webp/f6/f6ecb9ea-3916-4291-af51-aaa7c9818931/2-750x470.jpg",
  },
];

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Каталог' }
]);
</script>
