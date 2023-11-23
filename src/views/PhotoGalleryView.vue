<template>
  <component :is="dynamicMedia" />
</template>

<script setup>
import { useThemeStore } from '../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent } from 'vue'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)

const dynamicMedia = computed(() => {
  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/PhotoGalleryView.vue`))
  } else {
    return defineAsyncComponent(() => import(`../components/default/PhotoGalleryView.vue`))
  }
})
</script>

<style lang="css" scoped></style>
