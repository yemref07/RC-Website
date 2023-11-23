<template>
  <div class="container-fluid nav-menu">
    <div class="d-flex md-justify-content-center align-items-center my-3">
      <div class="flex-item">
        <router-link to="/" :title="profileInfos.title">
          <img :src="companyLogo" :alt="profileInfos.title" style="width: 200px;height: auto;"  v-if="companyLogo"/>
          <img src="/images/randevucenter.svg" :alt="profileInfos.title" style="width: 200px;height: auto;" v-else/>
        </router-link>
      </div>
      <div class="flex-item d-block d-md-none">
        <Icon
          icon="material-symbols-light:menu"
          width="50"
          height="50"
          color="black"
          @click="toggleMenu"
        />
      </div>
    </div>

    <div class="d-flex justify-content-center align-items-center">
      <div class="flex-item d-none d-md-block">
        <ul class="d-flex justify-content-between align-items-center">
          <li class="menu-item">
            <router-link to="/" :title="$t('menu.home')">{{ $t('menu.home') }} </router-link>
          </li>

          <li class="menu-item">
            <router-link to="/hakkimizda" :title="$t('menu.aboutUs')">
              {{ $t('menu.aboutUs') }}</router-link
            >
          </li>

          <li class="menu-item">
            <router-link to="/blog" :title="$t('menu.blog')">{{
              $t('menu.blog')
            }}</router-link>
          </li>

          <li class="menu-item">
            <router-link to="/foto-galeri" :title="$t('menu.workHours')">{{
              $t('menu.photoGallery')
            }}</router-link>
          </li>

          <li class="menu-item">
            <router-link to="/musteri-yorumlari" :title="$t('menu.customerReview')">{{
              $t('menu.customerReview')
            }}</router-link>
          </li>

          <li class="menu-item">
            <router-link to="/iletisim" :title="$t('menu.contact')">{{
              $t('menu.contact')
            }}</router-link>
          </li>

          <li class="menu-item btn-lang">
            <el-dropdown>
              <div
                class="d-flex justify-content-center align-items-center text-uppercase el-dropdown-link"
              >
                <img :src="flagImages[locale]" alt="" style="width: 25px" class="ms-3" />
                <span class="ms-2 fs-6"> {{ locale }}</span>
              </div>
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item
                    v-for="(item, index) in avaibleLang"
                    :key="index"
                    class="p-3"
                    @click="changeLang(item.value)"
                  >
                    <img :src="flagImages[item.value]" alt="" width="25" />
                    <span class="fs-6 text-uppercase ms-2">{{ item.value }}</span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </li>
        </ul>
      </div>
    </div>

    <div class="mobile-menu" :class="[isVisible ? 'd-mobile-show' : 'd-mobile-none']">
      <div class="d-flex justify-content-between">
        <div class="flex-item">
          <div class="mobile-logo">
            <span class="mobile-menu-title"></span>
            <router-link to="/">
              <img src="/images/randevucenter.svg" alt="Randevu Center Logo" style="width: 200px" />
            </router-link>
          </div>
        </div>
        <div class="flex-item mobile-menu-close" @click="toggleMenu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="currentColor"
            class="bi bi-x-lg text-dark"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
            />
          </svg>
        </div>
      </div>

      <div class="d-flex flex-column mobile-nav-items">
        <div class="menu-item">
          <router-link to="/" title="Anasayfa">{{ $t('menu.home') }}</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/hakkimizda" title="Hakkımızda"> {{ $t('menu.aboutUs') }} </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/calisma-saatleri" title="Çalışma Saatleri">{{
            $t('menu.workHours')
          }}</router-link>
        </div>
        <div class="menu-item">
          <router-link to="/musteri-yorumlari" title="Müşteri Yorumları">
            {{ $t('menu.customerReview') }}
          </router-link>
        </div>
        <div class="menu-item">
          <router-link to="/iletisim" title="İletişim"> {{ $t('menu.contact') }}</router-link>
        </div>
      </div>

      <div class="menu-item">
        <el-dropdown>
          <div
            class="d-flex justify-content-start align-items-center text-uppercase el-dropdown-link"
          >
            <img :src="flagImages[locale]" alt="Bayrak" style="width: 35px" class="" />
            <span class="ms-2 fs-6"> {{ locale }}</span>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item
                v-for="(item, index) in avaibleLang"
                :key="index"
                class="p-3"
                @click="changeLang(item.value)"
              >
                <img :src="flagImages[item.value]" alt="" width="25" />
                <span class="fs-6 text-uppercase ms-2">{{ item.value }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>

      <div class="d-flex flex-row mt-5 justify-content-start align-items-center">
        <a :href="profileInfos.facebook" target="_blank" :title="profileInfos.facebook">
          <Icon icon="ri:facebook-fill" width="28" height="28" class="social-icon" />
        </a>
        <a :href="profileInfos.instagram" target="_blank" :title="profileInfos.instagram">
          <Icon icon="bi:instagram" width="28" height="28" class="social-icon"
        /></a>
        <a :href="profileInfos.twitter" target="_blank" :title="profileInfos.twitter">
          <Icon icon="pajamas:twitter" width="28" height="28" class="social-icon" />
        </a>
        <a :href="profileInfos.linkedin" target="_blank" :title="profileInfos.linkedin">
          <Icon icon="ri:linkedin-fill" width="28" height="28" class="social-icon" />
        </a>
        <a :href="profileInfos.youtube" target="_blank" :title="profileInfos.youtube">
          <Icon icon="iconoir:youtube" width="28" height="28" color="red" class="social-icon" />
        </a>

        <a :href="profileInfos.website" :title="profileInfos.website">
          <Icon icon="tabler:world-www" width="28" height="28" color="black" class="social-icon" />
        </a>
      </div>

      <div
        class="btn btn-primary btn-contact d-block mt-5"
        @click="toggleFastAppModal"
        v-if="!appointmentType"
      >
        <Icon icon="teenyicons:appointments-outline" width="20" height="20" color="" class="me-1" />
        {{ $t('buttons.getApp') }}
      </div>

      <router-link to="/randevu-al" class="btn btn-primary btn-contact d-block mt-5" title="randevu al" v-else>
        <Icon icon="teenyicons:appointments-outline" width="20" height="20" color="" class="me-1" />
        {{ $t('buttons.getApp') }}
      </router-link>

      <div
        class="row align-items-center justify-content-center mobile-footer"
        :class="[isVisible ? 'd-mobile-show' : 'd-mobile-none']"
      >
        <div class="col-sm-12">
          <div class="text-center">
            <span class="fs-6">
              <a
                href="https://goviva.com.tr/index.html"
                target="_blank"
                class="text-dark footer-link"
                title="Goviva Yazılım"
              >
                Randevu Center
                <Icon icon="mdi:heart" width="28" height="28" color="red" class="align-middle" />
                Goviva
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
    <fastAppointment />
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, watch, computed,onMounted} from 'vue'
import { useRoute } from 'vue-router'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { useAppointmentStore } from '../../stores/appointment'

import { filename } from 'pathe/utils'
const imageModules = import.meta.glob('../../assets/images/lang-flag/*.svg',{ eager: true })

const flagImages = Object.fromEntries(
  Object.entries(imageModules).map(([key, value])=>[filename(key),value.default])
)


const appStore = useAppointmentStore()
const { toggleFastAppModal } = appStore

const store = useThemeStore()
const isVisible = ref(false)
const route = useRoute()
const { data } = storeToRefs(store)

import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const avaibleLang = ref([
  { value: 'tr', name: 'Türkçe', tr: '/lang-flag/tr.svg' },
  { value: 'en', name: 'English', en: '/lang-flag/en.svg' },
  { value: 'ru', name: 'Russian', ru: '/lang-flag/ru.svg' },
  { value: 'ar', name: 'Arabic', ar: '/lang-flag/ar.svg ' },
  { value: 'az', name: 'Azerbejian', az: '/lang-flag/az.svg' }
])


const changeLang = (lang) => {
  locale.value = lang
}


const appointmentType = computed(() => {
  if (data.value) {
    return data.value.appointment_type
  } else {
    return false
  }
})

const profileInfos = computed(() => {
  if (data.value) {
    return {
      phone: data.value.phone,
      wp: data.value.whatsapp,
      email: data.value.email,
      address: data.value.address,
      title: data.value.title,
      instagram: data.value.instagram,
      facebook: data.value.facebook,
      linkedin: data.value.linkedin,
      twitter: data.value.twitter,
      website: data.value.website,
      startWork: data.value.startwork,
      finishWork: data.value.finishWork,
      appTime: data.value.appointment_time,
      whatsApp: data.value.whatsapp,
      logo: data.value.logo,
      province: data.value.province,
      district: data.value.district,
      companyTitle: data.value.companyTitle
    }
  } else {
    return {}
  }
})

const companyLogo = computed(()=>{
  if(data.value){
    return data.value.logo
  }
  else{
    return ''
  }
})

const toggleMenu = () => {
  isVisible.value = !isVisible.value
}

const closeMenu = () => {
  isVisible.value = false
}

watch(route, () => {
  closeMenu()
})


onMounted(() => {
  let browserLang = window.navigator.language.split('-')[0]
  locale.value = browserLang
})

</script>

<style scoped>
ul li {
  list-style: none;
}

.menu-item {
  margin-right: 2rem;
  font-size: 18px;
  font-weight: 400;
}

.menu-item a {
  color: black;
  text-decoration: none;
}

.nav-menu {
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  padding: 10px 40px;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: auto;
  z-index: 105;
  -webkit-transition: all 300ms ease;
  transition: all 300ms ease;
}

.md-justify-content-center {
  justify-content: center;
}

@media only screen and (max-width: 768px) {
  .nav-menu {
    padding: 1px 20px;
  }

  .md-justify-content-center {
    justify-content: space-between;
  }
}

.top-header {
  background-color: #000000;
  font-family: rubik, serif;
}

a {
  text-decoration: none;
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
  background: white;
  padding: 30px 40px 70px 40px;
  z-index: 1050;
  display: block;
  height: 100%;
  position: fixed;
  font-size: 18px;
  top: 0;
  width: 100%;
  max-width: 520px;
  overflow-y: auto;
}

.mobile-menu .menu-item a {
  color: black;
}
.mobile-menu .menu-item {
  margin-bottom: 12px;
}

.close-btn {
  overflow: visible;
}

.mobile-menu-close {
  overflow: hidden;
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

.social-icon {
  margin-right: 24px;
  color: #031b4ebe !important;
}

.mobile-nav-items {
  margin-top: 5rem;
}

ul li {
  list-style: none;
}
a {
  text-decoration: none;
}
ul {
  padding: 0;
}

.mobile-footer {
  position: absolute;
  top: 95%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.cursor-pointer {
  cursor: pointer;
}

.btn-lang .el-dropdown-link:focus-visible {
  outline: 0px !important;
}
</style>
