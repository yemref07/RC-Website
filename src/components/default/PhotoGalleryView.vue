<template>
  <pageHeader :title="$t('menu.photoGallery')" :sub-title="title" />

  <div class="container">
    <div class="row">
      <div class="col-md-3 mb-3" v-for="url in imageSrc" :key="url"  >
        <el-image :src="url" @click="show" lazy class="gallery-image" />
      </div>
    </div>
  </div>
  <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide" />
</template>

<script setup>
import pageHeader from './components/pageHeader.vue'
import {  computed } from 'vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox'


const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const title = computed(() => {
  if (data.value?.title) {
    return data.value.title
  } else {
    return ""
  }
})

const galleryImages = computed(()=>{
  if(data.value?.galleries){
    return data.value.galleries
  }
  else{
    return []
  }
})


const imageSrc = computed(() => {
  return galleryImages.value.map((item) => `https://cdn.rapp.com.tr/${item.image}`)
})

const {
  //methods
  show,
  onHide,
  //changeIndex,
  // refs
  visibleRef,
  indexRef,
  imgsRef
} = useEasyLightbox({
  // src / src[]
  imgs: imageSrc,
  // initial index
  initIndex: 0
})  





</script>

<style lang="css" scoped>
.gallery-image{
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}
</style>
