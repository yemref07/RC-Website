<template>
  <header>
    <component :is="dynamicHeader" />
  </header>

  <main>
    <router-view />
  </main>

  <component :is="dynamicFooter" />
</template>

<script setup>
import { ref, defineAsyncComponent, computed} from 'vue'
const theme = ref('default')

const dynamicHeader = computed(() =>
  defineAsyncComponent(() => import(`./components/${theme.value}/TheHeader.vue`))
)

const dynamicFooter = computed(() =>
  defineAsyncComponent(() => import(`./components/${theme.value}/TheFooter.vue`))
)


</script>

<style scoped>

</style>
