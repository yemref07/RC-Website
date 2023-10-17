<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="categories-widget ls-widget">
    <div class="widget-title">
      <h4><span class="icon flaticon-menu"></span>Haritada Görüntüle</h4>
    </div>
    <div class="widget-content" v-if="props.lat && props.lng">
      <iframe
        :src="location"
        width="100%"
        height="350"
        style="border: 0"
        frameborder="0"
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  </div>
</template>

<script setup>
import {computed} from 'vue'
const props = defineProps({
  lat:String,
  lng:String
})

const location = computed(()=>{
  return `https://maps.google.com/maps?q=${props.lat},${props.lng}&amp;hl=tr&amp;z=16&amp;output=embed`
})
</script>

<style lang="scss" scoped></style>
