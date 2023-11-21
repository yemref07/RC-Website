<template>
  <div class="relative">
    <swiper-container
      class="mySwiper mt-150"
      :breakpoints="{
        '640': {
          slidesPerView: 1,
          spaceBetween: 0
        },
        '768': {
          slidesPerView: 1,
          spaceBetween: 0
        },
        '1024': {
          slidesPerView: 3,
          spaceBetween: 50
        }
      }"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
    >
      <swiper-slide v-for="(item, index) in galleryImages" :key="index">
        <!-- <el-image :key="`${item.image}`" :src="`https://cdn.rapp.com.tr/${item.image}`" lazy>
          <template #placeholder>
            <el-image src="/placeholder.png" alt=""></el-image>
          </template>
        </el-image> -->
        <img :key="`${item.image}`" :src="`https://cdn.rapp.com.tr/${item.image}`" :alt="title" class="img-fluid"/>
      </swiper-slide>
    </swiper-container>

    <div class="container header">
      <div
        class="d-flex flex-row align-items-center justify-content-between justify-start-mobile flex-wrap gap-3"
      >
        <div class="d-flex flex-row">
          <div class="flex flex-column align-items-center">
            <div class="">
              <h1 class="main-title">
                {{ title }}
              </h1>
            </div>

            <div class="">
              <span class="fw-bold me-2">[{{ avgRate }}/5]</span>
              <Icon
                v-for="(item, index) in avgRate"
                icon="solar:star-bold"
                width="20"
                height="20"
                color="#ffa737"
                class="align-middle"
                :key="index"
              />
              <span class="ms-2 text-muted" v-if="commentsCount == 0">{{ $t('sendComment.fallback') }}</span>
              <span class="ms-2 text-muted" v-else>{{ commentsCount }} {{ $t('review') }}</span>
            </div>
          </div>
        </div>

        <div class="align-items-center">
          <!-- <a :href="`tel:${profileInfos.phone}`" class="me-3 text-dark fs-5">Şimdi Ara</a> -->
          <a
            :href="`tel:${profileInfos.phone}`"
            class="btn btn-primary text-light px-4 py-2 rounded-5"
            :title="profileInfos.phone"
          >
            <Icon
              icon="ph:phone-call-light"
              width="20"
              height="20"
              color="white"
              class="align-middle"
            />
            {{ profileInfos.phone }}
          </a>
        </div>
      </div>
    </div>

    <div class="sidebar-page container bg-alice">
      <div class="auto-container">
        <div class="row">
          <div class="col-lg-7 col-md-12 col-sm-12 order-2 order-lg-1">
            <div class="widget-content">
              <div class="card-content">
                <about />
              </div>
              <serviceGallery
                :galleryImages="galleryImages"
                :title="title"
                v-if="themePreference.imageGallery"
              />
              <videoGallery :videos="videos" :title="title" v-if="themePreference.videoGallery" />
              <div class="mt-5">
                <sendComment :title="title" v-if="themePreference.sendComment" />
              </div>
              <customerComments
                :comments="comments"
                :title="title"
                v-if="themePreference.customerComments"
              />
            </div>
          </div>

          <div class="col-lg-5 col-md-12 col-sm-12 order-1 order-lg-2">
            <profileInfo
              :info="profileInfos"
              :title="title"
              :lat="maplat"
              :lng="maplng"
              :appType="appType"
              v-if="themePreference.profileInfo"
            />
            <services />
            <mapSection :lat="maplat" :lng="maplng" v-if="themePreference.map" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { computed, onMounted } from 'vue'
import { useThemeStore } from '../../stores/themeInfo'
import { useServiceStore } from '../../stores/service'
import { storeToRefs } from 'pinia'
import { register } from 'swiper/element/bundle'

import about from './components/about.vue'
import serviceGallery from './components/serviceGallery.vue'
import videoGallery from './components/videoGallery.vue'
import sendComment from './components/sendComment.vue'
import customerComments from './components/customerComments.vue'

import profileInfo from './components/profileInfo.vue'
import services from './components/services.vue'
import mapSection from './components/mapSection.vue'
import { useI18n } from 'vue-i18n'
const { t: $t } = useI18n()

register()

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const serviceStore = useServiceStore()
const { fetchServiceData } = serviceStore

onMounted(async () => {
  try {
    await fetchServiceData()
  } catch (error) {
    console.error('Error fetching service data:', error)
  }
})

const appType = computed(() => {
  if (data.value) {
    return data.value.appointment_type
  } else {
    return 0
  }
})

const title = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return $t('companyName')
  }
})

const profileInfos = computed(() => {
  if (data.value) {
    return {
      phone: data.value.phone,
      wp: data.value.whatsapp,
      email: data.value.email,
      address: data.value.address,
      title: data.value.title,
      instagram: data.value.instagram,
      facebook: data.value.facebook,
      linkedin: data.value.linkedin,
      twitter: data.value.twitter,
      website: data.value.website,
      startWork: data.value.startwork,
      finishWork: data.value.finishWork,
      appTime: data.value.appointment_time,
      whatsApp: data.value.whatsapp,
      logo: data.value.logo,
      province: data.value.province,
      district: data.value.district,
      companyTitle: data.value.companyTitle
    }
  } else {
    return {}
  }
})

const comments = computed(() => {
  if (data.value && Array.isArray(data.value.lastreviews)) {
    return data.value.lastreviews
  } else {
    return []
  }
})

const commentsCount = computed(() => {
  if (data.value.reviewscount && !isNaN(data.value.reviewscount)) {
    return data.value.reviewscount
  } else {
    return 0
  }
})

const avgRate = computed(() => {
  if (data.value.reviewsavg && !isNaN(data.value.reviewsavg)) {
    return parseInt(data.value.reviewsavg)
  } else {
    return 0
  }
})

const videos = computed(() => {
  if (data.value && data.value.videos.length > 0) {
    return data.value.videos
  } else {
    return []
  }
})

const galleryImages = computed(() => {
  if (data.value && data.value.galleries.length) {
    return data.value.galleries
  } else {
    return [
      { image: 'placeholder.png' },
      { image: 'placeholder.png' },
      { image: 'placeholder.png' },
      { image: 'placeholder.png' }
    ]
  }
})

const maplng = computed(() => {
  if (data.value) {
    return data.value.map_lng
  } else {
    return ''
  }
})

const maplat = computed(() => {
  if (data.value) {
    return data.value.map_lat
  } else {
    return ''
  }
})

const themePreference = computed(() => {
  if (data.value.theme_design) {
    return data.value.theme_design
  } else {
    return {
      aboutUs: true,
      profileInfo: true,
      services: true,
      map: true,
      imageGallery: true,
      videoGallery: true,
      customerComments: true,
      sendComment: true
    }
  }
})
</script>

<style scoped>

.header {
  background: #ffffff;
  border-bottom: 1px solid #f1f3f7;
  padding-bottom: 30px;
  padding-top: 50px;
}


a {
  text-decoration: none;
}

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

swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.relative {
  position: relative;
}

@media only screen and (max-width: 768px) {
  .justify-start-mobile {
    justify-content: center !important;
  }

  .header {
    padding-bottom: 10px;
    padding-top: 10px;
}
}
</style>
