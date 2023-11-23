<template>
  <component :is="dynamicVideoGallery" />
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent } from 'vue'
import { useThemeStore } from '../stores/themeInfo'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const dynamicVideoGallery = computed(() => {
  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/VideoGalleryView.vue`))
  } else {
    return defineAsyncComponent(() => import(`../components/default/VideoGalleryView.vue`))
  }
})
</script>

<style lang="css" scoped></style>
