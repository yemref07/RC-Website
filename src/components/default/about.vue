<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div v-html="aboutText"></div>
</template>

<script setup>
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { ref,watch } from 'vue'

const store = useThemeStore()
const { data } = storeToRefs(store)
const aboutText = ref(null)

//wacth to data when its not undefined get the about_text part
// eslint-disable-next-line no-unused-vars
watch(data,(newValue,oldValue)=>{
if(newValue){
    aboutText.value = newValue.about_text
}
},{deep:true})
</script>

<style lang="scss" scoped></style>
