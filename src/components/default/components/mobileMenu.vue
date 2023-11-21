<template>
  <div class="mobile-menu" :class="[isVisible ? 'd-mobile-show' : 'd-mobile-none']">
    <div class="d-flex justify-content-between">
      <div class="flex-item">
        <div class="mobile-logo">
          <span class="mobile-menu-title">Yunus Emre</span>
        </div>
      </div>
      <div class="flex-item mobile-menu-close" @click="toggleMenu">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="currentColor"
          class="bi bi-x-lg text-light"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
          />
        </svg>
      </div>
    </div>

    <div class="d-flex flex-column mt-4">
      <div class="menu-item">
        <router-link to="/" title="Home Page">Home</router-link>
      </div>
      <div class="menu-item">
        <router-link to="/hakkimda" title="Randevu Center Hakkında"> About </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/projelerim" title="Randevu Center Çalışmaları"> My Works </router-link>
      </div>
      <div class="menu-item">
        <router-link to="/iletisim" title="Randevu Center İletişim"> Contact </router-link>
      </div>
    </div>

    <div class="d-flex just align-items">
      <div class="social-item">
        <a href="/" target="_blank" title="Randevu Center Twitter">
          <img src="/social-icons/twitter.svg" alt="Randevu Center Twitter" />
        </a>
      </div>
      <div class="social-item">
        <a href="https://wa.me/5344997652" target="_blank" title="Randevu Center WhatsApp">
          <img src="/social-icons/whatsapp.svg" alt="Randevu Center WhatsApp" />
        </a>
      </div>
      <div class="social-item">
        <a
          href="https://www.linkedin.com/in/yunus-emre-fersiz-91499b178/"
          target="_blank"
          title="Randevu Center Linkedin"
        >
          <img src="/social-icons/linkedin.svg" alt="Randevu Center Linkedin" />
        </a>
      </div>
      <div class="social-item">
        <a href="https://github.com/yemref07" target="_blank" title="Randevu Center Github">
          <img src="/social-icons/github.svg" alt="Randevu Center Github Profil" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

const isVisible = ref(false)
const route = useRoute()

const toggleMenu = () => {
  isVisible.value = !isVisible.value
}

const closeMenu = () => {
  isVisible.value = false
}

watch(route, () => {
  closeMenu()
})
</script>

<style lang="css" scoped>
.top-header {
  background-color: #000000;
  font-family: rubik, serif;
}

a {
  text-decoration: none;
}

.nav-link {
  color: black;
  margin-right: 20px;
  font-size: 22px;
  font-weight: 500;
  padding: 0.5rem;
  font-family: "Edo SZ TR","Poppins";
  cursor: url(/cursor.svg), url(/cursor.png), auto !important;
}

.nav-link:hover {
  color: var(--yorange);
}

ul li {
  list-style: none !important;
}

.d-mobile-show {
  right: 0px;
  transition: right 0.4s ease-in-out 0s;
  -webkit-transition: right 0.4s ease-in-out 0s;
  -moz-transition: right 0.4s ease-in-out 0s;
  -o-transition: right 0.4s ease-in-out 0s;
}

.d-mobile-none {
  right: -520px;
  transition: right 0.4s ease-in-out 0s;
  -webkit-transition: right 0.4s ease-in-out 0s;
  -moz-transition: right 0.4s ease-in-out 0s;
  -o-transition: right 0.4s ease-in-out 0s;
}

.mobile-menu {
  background: #000000;
  padding: 80px 40px 70px 60px;
  z-index: 1050;
  display: block;
  height: 100%;
  overflow: auto;
  position: fixed;
  font-size: 18px;
  top: 0;
  width: 100%;
  max-width: 520px;
  position: fixed;
  overflow-y: auto;
}

.menu-item {
  padding: 10px 10px;
  font-weight: bold;
}

.menu-item a {
  color: white;
  text-decoration: none;
  font-family: "Edo SZ TR";
}

.mobile-menu-title {
  font-size: 24px;
  font-family: "Edo SZ TR";
  color: white;
}

.close-btn {
  overflow: visible;
}

.mobile-menu-close {
  overflow: hidden;
}

.social-item {
  margin-right: 10px;
  margin-top: 40px;
}

.main-menu {
  padding-left: 75px;
  padding-right: 75px;
}

.header-logo {
  width: 300px;
}

@media only screen and (max-width: 1200px) {
  .main-menu {
    padding-left: 50px;
    padding-right: 50px;
  }
}

@media only screen and (max-width: 992px) {
  .main-menu {
    padding-left: 30px;
    padding-right: 30px;
  }

  .nav-link {
    margin-right: 10px;
    font-size: 16px;
  }

  .header-logo {
    width: 250px;
  }
}

@media only screen and (max-width: 768px) {
  .main-menu {
    padding-left: 10px;
    padding-right: 10px;
    padding: 20px;
  }

  .header-logo {
    width: 200px;
  }

  .top-header {
    display: none;
  }
}
</style>
