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
import { useHead , useSeoMeta} from '@unhead/vue'

const route = useRoute()
const themeStore = useThemeStore()
const { theme, title } = storeToRefs(themeStore)
const { fetchData } = themeStore
const is404 = ref('')

const pageTitle = computed(() => {
  if (title.value) {
    return title.value
  } 
  else {
    return 'Default Page Title'
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
    },

    {
      rel: 'canonical',
      href: window.location.href
    },

    {
      property: 'og:url',
      content: window.location.href
    },

    {
      rel: 'alternate',
      href: window.location.href
    },

    
    {
      property:"og:type",
      content:"website"
    },

    {
      property:"og:image",
      content:"https://tema19.livedemo.com.tr/assets/seo/randevu-og.png"
    },

    {
      property:"og:image:width",
      content:"1200"
    },

    {
      property:"og:image:width",
      content:"630"
    },

    {
      name:"twitter:card",
      content:"summary"
    }



  ]
})

useSeoMeta({
  title: pageTitle
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
