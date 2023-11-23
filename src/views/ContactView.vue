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
     return defineAsyncComponent(() => import(`../components/default/ContactView.vue`))
   }
 })
 

 </script>
 
 <style lang="scss" scoped></style>
 