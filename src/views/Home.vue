<template>
  <Carousel
    :value="items"
    :numVisible="1"
    :numScroll="1"
    circular
    :autoplayInterval="3000"
  >
    <template #item="{ data }">
      <div class="carousel">
        <div class="carousel__img">
            <img :src="data.src" alt="">
        </div>
        <div class="carousel__content">
            <div class="carousel__title">{{ data.title }}</div>
            <div class="carousel__text">{{ data.text }}</div>
        </div>
      </div>
    </template>
  </Carousel>
</template>
<script setup>
import { Carousel } from "primevue";
import { ref } from "vue";

const items = ref([
  {
    title: "Скидка 10% на аренду квартир в центре",
    text: "Только до конца месяца — аренда квартир в центре города со скидкой! Успей забронировать.",
    src: "https://example.com/images/discount-center-apartments.jpg",
  },
  {
    title: "Новые дома в пригороде от 50 000 ₸/мес",
    text: "Современные дома с ремонтом и удобствами. Идеально для семьи.",
    src: "https://example.com/images/suburb-houses-offer.jpg",
  },
  {
    title: "Первые 3 месяца без комиссии!",
    text: "Снимайте жильё без агентской комиссии. Только проверенные собственники.",
    src: "https://example.com/images/no-commission.jpg",
  },
]);

</script>
