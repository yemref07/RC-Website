<template>
  <pageHeader :title="$t('workHours.title')" :subTitle="companyName" />
  <div class="container">
    <div class="row">
      <div class="col-12 py-5">
        <table class="table" v-if="workHours.length > 0">
          <thead>
            <tr>
              <th scope="col">{{$t('workHours.day')}}</th>
              <th scope="col">{{$t('workHours.opening')}}</th>
              <th scope="col">{{$t('workHours.closing')}}</th>
            </tr>
          </thead>

          <tbody >
            <tr v-for="(item, index) in workHours" :key="index">
              <td>{{ days[index] }}</td>
              <td v-if="item.status">{{ item.start }}</td>
              <td v-if="item.status">{{ item.finish }}</td>
              <td v-if="!item.status">{{$t('workHours.closed')}}</td>
              <td v-if="!item.status">{{$t('workHours.closed')}}</td>
            </tr>
          </tbody>

          
        </table>
        <div v-else>
          <p class="text-center p-5">{{$t('workHours.fallback')}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
import pageHeader from './components/pageHeader.vue'
import {useI18n} from 'vue-i18n'

const {t:$t,messages} = useI18n()

const store = useThemeStore()
const { data } = storeToRefs(store)


const days = computed(()=>{
  return messages.value.tr.workHours.days
})

const workHours = computed(() => {
  if (data.value) {
    return data.value.worktimes
  } else {
    return []
  }
})

const companyName = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return ''
  }
})
</script>

<style lang="scss" scoped></style>
