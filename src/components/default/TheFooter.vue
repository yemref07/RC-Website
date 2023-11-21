<template>
  <quickLinks :phone="profileInfos.phone" :wp="profileInfos.wp" />

  <div class="bottom-menu d-block d-md-none">
    <div class="d-flex flex-row justify-content-between align-items-center px-3 py-2">
      <div class="flex-item">

        <div class="" @click="toggleFastAppModal" v-if="!appType">
          <img src="/bot-menu-icons/calendar.svg" alt="" width="26" height="26" />
          <p>{{ $t('botMenu.getApp') }}</p>
        </div>

        <router-link to="/randevu-al" v-else>
          <img src="/bot-menu-icons/calendar.svg" alt="" width="26" height="26" />
          <p>{{ $t('botMenu.getApp') }}</p>
        </router-link>

      </div>
      <div class="flex-item">
        <a :href="`https://wa.me/${profileInfos.wp}`">
          <img src="/bot-menu-icons/whatsapp.svg" alt="" width="26" height="26" />
          <p>{{ $t('botMenu.wp') }}</p>
        </a>
      </div>
      <div class="flex-item">
        <a :href="`tel:${profileInfos.phone}`">
          <img src="/bot-menu-icons/phone.svg" alt="" width="26" height="26" />
          <p>{{ $t('botMenu.callNow') }}</p>
        </a>
      </div>
      <div class="flex-item">
        <router-link to="/iletisim">
          <img src="/bot-menu-icons/contact.svg" alt="" width="26" height="26" />
          <p>{{ $t('botMenu.contact') }}</p>
        </router-link>
      </div>
    </div>
  </div>

  <div class="container-fluid px-5 py-3 mt-5 pb-sm-80">
    <div class="row align-items-center justify-content-center">
      <div class="col-sm-12">
        <div class="text-center">
          <span class="fs-6">
            <a
              href="https://goviva.com.tr/"
              target="_blank"
              class="text-dark footer-link"
              title="Goviva Yazılım"
            >
              Randevu Center
              <Icon icon="mdi:heart" width="30" height="30" color="red" class="align-middle" />
              Goviva
            </a>
          </span>
        </div>
      </div>
      <!-- End row -->
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import { useAppointmentStore } from '../../stores/appointment'

const appStore = useAppointmentStore()
const { toggleFastAppModal } = appStore

const store = useThemeStore()
const { data } = storeToRefs(store)

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

const appType = computed(() => {
  if (data.value) {
    return data.value.appointment_type
  } else {
    return 0
  }
})
</script>

<style scoped>
a {
  text-decoration: none;
}
.footer-link {
  font-weight: 500;
}

.bottom-menu {
  box-shadow: rgba(100, 100, 111, 0.3) 0px 7px 29px 0px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: white;
  z-index: 98;
}

.bottom-menu a {
  color: black;
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
}
.bottom-menu p {
  margin-bottom: 0 !important;
  text-align: center;
  font-size: 12px;
}

.flex-item {
  text-align: center;
}

@media only screen and (max-width: 768px) {
  .pb-sm-80 {
    padding-bottom: 80px !important;
  }
}
</style>
