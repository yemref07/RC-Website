<template>
  <el-dialog v-model="isVisibleFastAppMdl" align-center center class="modal-width">
    <span class="loc-modal-title">{{ $t('buttons.getFastApp') }} </span>
    <template #footer>
      <span class="dialog-footer">
        <div class="row">
          <div class="col-md-6 mb-3">
            <el-input
              v-model="appointment.name"
              class="w-100"
              :placeholder="$t('name')"
              :suffix-icon="User"
            />
          </div>

          <div class="col-md-6 mb-3">
            <el-input
              v-model="appointment.surname"
              class="w-100"
              :placeholder="$t('surname')"
              :suffix-icon="User"
            />
          </div>

          <div class="col-md-6 mb-3">
            <VueDatePicker
              v-model="appointment.date_at"
              locale="tr"
              week-numbers="iso"
              :cancelText="$t('close')"
              :selectText="$t('confirm')"
              utc
              :min-date="new Date()"
              time-picker-inline
              :is-24="true"
              :format="format"
            >
              <template #trigger>
                <el-input
                  v-model="selectedDate"
                  class="w-100"
                  :placeholder="$t('appDate')"
                  :suffix-icon="Calendar"
                />
              </template>
            </VueDatePicker>
          </div>

          <div class="col-md-6 mb-3">
            <el-select
              v-model="appointment.services"
              multiple
              collapse-tags
              collapse-tags-tooltip
              :placeholder="$t('selectService')"
              class="w-100"
              size="large"
            >
              <el-option-group v-for="group in categorizedServices" :key="group.name" :label="group.name">
                <el-option
                  v-for="item in group.services"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                />
              </el-option-group>
            </el-select>
          </div>

          <div class="col-md-6 mb-3">
            <el-input
              v-model="appointment.email"
              type="email"
              class="w-100"
              :placeholder="$t('email')"
              :suffix-icon="Promotion"
            />
          </div>

          <div class="col-md-6 mb-3">
            <div class="custom-wrapper w-100">
              <vue-tel-input
                v-model.trim="phone"
                mode="international"
                class="w-100 custom-tel-input"
                type="tel"
               :placeholder="$t('phone')"
                defaultCountry="tr"
              ></vue-tel-input>
            </div>
          </div>
        </div>
        <button class="btn btn-primary w-100 text-center" type="primary" @click="sendAppData">
          <Icon icon="majesticons:send-line" width="20" height="20" color="white" class="me-1" />
          {{ $t('buttons.getApp') }}
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useAppointmentStore } from '../../../stores/appointment'
import {useServiceStore} from '../../../stores/service'
import { Icon } from '@iconify/vue'
import { storeToRefs } from 'pinia'
import { User, Calendar, Promotion} from '@element-plus/icons-vue'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'

const appStore = useAppointmentStore()
const {  getFastApp,setFalseFastAppStat ,closeFastAppModal } = appStore
const { createFastAppStat, isVisibleFastAppMdl } = storeToRefs(appStore)

const serviceStore = useServiceStore()
const {services} = storeToRefs(serviceStore)

const selectedDate = ref('')
const isValid = ref(false)

const { t:$t } = useI18n() 

const appointment = reactive({
  date_at: '',
  services: [],
  name: '',
  surname: '',
  email: ''
})

const phone = ref('')

const trimmedPhone = computed(() => {
  return phone.value.replace(/\s/g, '').slice(1)
})

const categorizedServices = computed(() => {
  if (services.value) {
    return services.value.serviceslist
  } else {
    return []
  }
})

const format = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  const hour = date.getHours()
  const min = date.getMinutes()
  selectedDate.value = `${day}/${month}/${year} - ${hour}:${min}`
  return `${day}/${month}/${year}`
}


const showError = (param) => {
  Swal.fire({
    title: $t('error'),
    text: param,
    icon: 'error',
    confirmButtonText: $t('ok'),
    customClass: {
      popup: 'index-99'
    }
  })
}

const showSuccess = (param) => {
  Swal.fire({
    title: $t('success'),
    text: param,
    icon: 'success',
    confirmButtonText: $t('ok'),
    confirmButtonColor: '#0069ff'
  })
}

const checkValidation = () => {
  isValid.value = true
  if (
    appointment.date_at == '' ||
    appointment.name == '' ||
    appointment.email == '' ||
    phone.value == '' ||
    appointment.surname == '' ||
    appointment.services.length == 0
  ) {
    showError('Lütfen boş alan bırakmayınız')
    isValid.value = false
  }

  if (!emailValidation(appointment.email)) {
    showError($t('fastApp.error1'))
    isValid.value = false
  }
}

const emailValidation = (email) => {
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
  return emailRegex.test(email)
}

const clearInputs = () => {
  appointment.date_at = ''
  appointment.email = ''
  appointment.phone = ''
  appointment.name = ''
  appointment.surname = ''
  appointment.services = []
}

const sendAppData = async () => {
  checkValidation()
  if (isValid.value) {
    appointment.phone = trimmedPhone.value
    await getFastApp(appointment)
  }

  if (createFastAppStat.value) {
    clearInputs()
    showSuccess($t('fastApp.success1'))
    closeFastAppModal() 
    setFalseFastAppStat()
    isValid.value = false
  }
}
</script>

<style lang="css" scoped>
.loc-modal-title {
  position: relative;
  display: block;
  font-size: 26px;
  color: #031b4e;
  font-weight: 600;
  line-height: 1.2em;
  text-align: center;
}

.custom-wrapper {
  display: inline-flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  padding: 9px 11px;
  background-color: var(--el-input-bg-color, var(--el-fill-color-blank));
  background-image: none;
  border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
  cursor: text;
  transition: var(--el-transition-box-shadow);
  transform: translate3d(0, 0, 0);
  box-shadow: 0 0 0 1px var(--el-input-border-color, var(--el-border-color)) inset;
}

.custom-tel-input {
  --el-input-inner-height: calc(var(--el-input-height, 32px) - 2px);
  -webkit-appearance: none;
  color: var(--el-input-text-color, var(--el-text-color-regular));
  font-size: inherit;
  height: var(--el-input-inner-height);
  line-height: var(--el-input-inner-height);
  outline: 0;
  border: none;
  background: 0 0;
  box-sizing: border-box;
}

.custom-wrapper:hover {
    box-shadow: 0 0 0 1px var(--el-input-hover-border-color) inset;
}
.custom-tel-input :focus-within {
    box-shadow: none !important;
    border-color: blue !important;
}

.custom-wrapper:focus-within {
  box-shadow: none !important;
  border-color: blue !important;
}
</style>
