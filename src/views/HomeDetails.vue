<template>
    <Breadcrumb :home="home" :model="items" />
    <div class="details">
        <div class="details__img">
            <img :src="item.image" alt="">
        </div>
        <div class="details__content">
            <div class="details__title">
                {{ item.title }}
            </div>
            <div class="details__price">
                <Tag :value="item.price + ' ' + (item.deal === 'Продажа' ? ' тг' : ' тг/месяц')"
                    style="font-size: 28px;" severity="info"></Tag>
            </div>
            <div class="details__text">
                Тип: {{ item.deal }}
            </div>
            <div class="details__text">
                Адрес: {{ item.address }}
            </div>
            <div class="details__text">
                Площадь: {{ item.area }} м<sup>2</sup>
            </div>
            <div class="details__text">
                Количество комнат: {{ item.rooms }}
            </div>
            <div class="details__text">
                Парковка: {{ item.hasParking ? "Есть" : 'Нет' }}
            </div>
            <div class="details__text">
                Мебель: {{ item.withFurniture ? "Есть" : 'Нет' }}
            </div>
            <div class="details__manage">
                <Button label="Купить" />
            </div>
        </div>
    </div>
    <div class="comment">
        <div class="comment__main">
            <Textarea rows="5" cols="30" style="width: 100%;" placeholder="Оставить отзыв"></Textarea>
            <Button label="Отправить" />
        </div>
        <div class="comment__list">
            <div class="review">
                <div class="review__author">User 1</div>
                <div class="review__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa ullam, dolorem
                    recusandae repellendus, beatae quos soluta laudantium neque pariatur suscipit minima nobis hic natus
                    nostrum odit eveniet quisquam perferendis reiciendis!</div>
                <div class="review__line">
                    <div class="review__subtext">12:40</div>
                    <i class="pi pi-arrow-up-right" variant="outlined" />
                    <i class="pi pi-heart" />
                    <i class="pi pi-thumbs-down" />
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { Breadcrumb, Button, Tag, Textarea } from 'primevue';
import { ref } from 'vue';

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: 'Каталог' },
    { label: 'Уютный дом...' },
]);

const item = {
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
}
</script>
