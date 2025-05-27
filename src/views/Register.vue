<template>
  <div class="form">
    <div class="form__content">
      <div class="login">
        <div class="login__content">
          <div class="login__title">Регистрация</div>
          <Message v-if="error" severity="error" variant="simple">{{ error }}</Message>
          <div class="login__label">
            <label for="fullName">Полное имя</label>
            <InputText
              id="fullName"
              v-model="fullName"
              placeholder="Полное имя"
            />
          </div>
          <div class="login__label">
            <label for="username">Имя пользователя</label>
            <InputText
              id="username"
              v-model="username"
              placeholder="Имя пользователя"
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
          <div class="login__label">
            <label for="role">Роль</label>
            <Select
              id="role"
              v-model="role" :options="roles" optionLabel="label" placeholder="Выберите роль" style="width: 100%;"
            />
          </div>
          <RouterLink class="login__url" to="/login"
            >Уже есть аккаунт?</RouterLink
          >
          <Button label="Зарегестрироваться" @click="submitLogin" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";

// PrimeVue компоненты
import InputText from "primevue/inputtext";
import Password from "primevue/password";
import Button from "primevue/button";
import { InputMask, Message, Select } from "primevue";
import { useQuery } from "@/composables/useQuery";

const router = useRouter();

const username = ref("");
const fullName = ref("");
const phone = ref("");
const password = ref("");
const roles = [
  {
    value: 'ROLE_SELLER',
    label: 'Продавец'
  },
  {
    value: 'ROLE_BUYER',
    label: 'Покупатель'
  },
]
const role = ref(roles[0])

const { register } = useQuery();

const error = ref("");

const submitLogin = async () => {
  error.value = "";
  console.log('error');
  

  if (
    username.value === "" ||
    fullName.value === "" ||
    phone.value === "" ||
    password.value === "" ||
    !role.value
  ) {
    error.value = "Заполните все поля!";
    return;
  }

  const item = {
    username: username.value,
    fullName: fullName.value,
    phone: phone.value,
    password: password.value,
    extra: "",
    roles: [role.value?.value]
  };

  let ans = null
  try {
    ans = await register({ item, serviceName: 'users' })
  } catch (err) {
    error.value = 'Такой пользователь уже существует!'
    return
  }

  if (ans) {
    router.push({ name: 'Login' })
  } else {
    error.value = 'Ошибка при регистрации!'
  }
};
</script>
