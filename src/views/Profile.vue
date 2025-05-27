<template>
  <div class="profile">
    <div class="profile__img">
      <div class="profile__avatar">
        {{ user?.fullName ? user?.fullName[0] : "A" }}
      </div>
    </div>
    <div class="profile__content">
      <div class="profile__title">{{ user?.fullName || "Not Found" }}</div>
      <div class="profile__data">
        <div class="profile__head">Имя пользователя</div>
        <div class="profile__text">{{ user?.username }}</div>
        <div class="profile__head">Номер телефона</div>
        <div class="profile__text">{{ user?.phone }}</div>
        <div class="profile__head">Роль</div>
        <div class="profile__text">
          {{ user?.roles?.map((role) => getRole(role.name)).join(", ") }}
        </div>
      </div>
    </div>
  </div>
  <div class="manage">
    <Button label="Редактировать" @click="visible = true" />
    <Button
      label="Выйти"
      variant="outlined"
      severity="danger"
      @click="signOut"
    />
  </div>
  <Dialog v-model:visible="visible" modal header="Редактировать профиль">
    <div class="login">
      <div class="login__content">
        <Message v-if="error" severity="error" variant="simple">{{
          error
        }}</Message>
        <div class="login__label">
          <label for="fullName">Полное имя</label>
          <InputText
            id="fullName"
            v-model="fullName"
            placeholder="Полное имя"
          />
        </div>
        <div class="login__label">
          <label for="phone">Номер телефона</label>
          <InputMask
            id="phone"
            v-model="phone"
            mask="+7(999) 999-9999"
            placeholder="+7(999) 999-9999"
            fluid
          />
        </div>
        <div class="login__label">
          <label for="password">Пароль</label>
          <Password
            id="password"
            v-model="password"
            placeholder="Пароль"
            input-style="width: 100%;"
            style="width: 100%"
            toggle-mask
          />
        </div>
        <Button label="Сохранить" @click="save" />
      </div>
    </div>
  </Dialog>
  <Toast />
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import {
  Avatar,
  Button,
  Dialog,
  InputMask,
  InputText,
  Password,
  Toast,
  useToast,
} from "primevue";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";

const getRole = (role) => {
  const roleName = {
    ROLE_ADMIN: "Админстратор",
    ROLE_BUYER: "Покупатель",
    ROLE_SELLER: "Продавец",
  };

  return roleName[role];
};

const toast = useToast()

const visible = ref(false);
const fullName = ref('');
const phone = ref('');
const password = ref('');

const store = useUserStore();
const { user, isAuth, token } = storeToRefs(store);

const { update } = useQuery();

const router = useRouter();

const save = async () => {
  try {
    await update({
      item: { userDto: { fullName: fullName.value, phone: phone.value, roles: [], username: null, password: password.value }, id: user.value?.id },
      serviceName: "users",
    });
  } catch (error) {
    toast.add({ severity: 'danger', summary: 'Ошибка', detail: 'Ошибка при сохранении', life: 3000 });
  }
};

const signOut = () => {
  isAuth.value = false;
  user.value = {};
  token.value = {};
  localStorage.removeItem("jwt_token");
};

onMounted(() => {
  if (!user.value || !isAuth.value || !token.value || !localStorage.getItem("jwt_token")) {
    router.push({ name: "Home" });
  }

  fullName.value = user.value?.fullName
  phone.value = user.value?.phone
});
</script>
