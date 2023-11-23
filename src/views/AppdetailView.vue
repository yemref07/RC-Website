<template>
    <component :is="dynamicAppDetail" />
   </template>
   
   <script setup>
   import { useThemeStore } from '../stores/themeInfo'
   import { storeToRefs } from 'pinia'
   import { computed,defineAsyncComponent } from 'vue'
   
   const store = useThemeStore()
   const { theme } = storeToRefs(store)
   
   const dynamicAppDetail = computed(() => {
     if (theme.value) {
       return defineAsyncComponent(() => import(`../components/${theme.value}/AppDetailView.vue`))
     } else {
       return defineAsyncComponent(() => import(`../components/default/AppDetailView.vue`))
     }
   })
   
   </script>
   
   <style lang="scss" scoped></style>
   