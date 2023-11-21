<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <h2 class="bg-white p-2 mt-5 section-title">
    <Icon icon="ph:list" width="34" height="34" color="black" class="social-icon" />
    {{ $t('sections.popularServices') }}
  </h2>
  <div class="card-content">
    <el-collapse v-model="activePopularService" accordion>
      <el-collapse-item :name="index + 1" v-for="(item, index) in popularServices" :key="index">
        <template #title>
          <span style="font-size: 16px; margin-left: 2px">
            {{ item.name }}
          </span>
          <el-icon class="header-icon">
            <info-filled />
          </el-icon>
        </template>

        <div class="row justify-content-center align-items-center">
          <div class="col-7 text-start">
            <span class="acc-text">{{ item.name }}</span>
          </div>

          <div class="col-5 text-end">
            <div
              v-if="!appointmentType"
              class="btn btn-primary acc-btn"
              @click="
                () => {
                  toggleFastAppModal()
                  setRequestedService(item)
                }
              "
            >
              {{ $t('buttons.getApp') }}
            </div>

            <router-link
              v-else
              to="/randevu-al"
              class="btn btn-primary acc-btn"
              @click="setRequestedService(item)"
            >
              {{ $t('buttons.getApp') }}</router-link
            >
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>

  <h2 class="bg-white p-2 mt-5 section-title">
    <Icon icon="ph:list" width="34" height="34" color="black" class="social-icon" />
    {{ $t('sections.services') }}
  </h2>
  <div class="card-content">
    <el-collapse v-model="activeName" accordion>
      <el-collapse-item v-for="(item, index) in categorizedServices" :key="index" :name="index + 1">
        <template #title>
          <span style="font-size: 16px; margin-left: 2px; padding: 0 !important;">
            {{ item.name }}
          </span>
          <el-icon class="header-icon">
            <info-filled />
          </el-icon>
        </template>
        
        <div class="row justify-content-center align-items-center" v-for="(item, index) in item.services" :key="index" :name="index + 1">
          <div class="col-7 text-start">
            <span class="acc-text">{{ item.name }}</span>
          </div>

          <div class="col-5 text-end">
            <div
              v-if="!appointmentType"
              class="btn btn-primary acc-btn"
              @click="()=>{toggleFastAppModal(),setRequestedService(item)}"
            >
              {{ $t('buttons.getApp') }}
            </div>

            <router-link v-else to="/randevu-al" class="btn btn-primary acc-btn" @click="setRequestedService(item)">{{
              $t('buttons.getApp')
            }}</router-link>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, computed } from 'vue'
import { useServiceStore } from '../../../stores/service'
import { storeToRefs } from 'pinia'
import { useThemeStore } from '../../../stores/themeInfo'
import { useAppointmentStore } from '../../../stores/appointment'

const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)

const appStore = useAppointmentStore()
const { toggleFastAppModal, setRequestedService } = appStore

const store = useServiceStore()
const { services } = storeToRefs(store)

const appointmentType = computed(() => {
  if (data.value) {
    return data.value.appointment_type
  } else {
    return false
  }
})

const categorizedServices = computed(() => {
  if (services.value) {
    return services.value.serviceslist
  } else {
    return []
  }
})

const popularServices = computed(() => {
  if (services.value) {
    return services.value.servicespopular
  } else {
    return []
  }
})

const activeName = ref(1)
const activePopularService = ref(1)
</script>

<style scoped>
.acc-text {
  margin-right: 5px;
  font-size: 14px;
  margin-left: 2px;
}
.acc-btn {
  font-size: 14px;
}
</style>
