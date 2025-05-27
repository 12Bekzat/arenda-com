<template>
  <Breadcrumb :home="home" :model="items" />
  <div class="filter">
    <div class="filter__settings"></div>
    <div class="filter__main">
      <div class="user" v-for="person in users" @click="choosePerson(person)">{{ person?.fullName }}</div>
    </div>
    <div class="filter__list">
      <div class="messenger">
        <div
          :class="
            'messenger__item ' + (mess?.authorId === user?.id ? 'author' : '')
          "
          v-for="mess in messages"
        >
          <p>{{ mess?.text }}</p>
          <span class="time">{{ moment(mess.date).format("HH:mm") }}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="messenger__manage">
    <InputText v-model="message" placeholder="Написать" style="width: 100%" />
    <Button icon="pi pi-send" @click="send" />
  </div>
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import moment from "moment";
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
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useUserStore();
const { messanger, user, token } = storeToRefs(store);
const router = useRouter();

const message = ref("");
const messages = ref("");
const users = ref([]);

const { create, getPaged } = useQuery();

onMounted(async () => {
  if (
    !user.value ||
    !token.value ||
    !messanger.value?.authorId ||
    !messanger.value?.receiverId
  ) {
    router.push({ name: "Catalog" });
  }
  await get();
  await getUsers();
});

const getUsers = async () => {
  users.value = await getPaged({ serviceName: "users" });
};

const send = async () => {
  if (message.value === "") {
    return;
  }
  const item = {
    text: message.value,
    date: new Date(),
    ...messanger.value,
  };

  try {
    await create({ item, serviceName: "message" });
  } catch (error) {
    console.log(error);
  }

  await get();
};

const get = async () => {
  if (!messanger.value?.authorId || !messanger.value?.receiverId) return;
  messages.value = await getPaged(
    { serviceName: "message" },
    { ...messanger.value }
  );
};

const choosePerson = async (pers) => {
    messanger.value = {
        receiverId: pers?.id,
        authorId: user.value?.id,
    }

    await get()
}

const home = ref({
  icon: "pi pi-home",
});
const items = ref([{ label: "Написать" }]);
</script>
