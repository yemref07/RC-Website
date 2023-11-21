<template>
    <component :is="dynamicAppConfirm" />
   </template>
   
   <script setup>
   import { useThemeStore } from '../stores/themeInfo'
   import { storeToRefs } from 'pinia'
   import { computed,defineAsyncComponent } from 'vue'
   
   const store = useThemeStore()
   const { theme } = storeToRefs(store)

   
   const dynamicAppConfirm = computed(() => {
     if (theme.value) {
       return defineAsyncComponent(() => import(`../components/${theme.value}/AppConfirmView.vue`))
     } else {
       return null
     }
   })
   

   </script>
   
   <style lang="scss" scoped></style>
   