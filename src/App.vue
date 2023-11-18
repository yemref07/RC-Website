<template>
  <header>
    <component :is="dynamicHeader" v-if="is404" />
  </header>

  <main>
    <router-view />
  </main>

  <component :is="dynamicFooter" v-if="is404" />
</template>

<script setup>
import { defineAsyncComponent, computed, onMounted, watch, ref } from 'vue'
import { useThemeStore } from './stores/themeInfo'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'
import { useSeoMeta, useHead } from '@unhead/vue'

const route = useRoute()
const themeStore = useThemeStore()
const { theme, data } = storeToRefs(themeStore)
const { fetchData } = themeStore
const is404 = ref('')

const pageTitle = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return 'Randevu Center | Anasayfa'
  }
})

useHead({
  meta: [
    {
      name: 'description',
      content: pageTitle.value
    },
    {
      property: 'og:image:alt',
      content: pageTitle.value
    },
    {
      property: 'og:site_name',
      content: pageTitle.value
    },
    {
      property: 'og:title',
      content: pageTitle.value
    },
    {
      property: 'og:description',
      content: pageTitle.value
    },

    {
      name: 'application-name',
      content: pageTitle.value
    },

    {
      name: 'apple-mobile-web-app-title',
      content: pageTitle.value
    },

    {
      name: 'mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'apple-mobile-web-app-capable',
      content: 'yes'
    },
    {
      name: 'theme-color',
      content: '#0069ff'
    },
    {
      name: 'apple-mobile-web-app-status-bar-style',
      content: '#ffffff'
    },
    {
      name: 'msapplication-TileColor',
      content: '#ffffff'
    }
  ]
})

useSeoMeta({
  title: pageTitle,
  // ogTitle: () => `${data.value?.title} - My Site`,
  // description: () => data.value?.description,
  // ogDescription: () => data.value?.description,
  ogImage: '/placeholder.png',
  twitterCard: 'summary_large_image',
  description: 'My about page',
  ogDescription: 'Anaysafa hakkındaki açıklama',
  ogTitle: 'Anasayfa'
})

watch(
  () => route.name,
  (newRoute) => {
    if (newRoute === 'hataSayfasi') {
      is404.value = false
    } else {
      is404.value = true
    }
  }
)

const themeValue = computed(() => {
  if (theme.value) {
    return theme.value
  } else {
    return 'default'
  }
})

onMounted(async () => {
  await fetchData()
})

const dynamicHeader = computed(() =>
  defineAsyncComponent(() => import(`./components/${themeValue.value}/TheHeader.vue`))
)

const dynamicFooter = computed(() =>
  defineAsyncComponent(() => import(`./components/${themeValue.value}/TheFooter.vue`))
)
</script>

<style scoped></style>
