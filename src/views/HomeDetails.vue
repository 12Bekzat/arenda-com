<template>
  <Breadcrumb :home="home" :model="items" />
  <div class="details">
    <div class="details__img">
      <img :src="currentHome.image" alt="" />
    </div>
    <div class="details__content">
      <div class="details__title">
        {{ currentHome.title }}
      </div>
      <div class="details__price">
        <Tag
          :value="
            currentHome.price +
            ' ' +
            (currentHome.deal === 'Продажа' ? ' тг' : ' тг/месяц')
          "
          style="font-size: 28px"
          severity="info"
        ></Tag>
      </div>
      <div class="details__text">Тип: {{ currentHome.deal }}</div>
      <div class="details__text">Адрес: {{ currentHome.address }}</div>
      <div class="details__text">
        Площадь: {{ currentHome.area }} м<sup>2</sup>
      </div>
      <div class="details__text">
        Количество комнат: {{ currentHome.rooms }}
      </div>
      <div class="details__text">
        Парковка: {{ currentHome.hasParking ? "Есть" : "Нет" }}
      </div>
      <div class="details__text">
        Мебель: {{ currentHome.withFurniture ? "Есть" : "Нет" }}
      </div>
      <div class="details__manage">
        <Button label="Купить" @click="visible = true" />
        <Button
          label="Сохранить в избранные"
          @click="saveFavorite"
          v-if="isExist() == null"
        />
        <Button label="Удалить из избранных" severity="danger" @click="removeFavorite" v-else />
      </div>
    </div>
  </div>
  <div class="comment">
    <div class="comment__main">
      <Textarea
        v-model="review.message"
        rows="5"
        cols="30"
        style="width: 100%"
        placeholder="Оставить отзыв"
      ></Textarea>
      <Button label="Отправить" @click="sendReview" />
    </div>
    <div class="comment__list">
      <div class="review" v-for="rev in reviews">
        <div class="review__author">{{ rev?.user?.fullName }}</div>
        <div class="review__text">{{ rev?.message }}</div>
        <div class="review__line">
          <div class="review__subtext">
            {{ moment(rev?.created).format("HH:mm") }}
          </div>
          <span @click="like(rev)">
            {{ rev?.likes }}
            <i class="pi pi-heart" />
          </span>
          <span @click="disLike(rev)">
            {{ rev?.dislikes }}
            <i class="pi pi-thumbs-down" />
          </span>
        </div>
      </div>
    </div>
  </div>
  <Dialog v-model:visible="visible" modal style="width: 70%" header="Продавец">
    <div class="profile__data">
      <div class="profile__head">Полное имя</div>
      <div class="profile__text">{{ currentHome?.user?.fullName }}</div>
      <div class="profile__head">Номер телефона</div>
      <div class="profile__text">{{ currentHome?.user?.phone }}</div>
      <Button label="Написать" @click="write"></Button>
    </div>
  </Dialog>
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
import { storeToRefs } from "pinia";
import { Breadcrumb, Button, Dialog, Tag, Textarea } from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const store = useUserStore();
const { currentHome, user, messanger } = storeToRefs(store);
const router = useRouter();
const reviews = ref([]);
const favorites = ref([]);
const review = ref({});

const { getById, getPaged, create, update, remove } = useQuery();

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Каталог" }]);

const visible = ref(false);

const isExist = () => {
  const ans = favorites.value.find((fav) => {
    console.log(
      "favs",
      fav,
      fav?.userId === user.value?.id &&
        fav?.propertyId === currentHome.value?.id
    );

    return (
      fav?.userId === user.value?.id &&
      fav?.propertyId === currentHome.value?.id
    );
  });
  console.log(ans);
  
  return ans;
};

const write = async () => {
  messanger.value = {
    authorId: user.value?.id,
    receiverId: currentHome.value?.user?.id,
  };
  router.push({ name: "Messages" });
};

const getUser = async () => {
  let extraUser = {};
  try {
    extraUser = await getById({
      id: currentHome.value?.userId,
      serviceName: "users",
    });
  } catch (error) {
    extraUser = {};
  }

  currentHome.value.user = extraUser;
};

const saveFavorite = async () => {
  const item = {
    propertyId: currentHome.value?.id,
    userId: user.value?.id,
  };

  try {
    await create({ item, serviceName: "favorite" });
  } catch (error) {}

  await getFavorites();
};

const removeFavorite = async () => {
  const fav = favorites.value.find(
    (fav) =>
      fav?.propertyId === currentHome.value?.id &&
      fav?.userId === user.value?.id
  );

  if (!fav) return;

  try {
    await remove({ id: fav?.id, serviceName: "favorite" });
  } catch (error) {}

  await getFavorites();
};

const getFavorites = async () => {
  favorites.value = await getPaged({ serviceName: "favorite" }, user.value?.id);
};

const sendReview = async () => {
  if (!review.value?.message) {
    return;
  }

  const item = {
    ...review.value,
    likes: 0,
    dislikes: 0,
    userId: user.value?.id,
    propertyId: currentHome.value?.id,
    created: new Date(),
  };
  let ans = null;
  try {
    ans = await create({ item, serviceName: "review" });
  } catch (error) {
    ans = {};
  }

  if (ans) {
    await getReviews();
  }
};

const getReviews = async () => {
  try {
    reviews.value = await getPaged(
      { serviceName: "review" },
      currentHome.value?.id
    );
  } catch (err) {
    reviews.value = [];
  }
};

const like = async (review) => {
  let likes = review?.likes || 0;
  review.likes = likes + 1;

  let ans = null;
  try {
    review.userId = review?.user?.id;
    ans = await update({ item: review, serviceName: "review" });
  } catch (error) {
    ans = {};
  }

  if (ans) {
    await getReviews();
  }
};

const disLike = async (review) => {
  let likes = review?.dislikes || 0;
  review.dislikes = likes + 1;

  let ans = null;
  try {
    review.userId = review?.user?.id;
    ans = await update({ item: review, serviceName: "review" });
  } catch (error) {
    ans = {};
  }

  if (ans) {
    await getReviews();
  }
};

onMounted(async () => {
  if (!currentHome.value) {
    router.push({ name: "Catalog" });
  }

  items.value.push({ label: currentHome.value?.title });

  await getUser();
  await getReviews();
  await getFavorites();
});
</script>
