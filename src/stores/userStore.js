import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const isAuth = ref(false);
  const token = ref("");
  const user = ref({});

  return { isAuth, token, user };
});
