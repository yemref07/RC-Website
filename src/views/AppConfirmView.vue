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
       return defineAsyncComponent(() => import(`../components/default/AppConfirmView.vue`))
     }
   })
   

   </script>
   
   <style lang="scss" scoped></style>
   