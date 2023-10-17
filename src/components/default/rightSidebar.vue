<template>
  <div class="sidebar-side col-lg-5 col-md-12 col-sm-12">
    <div class="verified-company">
      <img width="21" src="/images/check_icon.svg" alt="" /> Doğrulanmış Profil
    </div>

    <aside class="sidebar">
      <profileInfo :info="info" />
      <services />
      <mapSection :lat="maplat" :lng="maplng" />
    </aside>
  </div>
</template>

<script setup>
import profileInfo from './profileInfo.vue'
import services from './services.vue'
import mapSection from './mapSection.vue'

import { ref, watch } from 'vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'

const store = useThemeStore()
const { data } = storeToRefs(store)
const maplng = ref('')
const maplat = ref('')
const info = ref({
  title: '',
  email: '',
  address: '',
  instagram: '',
  facebook: '',
  linkedin: '',
  twitter: '',
  website: '',
  startWork: '',
  finishWork: '',
  appTime: '',
  whatsApp: '',
  logo: '',
  phone: '',
  province: '',
  district: '',
  companyTitle: ''
})

watch(
  data,
  (newValue, oldValue) => {
    if (newValue) {
      maplng.value = newValue.map_lng
      maplat.value = newValue.map_lat

      const t = info.value
      t.title = newValue.title
      t.email = newValue.email
      t.address = newValue.address
      t.instagram = newValue.instagram
      t.facebook = newValue.facebook
      t.linkedin = newValue.linkedin
      t.twitter = newValue.twitter
      t.website = newValue.website
      t.startWork = newValue.startwork
      t.finishWork = newValue.finishWork
      t.appTime = newValue.appointment_time
      t.whatsApp = newValue.whatsapp
      t.logo = newValue.logo
      t.phone = newValue.phone
      t.province = newValue.province
      t.district = newValue.district
      t.companyTitle = newValue.companyTitle
    }
  },
  { deep: true }
)
</script>

<style lang="scss" scoped></style>
