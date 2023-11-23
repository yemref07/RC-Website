<template>
  <component :is="dynamicHome" />
</template>

<script setup>
import { computed, defineAsyncComponent } from 'vue'
import { useThemeStore } from '../stores/themeInfo'
import { storeToRefs } from 'pinia'


const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)



const dynamicHome = computed(() => {
  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/HomeView.vue`))
  } else {
    return defineAsyncComponent(() => import(`../components/default/HomeView.vue`))
  }
})
</script>

<style scoped></style>
