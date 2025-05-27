<template>
  <footer class="footer-container">
    <div class="footer-content">
      <!-- Logo + Название -->
      <div class="footer-brand">
        <div class="logo" style="margin-right: 30px">arenda-com</div>
      </div>

      <!-- Ссылки -->
      <div class="footer-links">
        <h3>Навигация</h3>
        <ul>
          <li><RouterLink to="/">Главная</RouterLink></li>
          <li><RouterLink to="/catalog">Каталог</RouterLink></li>
          <li><RouterLink to="/favorites">Избранное</RouterLink></li>
          <li><RouterLink to="/profile">Профиль</RouterLink></li>
        </ul>
      </div>

      <!-- Контакты -->
      <div class="footer-contacts">
        <h3>Контакты</h3>
        <p>Тел: +7 (700) 123-45-67</p>
        <p>Email: support@arendacom.kz</p>
        <p>г. Алматы, ул. Достык 100</p>
      </div>
    </div>

    <div class="footer-bottom">
      © {{ new Date().getFullYear() }} arenda-com.kz Все права защищены.
    </div>
  </footer>
</template>

<script setup></script>
