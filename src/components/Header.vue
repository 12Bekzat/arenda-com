<template>
  <Menubar :model="menuItems">
    <template #start>
      <div class="logo" style="margin-right: 30px;">
        arenda-com
      </div>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="link" v-bind="props.action" v-if="item?.meta?.requireAuth ? isAuth : true && item?.meta?.isAdmin === true ? isCan() : true">
        <RouterLink :to="item?.to" class="link">{{ item.label }}</RouterLink>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <SplitButton v-if="isAuth" :label="user?.fullName || 'Not Found'" @click="save" :model="items" severity="secondary" />
        <Button v-else label="Войти" @click="$router.push({ name: 'Login' })" severity="secondary" />
      </div>
    </template>
  </Menubar>
</template>
<script setup>
import { useUserStore } from '@/stores/userStore';
import { storeToRefs } from 'pinia';
import { Avatar, Badge, Button, Menubar, SplitButton } from 'primevue';
import { ref } from 'vue';
import { RouterLink, useRouter } from 'vue-router';

const store = useUserStore()
const { isAuth, user, token } = storeToRefs(store)

const isCan = (roleNames = ["ROLE_ADMIN"]) => {
  console.log('chech role');
  
  return user.value?.roles?.find((role) => roleNames.includes(role?.name));
};

const menuItems = ref([
    {
        label: 'Главная',
        icon: 'pi pi-home',
        to: '/',
    },
    {
        label: 'Каталог',
        icon: 'pi pi-search',
        to: '/catalog'
    },
    {
        label: 'Избранное',
        icon: 'pi pi-search',
        to: '/favorites',
        meta: { requireAuth: true }
    },
    {
        label: 'Сообщения',
        icon: 'pi pi-search',
        to: '/messages',
        meta: { requireAuth: true }
    },
    {
        label: 'Панель управления',
        icon: 'pi pi-search',
        to: '/admin',
        meta: { isAdmin: true }
    },
]);

const router = useRouter()

const items = [
    {
        label: 'Профиль',
        command: () => {
            router.push({ name: 'Profile' })
        }
    },
    {
        separator: true
    },
    {
        label: 'Выйти',
        command: () => {
            isAuth.value = false
            user.value = {}
            token.value = {}
            localStorage.removeItem('jwt_token')
        }
    }
];
</script>
<style lang=""></style>
