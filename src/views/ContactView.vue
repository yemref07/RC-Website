<template>
  <component :is="dynamicContact" />
 </template>
 
 <script setup>
 import { useThemeStore } from '../stores/themeInfo'
 import { storeToRefs } from 'pinia'
 import { computed,defineAsyncComponent } from 'vue'
 
 const store = useThemeStore()
 const { theme } = storeToRefs(store)
 
 const dynamicContact = computed(() => {
   if (theme.value) {
     return defineAsyncComponent(() => import(`../components/${theme.value}/ContactView.vue`))
   } else {
     return 'default'
   }
 })
 

 </script>
 
 <style lang="scss" scoped></style>
 