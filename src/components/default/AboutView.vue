<template>
  <pageHeader :title="$t('aboutUs.title')" :subTitle="companyName" />

  <div class="container aboutPageReset">
    <div class="row justify-content-center align-items-center">
      <div class="col-12">
        <div class="" v-html="aboutText"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import pageHeader from './components/pageHeader.vue'
import {useI18n} from 'vue-i18n'

const {t:$t} = useI18n()

const store = useThemeStore()
const { data } = storeToRefs(store)

const companyName = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return 'İşletme İsmi Belirtilmemiş'
  }
})

const aboutText = computed(() => {
  if (data.value.about_text) {
    return data.value.about_text
  } 
  else {
    return $t('aboutUs.fallback')
  }
})


</script>

<style>
.aboutPageReset * {
  width: 100% !important;
  font-family: 'Poppins' !important;
}
</style>
