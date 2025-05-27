import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useUserStore = defineStore("userStore", () => {
  const isAuth = ref(false);
  const token = ref("");
  const user = ref({});
  const currentHome = ref(null);
  const messanger = ref({});

  return { isAuth, token, user, currentHome, messanger };
}, {
  persist: true
});
