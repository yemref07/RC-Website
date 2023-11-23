<template>
    <component :is="dynamicEmployeeView" />
</template>

<script setup>
import {computed, defineAsyncComponent} from 'vue'
import { useThemeStore } from '../stores/themeInfo';
import { storeToRefs } from 'pinia';


const themeStore = useThemeStore()
const {theme} = storeToRefs(themeStore)

const dynamicEmployeeView = computed(()=>{
    if(theme.value){
        return defineAsyncComponent(()=>import(`../components/${theme.value}/EmployeeView.vue`))
    }
    else{
        return defineAsyncComponent(()=>import(`../components/default/EmployeeView.vue`))
    }
})

</script>

<style lang="scss" scoped>

</style>