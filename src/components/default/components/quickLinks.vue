<template>
  <div class="quick-links-container">
    <div class="quick-links">
      <div class="d-flex flex-column gap-2 justify-content-center align-items-center">
        <a :href="`tel:${props.phone}`" :title="props.phone">
          <div class="quick-item">
            <Icon icon="akar-icons:phone" width="28" height="28" class="" color="white" />
            <span class="text-light"> {{ $t('buttons.phone') }} </span>
          </div>
        </a>

        <a :href="`https://wa.me/${props.wp}`" title="WhatsApp">
          <div class="quick-item">
            <Icon icon="bi:whatsapp" width="28" height="28" class="" color="white" />
            <span class="text-light">{{ $t('whatsApp') }}</span>
          </div>
        </a>

        <div class="quick-item" @click="toggleFastAppModal" v-if="!appointmentType">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <Icon
              icon="solar:calendar-line-duotone"
              width="28"
              height="28"
              class=""
              color="white"
            />
            <span class="text-light">
              {{ $t('buttons.getApp') }}
            </span>
          </div>
        </div>

        <div class="quick-item" v-else>
          <router-link to="/randevu-al" title="Randevu Al">
            <div class="d-flex flex-column justify-content-center align-items-center">
              <Icon
                icon="solar:calendar-line-duotone"
                width="28"
                height="28"
                class=""
                color="white"
              />
              <span class="text-light">{{ $t('buttons.getApp') }} </span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAppointmentStore } from '../../../stores/appointment'
import { useThemeStore } from '../../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { Icon } from '@iconify/vue'

const themeStore = useThemeStore()
const appStore = useAppointmentStore()
const { toggleFastAppModal } = appStore
const { data } = storeToRefs(themeStore)

const appointmentType = computed(() => {
  if (data.value) {
    return data.value.appointment_type
  } else {
    return false
  }
})

const props = defineProps({
  phone: String,
  wp: String
})
</script>

<style scoped>
@media only screen and (max-width: 768px) {
  .quick-links-container {
    display: none;
  }
}

.quick-links-container {
  position: fixed;
  right: 0;
  top: 50%;
  z-index: 102;
  transform: translateY(-50%);
  align-items: center;
}

.quick-links {
  position: sticky;
  top: 40%;
  right: 0;
  z-index: 102;
}

.quick-item {
  background-color: var(--rblue);
  border-radius: 10px 0px 0px 10px;
  width: 100px;
  height: 70px;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  font-size: 14px;
}

.quick-item:hover {
  opacity: 0.8;
  transition: 0.8;
}
</style>
