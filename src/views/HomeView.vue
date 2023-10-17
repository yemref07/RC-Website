<template>
  <div class="sidebar-page container bg-alice">
    <div class="auto-container">
      <div class="row">
        <component :is="dynamicAbout" />
        <component :is="dynamicRighSidebar" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, onMounted, watch, ref } from 'vue'
import { useThemeStore } from '../stores/themeInfo'
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore()

const { theme } = storeToRefs(themeStore)
const { fetchData } = themeStore
const dynamicAbout = ref(null);
const dynamicRighSidebar = ref(null)
console.log(theme, 'thesmaaaeaaaaa')



watch(
  theme,
  (newValue, oldValue) => {
    if (newValue) {
      console.log(newValue, 'newVasslue')
      dynamicAbout.value = defineAsyncComponent(() => import(`../components/${newValue}/about.vue`))
      dynamicRighSidebar.value = defineAsyncComponent(() => import(`../components/${newValue}/rightSidebar.vue`))
    }
  },
  { deep: true }
)

// const dynamicAbout = defineAsyncComponent(() => import(`../components/${theme.value}/about.vue`))

// const dynamicRighSidebar = defineAsyncComponent(() =>import(`../components/${theme.value}/rightSidebar.vue`))

onMounted(async () => {
  await fetchData();


})

</script>

<style scoped></style>
