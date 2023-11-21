<template>
  <h2 class="bg-white p-2 mt-5 section-title">
    <Icon icon="ph:video-fill" width="34" height="34" color="" class="text-rblue" />
    {{ title }} - {{ $t('sections.videoGallery') }}
  </h2>
  <div class="card-content">
    <div class="row">
      <div class="">
        <el-dialog v-model="dialogVisible" title="" class="modal-width" draggable>
          <VueYtframe
           title="Video"
            ref="youtubeVideo"
            width="100%"
            height="400"
            :video-id="iframeSrc"
            :player-vars="{ autoplay: 1, listType: 'user_uploads' }"
          />
        </el-dialog>
      </div>
    </div>

    <swiper-container
      class="mySwiper"
      thumbs-swiper=".mySwiper3"
      space-between="30"
      slides-per-view="1"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      v-if="props.videos.length > 0"
    >
      <swiper-slide v-for="(item, index) in props.videos" :key="index">
        <div class="figure" @click="openVideoModal(item.link)">
          <el-image
            :src="`http://i3.ytimg.com/vi/${item.link}/mqdefault.jpg`"
            alt="Video"
            class="video-cover"
            style="height:auto;width:100%;"
            lazy
          ></el-image>
          <Icon icon="solar:play-outline" width="45" height="45" color="white" class="play-icon" />
        </div>
      </swiper-slide>
    </swiper-container>

    <div v-else>
      <p class="">{{ $t('videoGallery.fallback') }}</p>
    </div>

    <swiper-container
      class="mySwiper3"
      space-between="10"
      slides-per-view="4"
      free-mode="true"
      watch-slides-progress="true"
    >
      <swiper-slide v-for="(item, index) in props.videos" :key="index">
        <el-image
          class="thumb-image"
          :key="`${item.link}`"
          style="height:auto;width:100%;"
          :src="`http://i3.ytimg.com/vi/${item.link}/mqdefault.jpg`"
          lazy
        />
      </swiper-slide>
    </swiper-container>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Icon } from '@iconify/vue'
import { register } from 'swiper/element/bundle'
register()
const props = defineProps({
  videos: Array,
  title: String
})

const youtubeVideo = ref(null)

const dialogVisible = ref(false)
const iframeSrc = ref('')

const openVideoModal = (videoSrc) => {
  dialogVisible.value = true
  iframeSrc.value = videoSrc
}

watch(dialogVisible, (newValue) => {
  if (newValue === false) {
    youtubeVideo.value.pauseVideo()
  }
})
</script>

<style scoped>
.video-cover {
  width: 100%;
  height: 300px;
  object-fit: cover;
  position: relative;
  border-radius: 15px;
}

.figure {
  position: relative;
  width: 100%;
  cursor: pointer;
}
.play-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.card-content {
  transition:
    box-shadow 0.25s linear,
    -webkit-box-shadow 0.25s linear;
  box-shadow: 0 10px 20px rgba(1, 14, 40, 0.1);
  background-color: #fff;
  padding: 20px;
}

.thumb-image {
  border-radius: 15px;
}

.mySwiper3 {
  box-sizing: border-box;
  padding: 10px 0;
}

.mySwiper3 swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.mySwiper3 .swiper-slide-thumb-active {
  opacity: 1;
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

swiper-slide img {
  display: block;
  width: 100%;
  object-fit: cover;
}

swiper-slide {
  background-size: cover;
  background-position: center;
}
</style>
