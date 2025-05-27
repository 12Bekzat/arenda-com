<template>
  <Carousel
    :value="items"
    :showNavigators="false"
    :numVisible="1"
    :numScroll="1"
    circular
    :autoplayInterval="5000"
  >
    <template #item="{ data }">
      <div class="carousel">
        <div class="carousel__img">
          <img :src="data.src" alt="" />
        </div>
        <div class="carousel__content">
          <div class="carousel__title">{{ data.title }}</div>
          <div class="carousel__text">{{ data.text }}</div>
        </div>
      </div>
    </template>
  </Carousel>

  <div class="title">Популярные объекты</div>
  <div class="filter__list" style="align-self: center">
    <div class="home" v-for="h in testProperties">
      <div class="home__img">
        <img :src="h.image" alt="" />
      </div>
      <div class="home__title">{{ h.title }}</div>
      <div class="home__price">
        <span class="price">{{ h.price }}</span>
        {{ h.deal === "Продажа" ? " тг" : " тг/месяц" }}
      </div>
      <Button
        label="Посмотреть"
        @click="$router.push({ name: 'HomeDetails' })"
      />
    </div>
  </div>

  <Carousel
    :value="reviews"
    :numVisible="1"
    :numScroll="1"
    :showNavigators="false"
    :showIndicators="false"
    circular
    :autoplayInterval="5000"
  >
    <template #item="{ data }">
      <div class="quote">
        <i class="quote__title">{{ data.title }}</i>
        <i class="quote__text">- {{ data.text }}</i>
      </div>
    </template>
  </Carousel>
</template>
<script setup>
import { Button, Carousel } from "primevue";
import { onMounted, ref } from "vue";

import BG1 from "@assets/bg-1.jpg";
import BG2 from "@assets/bg-2.webp";
import BG3 from "@assets/bg-3.webp";
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const { getPaged } = useQuery()
const store = useUserStore()
const { user } = storeToRefs(store)

const items = ref([
  {
    title: "Скидка 10% на аренду квартир в центре",
    text: "Только до конца месяца — аренда квартир в центре города со скидкой! Успей забронировать.",
    src: BG1,
  },
  {
    title: "Новые дома в пригороде от 50 000 ₸/мес",
    text: "Современные дома с ремонтом и удобствами. Идеально для семьи.",
    src: BG2,
  },
  {
    title: "Первые 3 месяца без комиссии!",
    text: "Снимайте жильё без агентской комиссии. Только проверенные собственники.",
    src: BG3,
  },
]);

const reviews = ref([
  {
    title: `Искала квартиру для покупки в новостройке. Удобный фильтр, подробные описания и фотографии — всё супер. Созвонилась с владельцем через платформу и быстро договорились. Спасибо за отличную работу!`,
    text: "Алия, Алматы",
  },
  {
    title:
      "Очень удобно, что можно связаться напрямую с собственником. Нашёл жильё в центре, цена адекватная, всё честно. Платформа — находка для тех, кто не хочет тратить деньги на агентов.",
    text: "Максим, Астана",
  },
  {
    title:
      "Разместил объявление — уже на следующий день начались звонки. Всё просто: загрузил фото, описал дом, указал цену. Сделка прошла быстро. Платформа работает отлично!",
    text: "Жанболат, Шымкент",
  },
]);

onMounted(async () => {
  await getProperties()
})

const getProperties = async () => {
  try {
    testProperties.value = await getPaged({ serviceName: 'property' })
    testProperties.value = testProperties.value.filter((_, ind) => ind < 3);
  } catch {
    testProperties.value = []
  }
}

const testProperties = ref([])
</script>
