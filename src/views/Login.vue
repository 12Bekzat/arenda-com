<template>
  <div class="form">
    <div class="form__content">
      <div class="login">
        <div class="login__content">
          <div class="login__title">Войти</div>
          <div class="login__label">
            <label for="username">Имя пользователя</label>
            <InputText id="username" v-model="username" placeholder="Имя пользователя"/>
          </div>
          <div class="login__label">
            <label for="username">Пароль</label>
            <Password id="username" v-model="password" placeholder="Пароль" input-style="width: 100%;" style="width: 100%;" toggle-mask :feedback="false"/>
          </div>
          <RouterLink class="login__url" to="/register">Все еще нет аккаунта?</RouterLink>
          <Button label="Войти" @click="submitLogin"/>
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
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";

const router = useRouter();

const username = ref("");
const password = ref("");

const { login, getMe } = useQuery()
const store = useUserStore()
const { user, isAuth, token } = storeToRefs(store)

const error = ref("");

// Эмуляция входа (в реальности делай API-запрос)
const submitLogin = async () => {
    await login(username.value, password.value)
    if (isAuth.value || token.value) {
        await getMe() 
        router.push({ name: 'Home' })
    }
};
</script>
