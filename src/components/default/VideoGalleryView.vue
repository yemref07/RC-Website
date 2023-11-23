<template>
  <pageHeader :title="$t('menu.videoGallery')" :sub-title="companyName" />
  <div class="container">
    <div class="row">
      <div class="col-md-3 mb-2" v-for="(item, index) in videos" :key="index">
        <div class="figure" @click="openVideoModal(item.link)">
          <el-image
            :src="`http://i3.ytimg.com/vi/${item.link}/mqdefault.jpg`"
            alt="Video"
            class="video-cover gallery-video"
            style="height: auto; width: 100%"
            lazy
          ></el-image>
          <Icon icon="mingcute:play-fill" width="35" height="35" color="black" class="play-icon" />
        </div>
      </div>
    </div>
  </div>

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
</template>

<script setup>
import pageHeader from './components/pageHeader.vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed, ref, watch } from 'vue'
import { Icon } from '@iconify/vue'

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const companyName = computed(() => {
  if (data.value?.title) {
    return data.value.title
  } else {
    return ''
  }
})

const videos = computed(()=>{
    if(data.value?.videos){
        return data.value.videos
    }
    else{
        return []
    }
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

<style lang="css" scoped>
.gallery-video{
  border-radius: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
}

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
</style>
