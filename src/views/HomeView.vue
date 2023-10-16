<template>
    <component :is="dynamicAbout" />
    {{ count}}
</template>

<script setup>
import {computed,defineAsyncComponent,onMounted} from 'vue'
import { useThemeStore } from '../stores/themeInfo';
import { storeToRefs } from 'pinia'

const themeStore = useThemeStore();

const {theme} = storeToRefs(themeStore);
const {fetchData} = themeStore;

console.log(theme,'thesmaaaeaaaaa')

const dynamicAbout = computed(() =>
  defineAsyncComponent(() => import(`../components/${theme.value}/about.vue`)) 
)

onMounted( async () => {
  await fetchData();  
})
</script>

<style  scoped>

</style>