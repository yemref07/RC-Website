<template>
  <h2 class="bg-white p-2 mt-5 section-title">
    <Icon
      icon="tabler:photo-filled"
      width="34"
      height="34"
      color=""
      class="social-icon text-rblue"
    />
    {{ title }} - {{ $t('sections.serviceGallery') }}
  </h2>

  <vue-easy-lightbox :visible="visibleRef" :imgs="imgsRef" :index="indexRef" @hide="onHide" />

  <div class="card-content">
    <swiper-container
      style="--swiper-navigation-color: #fff; --swiper-pagination-color: #fff"
      class="mySwiper"
      thumbs-swiper=".mySwiper2"
      space-between="10"
      navigation="true"
      v-if="galleryImages.length > 0"
    >
      <swiper-slide v-for="(item, index) in galleryImages" :key="index">
        <el-image
          :key="`${item.image}`"
          style="height:auto;width:100%;"
          :src="`https://cdn.rapp.com.tr/${item.image}`"
          @click="show"
          lazy
        />
      </swiper-slide>
    </swiper-container>

    <swiper-container
      v-if="galleryImages.length > 0"
      class="mySwiper2"
      space-between="10"
      slides-per-view="4"
      free-mode="true"
      watch-slides-progress="true"
    >
      <swiper-slide v-for="(item, index) in galleryImages" :key="index">
        <el-image
          :src="`https://cdn.rapp.com.tr/${item.image}`"
          class="thumb-image"
          style="height:auto;width:100%;"
          lazy
        ></el-image>
      </swiper-slide>
    </swiper-container>

    <div v-else>
      {{ $t('serviceGallery.noImage') }}
    </div>
  </div>
</template>

<script setup>
import { register } from 'swiper/element/bundle'
import { computed } from 'vue'
import { Icon } from '@iconify/vue'
import VueEasyLightbox, { useEasyLightbox } from 'vue-easy-lightbox'
register()

const props = defineProps({
  galleryImages: Array,
  title: String
})

const imageSrc = computed(() => {
  return props.galleryImages.map((item) => `https://cdn.rapp.com.tr/${item.image}`)
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

<style scoped>
.card-content {
  transition:
    box-shadow 0.25s linear,
    -webkit-box-shadow 0.25s linear;
  box-shadow: 0 10px 20px rgba(1, 14, 40, 0.1);
  background-color: #fff;
  padding: 20px;
}

swiper-container {
  width: 100%;
  height: 100%;
}

swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
} */

swiper-slide img {
  display: block;
  width: 100%;
  height: 300px;
  object-fit: cover;
}

.thumb-image {
  height: 100px;
}

swiper-container {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

swiper-slide {
  background-size: cover;
  background-position: center;
}

.mySwiper {
  height: 80%;
  width: 100%;
}

.mySwiper2 {
  height: 20%;
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper2 swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper2 .swiper-slide-thumb-active {
  opacity: 1;
}
</style>
