<script setup>
import { RouterLink, RouterView } from "vue-router";
import Header from "./components/Header.vue";
import { onMounted } from "vue";
import { updatePrimaryPalette } from "@primevue/themes";
import AppEventBus from "./app/AppEventBus";
import Footer from "./components/Footer.vue";
import { useQuery } from "./composables/useQuery";
import { useUserStore } from "./stores/userStore";
import { storeToRefs } from "pinia";

const store = useUserStore()
const { user, isAuth } = storeToRefs(store)
const { getMe } = useQuery()

onMounted(async () => {
  const color = {
    name: "sunny", // можешь назвать как хочешь
    palette: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b", // основной (primary)
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
      950: "#451a03",
    },
  };

  updatePrimaryPalette(color.palette);
  AppEventBus.emit("theme-palette-change");

  if (isAuth.value) {
    await getMe()
  }
});
</script>

<template>
  <Header />
  
  <div class="main">
    <RouterView />
  </div>

  <Footer />
</template>
