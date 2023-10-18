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

console.log(theme, 'thesmaaaeaaaaaaa')



onMounted(async() => {
  await fetchData();
})

// const dynamicAbout = computed(()=>{
//  return defineAsyncComponent(() => import(`../components/${selectedTheme.value}/about.vue`))
// })

// const dynamicRighSidebar =computed(()=>{
//   return  defineAsyncComponent(() =>import(`../components/${selectedTheme.value}/rightSidebar.vue`))
// })

const dynamicRighSidebar= computed(() => {

  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/rightSidebar.vue`));
  } else {
    return null;
  }
});

const dynamicAbout= computed(() => {

  if (theme.value) {
    return defineAsyncComponent(() => import(`../components/${theme.value}/about.vue`));
  } else {
    return null;
  }
});

</script>

<style scoped></style>
