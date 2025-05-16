<template>
  <Menubar :model="menuItems">
    <template #start>
      <div class="logo" style="margin-right: 30px;">
        arenda-com
      </div>
    </template>
    <template #item="{ item, props, hasSubmenu, root }">
      <a v-ripple class="link" v-bind="props.action">
        <RouterLink :to="item?.to" class="link">{{ item.label }}</RouterLink>
      </a>
    </template>
    <template #end>
      <div class="flex items-center gap-2">
        <SplitButton label="User Name" @click="save" :model="items" severity="secondary" />
      </div>
    </template>
  </Menubar>
</template>
<script setup>
import { Avatar, Badge, Menubar, SplitButton } from 'primevue';
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

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
        to: '/favorites'
    },
    {
        label: 'Контакты',
        icon: 'pi pi-search',
        to: '/contacts'
    },
]);

const items = [
    {
        label: 'Update',
        command: () => {
            toast.add({ severity: 'success', summary: 'Updated', detail: 'Data Updated', life: 3000 });
        }
    },
    {
        label: 'Delete',
        command: () => {
            toast.add({ severity: 'warn', summary: 'Delete', detail: 'Data Deleted', life: 3000 });
        }
    },
    {
        separator: true
    },
    {
        label: 'Quit',
        command: () => {
            window.location.href = 'https://vuejs.org/';
        }
    }
];
</script>
<style lang=""></style>
