<template>
  <div class="d-flex flex-row justify-content-between mt-5 bg-white p-2">
    <div class="">
      <h2 class="section-title">
        <Icon
          icon="fa6-solid:comments"
          width="34"
          height="34"
          color=""
          class="social-icon text-rblue"
        />
        {{title}} - {{ $t('sections.customerReview') }}  
      </h2>
    </div>
  </div>

  <div class="card-content">
    <swiper-container
      class="mySwiper"
      slides-per-view="1"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false
      }"
      v-if="props.comments.length > 0"
    >
      <swiper-slide v-for="(item, index) in props.comments" :key="index">
        <div
          class="d-flex flex-column align-items-start justify-content-center py-5"
     
        >
          <p class="customer-name">{{ item.name }}</p>

          <div class="">
            <Icon
              v-for="(item, index) in item.star"
              :key="index"
              icon="solar:star-bold"
              width="24"
              height="24"
              color="#ffa737"
              class="align-middle"
            />
            <span class="ms-3 text-muted review-date">{{ item.created_at }}</span>
          </div>

          <div class="mt-2">
            <p>{{ item.message }}</p>
          </div>
          <router-link to='/musteri-yorumlari' class="btn btn-primary mt-5">
            {{ $t('customerReview.allReview') }}
          </router-link>
        </div>
      </swiper-slide>
    </swiper-container>
    <div class="" v-else>{{ $t('customerReview.noReview') }}  </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { register } from 'swiper/element/bundle'
register()

const props = defineProps({
  comments: Array,
  title:String
})
</script>

<style scoped>
.review-date {
  vertical-align: sub;
  font-size: 14px;
}

.customer-name{
  font-size: 16px;
  font-weight: 500;
}
</style>
