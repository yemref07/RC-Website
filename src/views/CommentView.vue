<template>
  <component :is="dynamiComments" />
 </template>
 
 <script setup>
 import { useThemeStore } from '../stores/themeInfo'
 import { storeToRefs } from 'pinia'
 import { computed,defineAsyncComponent } from 'vue'
 
 const store = useThemeStore()
 const { theme } = storeToRefs(store)

 const dynamiComments = computed(() => {
   if (theme.value) {
     return defineAsyncComponent(() => import(`../components/${theme.value}/CustomerCommentsView.vue`))
   } 
   else {
     return null
   }
 })
 

 </script>
 
 <style scoped>

</style>
 