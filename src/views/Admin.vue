<template>
  <DataTable :value="users" tableStyle="min-width: 50rem">
    <Column field="fullName" header="ФИО"></Column>
    <Column field="username" header="Имя пользователя"></Column>
    <Column field="phone" header="Номер телефона"></Column>
    <Column header="Роль">
        <template #body="{ data }">
            {{ data?.roles.map((role) => getRole(role.name)).join(", ") }}
        </template>        
    </Column>
    <Column header="Управление">
        <template #body="{ data }">
            <Button severity="danger" label="Удалить" @click="removeUser(data)"/>
        </template>        
    </Column>
  </DataTable>
</template>
<script setup>
import { useQuery } from "@/composables/useQuery";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { Button, Column, DataTable } from "primevue";
import { onMounted, ref } from "vue";

const store = useUserStore()
const { user } = storeToRefs(store)

const { getPaged, create, update, remove} = useQuery()

const users = ref([])

const getRole = (role) => {
  const roleName = {
    ROLE_ADMIN: "Админстратор",
    ROLE_BUYER: "Покупатель",
    ROLE_SELLER: "Продавец",
  };

  return roleName[role];
};

onMounted(async () => {
    await get()
})

const removeUser = async (data) => {
    let ans = null
    try {
        ans = await remove({ id: data?.id, serviceName: 'users' })
    } catch (error) {
        ans = {}
    }

    await get()
}

const get = async () => {
    users.value = await getPaged({ serviceName: 'users' })
    users.value = users.value.filter(user => !user?.roles?.find(role => role?.name === 'ROLE_ADMIN'))
}
</script>
