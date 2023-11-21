<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="title">
    <h2 class="section-title">
      <!-- <Icon icon="mdi:about" width="34" height="34" class="text-rblue" /> -->
      {{ title }} -   {{ $t('sections.about') }}  
    </h2>
  </div>
  <div v-html="about" class="about aboutPageReset line-clamp"></div>
  <router-link to="/hakkimizda" class="btn btn-primary">{{ $t('buttons.readMore') }}  </router-link>
  
</template>

<script setup>
import { useThemeStore } from '../../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'

const store = useThemeStore()
const { data } = storeToRefs(store)

const title = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return ''
  }
})

const about = computed(() => {
  if (data.value) {
    return data.value.about_text
  } else {
    return ''
  }
})
</script>

<style>
.about * {
  max-width: 100% !important;
}

.line-clamp * {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 11;
}
</style>
