<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2 class="bg-white p-2 mt-5 section-title" >
    <Icon icon="ph:list" width="34" height="34" color="black" class="social-icon" />
    {{ $t('mapSection.title') }}
  </h2>
  <div class="card-content" v-if="props.lat && props.lng">
    <iframe
      title = "Map"
      :src="location"
      width="100%"
      height="350"
      style="border: 0"
      frameborder="0"
      allowfullscreen=""
      loading="lazy"
    ></iframe>
  </div>
  <div class="card-content" v-else>
    <p>{{ $t('mapSection.fallback') }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
const props = defineProps({
  lat: String,
  lng: String
})

const location = computed(() => {
  return ` https://maps.google.com/maps?q=${props.lat},${props.lng}&t=&z=15&ie=UTF8&iwloc=&output=embed`
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
</style>
