<template>
  <component :is="dynamicBlog" />
</template>

<script setup>
import { useThemeStore } from '../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed, defineAsyncComponent } from 'vue'

const store = useThemeStore()
const { theme } = storeToRefs(store)

const dynamicBlog = computed(() => {
  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/BlogView.vue`))
  } else {
    return defineAsyncComponent(() => import(`../components/default/BlogView.vue`))
  }
})
</script>

<style lang="scss" scoped></style>
