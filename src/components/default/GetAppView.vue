<template>
  <pageHeader :title="$t('getApp.title')" subTitle="Randevu Center" />
  <div class="container">
    <div class="row">
      <div class="col-md-7">
        <div class="card-content">
          <div class="">
            <h3 class="appointment-title">{{ $t('getApp.selectService') }}</h3>

            <el-select
              v-model="appointment.services"
              multiple
              :placeholder="$t('getApp.selectService')"
              class="w-100"
              size="large"
              filterable="true"
              default-first-option="true"
            >
              <el-option-group
                v-for="group in categorizedServices"
                :key="group.name"
                :label="group.name"
              >
                <el-option
                  v-for="item in group.services"
                  :key="item.id"
                  :label="labels(item.id)"
                  :value="item.id"
                />
              </el-option-group>
            </el-select>
          </div>

          <div class="mt-4">
            <h3 class="appointment-title">{{ $t('getApp.selectSpecialist') }}</h3>
            <el-select
              v-model="appointment.specialist.id"
              class="w-100"
              :placeholder="$t('getApp.selectSpecialist')"
              size="large"
            >
              <el-option
                v-for="item in specialists"
                :key="item.id"
                :label="item.full_name"
                :value="item.id"
                @click="
                  () => {
                    getSpecialist(item.full_name)
                    setSpecialistName(item.full_name)
                    getInitialAvaibleDate()
                  }
                "
              />
            </el-select>
          </div>

          <div class="mt-5" v-if="appointment.specialist.id && appointment.services">
            <div class="">
              <h3 class="appointment-title">{{ $t('getApp.selectDate') }}:</h3>
              <p>
                {{ $t('getApp.appDate') }} :
                <span class="fw-bold text-rblue">{{ selectedDate }}</span>
              </p>
            </div>

            <div class="row mt-4">
              <div class="col-md-3 mb-3">
                <button
                  class="btn btn-outline-primary w-100"
                  role="button"
                  :class="{ active: activeDateBtn === 0 }"
                  @click="
                    () => {
                      setDate(today), setActiveDateBtn(0), getAvaibleDate()
                    }
                  "
                >
                  {{ $t('getApp.today') }}
                </button>
              </div>
              <div class="col-md-3 mb-3">
                <button
                  class="btn btn-outline-primary w-100"
                  role="button"
                  :class="{ active: activeDateBtn === 1 }"
                  @click="
                    () => {
                      setDate(tomorrow), setActiveDateBtn(1), getAvaibleDate()
                    }
                  "
                >
                  {{ $t('getApp.tomorrow') }}
                </button>
              </div>
              <div class="col-md-3 mb-3">
                <button
                  class="btn btn-outline-primary w-100"
                  role="button"
                  :class="{ active: activeDateBtn === 2 }"
                  @click="
                    () => {
                      setDate(twoDaysLater), setActiveDateBtn(2), getAvaibleDate()
                    }
                  "
                >
                  {{ formatDateBtn(twoDaysLater) }}
                </button>
              </div>
              <div class="col-md-3 mb-3">
                <VueDatePicker
                  v-model="appointment.date"
                  locale="tr"
                  week-numbers="iso"
                  :enable-time-picker="false"
                  parseModel=""
                  @blur="getAvaibleDate()"
                  utc
                  :min-date="new Date()"
                  :format="formatDateText"
                  :is-24="true"
                  auto-apply
                >
                  <template #trigger>
                    <button
                      class="clickable-text btn btn-outline-primary w-100"
                      role="button"
                      :class="{ active: activeDateBtn === 3 }"
                      @click="
                        () => {
                          setActiveDateBtn(3)
                        }
                      "
                    >
                      {{ $t('getApp.selectDate') }}
                    </button>
                  </template>
                </VueDatePicker>
              </div>
            </div>
          </div>

          <div class="mt-4">
            <div class="" v-if="appointment.date">
              <h3 class="appointment-title">{{ $t('getApp.selectHour') }}</h3>
              <p>
                {{ $t('getApp.appHour') }}:
                <span class="fw-bold text-rblue">{{ appointment.hour }}</span>
              </p>
            </div>

            <div class="row mt-4" v-if="avaibleAppHours.length > 0">
              <div
                class="col-6 col-md-3 col-lg-2 mb-3 mb-1"
                v-for="(item, index) in avaibleAppHours"
                :key="index"
              >
                <button
                  v-if="isHourPast(item)"
                  class="btn btn-outline-primary w-100"
                  role="button"
                  @click="
                    () => {
                      setAppHour(item), setActiveHourBtn(index)
                    }
                  "
                  :class="{ active: activeHourBtn === index }"
                >
                  {{ item }}
                </button>
              </div>
            </div>

            <div class="alert alert-danger mt-5" role="alert" v-if="isOpen">
              İşletme bugün hizmet vermemekte.
            </div>
          </div>

          <div
            class=""
            v-if="
              appointment.date &&
              appointment.hour &&
              appointment.services[0] &&
              appointment.specialist
            "
          >
            <div class="row mt-4 gap-3">
              <h3 class="appointment-title">{{ $t('getApp.personalInfo') }}</h3>
              <div class="col-sm-12">
                <label for="exampleFormControlInput1" class="form-label mt-3">{{
                  $t('getApp.mobilePhone')
                }}</label>
                <vue-tel-input
                  v-model.trim="appointment.phone"
                  mode="international"
                  class="w-100 py-2"
                  type="tel"
                  @blur="checkCustomerRegistration"
                ></vue-tel-input>
              </div>

              <div class="col-md-6">
                <label class="form-label"> {{ $t('getApp.name') }} </label>
                <input v-model="appointment.name" class="form-control w-100 py-2" type="text" />
              </div>

              <div class="col-md-6">
                <label class="form-label"> {{ $t('getApp.surname') }} </label>
                <input v-model="appointment.surname" class="form-control w-100 py-2" type="text" />
              </div>

              <div class="col-sm-12">
                <div class="d-flex flex-row mt-5 justify-content-between gap-5">
                  <button class="theme-btn btn-style-one md-w-25">{{ $t('getApp.cancel') }}</button>
                  <button
                    class="btn btn-primary btn-style-two btn-block md-w-25"
                    @click="getSmsVerify"
                  >
                    {{ $t('getApp.send') }}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-5">
        <div class="card-content">
          <h3 class="appointment-title">{{ $t('getApp.appSummary') }}</h3>

          <ul>
            <li>
              <span class="summary-title">{{ $t('getApp.services') }}</span>
              <ul v-if="appointment.services[0]">
                <li v-for="(item, index) in appointment.services" :key="index">
                  {{ searchCatName(item) }}
                </li>
              </ul>
              <p v-else>{{ $t('getApp.noServices') }}</p>
            </li>
          </ul>

          <ul>
            <li>
              <span class="summary-title">{{ $t('getApp.specialist') }}</span>
            </li>

            <li>
              <span class="" v-if="selectedSpecialist">{{ selectedSpecialist }}</span>
              <p v-else>{{ $t('getApp.noSpecialist') }}</p>
            </li>
          </ul>

          <ul>
            <li>
              <span class="summary-title">{{ $t('getApp.dateHour') }}</span>
            </li>

            <li>
              <span class="" v-if="selectedDate">{{ selectedDate }} - {{ appointment.hour }}</span>
              <span v-else>{{ $t('getApp.noDateHour') }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, reactive, onMounted, watch } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { storeToRefs } from 'pinia'
import '@vuepic/vue-datepicker/dist/main.css'
import { useAppointmentStore } from '../../stores/appointment'
import { useThemeStore } from '../../stores/themeInfo'
import { useServiceStore } from '../../stores/service'
import Swal from 'sweetalert2'
import pageHeader from './components/pageHeader.vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t: $t } = useI18n()

const router = useRouter()

const appStore = useAppointmentStore()
const { filledHours, errorMsg, customerAllInfo, verifyStatus, requestedService } =
  storeToRefs(appStore)
const { fetchFilledHours, fetchVerifyCode, checkCustomer } = appStore

const serviceStore = useServiceStore()
const { services } = storeToRefs(serviceStore)
const { fetchServiceData } = serviceStore

const themeStore = useThemeStore()
const { data: themeData } = storeToRefs(themeStore)

onMounted(async () => {
  await fetchServiceData()
  if (requestedService.value) {
    console.log(requestedService.value, 'test')
    appointment.services.push(requestedService.value.id)
    appointment.serviceNames.push(requestedService.value.name)
  }
})
const appointment = reactive({
  date: '',
  specialist: { name: 'Fark Etmez', id: '' },
  services: [],
  serviceNames: [],
  hour: '',
  phone: '',
  name: '',
  surname: '',
  smsverify: '',
  customer_id: ''
})

const labels = (id) => {
  let serviceName = allServicesList.value.filter((item) => {
    return item.id == id
  })

  return serviceName[0].name
}

const isHourPast = (param) => {
  let today = new Date()
  let appDate = appointment.date

  let appDay = new Date(appDate).getDate()
  let dayOfMonth = today.getDate()

  let currentHour = today.getHours()
  let currentMin = today.getMinutes()
  let [appHour, appMin] = param.split(':').map(Number)



  if (dayOfMonth == appDay) {
    if (appHour > currentHour) {
      return true
    } 
    else if (appHour === currentHour && appMin > currentMin) {
      return true
    } 
    else {
      return false
    }
  } 
  
  else {
    return true
  }
}

const avaibleAppHours = ref([])
const activeDateBtn = ref(0)
const activeHourBtn = ref('')

const isOpen = ref('')

const selectedSpecialist = ref('')

const selectedDate = ref('')

const today = new Date()

const tomorrow = new Date(today)
tomorrow.setDate(tomorrow.getDate() + 1)

const twoDaysLater = new Date(today)
twoDaysLater.setDate(twoDaysLater.getDate() + 2)

const categorizedServices = computed(() => {
  if (services.value) {
    return services.value.serviceslist
  } else {
    return []
  }
})

const allServicesList = computed(() => {
  if (services.value) {
    return services.value.services
  } else {
    return []
  }
})

const specialists = computed(() => {
  if (services.value) {
    return services.value.employees
  } else {
    return []
  }
})

const getVerifyStatus = computed(() => {
  if (verifyStatus.value !== undefined && verifyStatus.value !== null) {
    return verifyStatus.value
  } else {
    return false
  }
})

const setSpecialistName = (param) => {
  appointment.specialist.name = param
}

const setActiveDateBtn = (param) => {
  activeDateBtn.value = param
}
const setActiveHourBtn = (param) => {
  activeHourBtn.value = param
}

const formatDateBtn = (param) => {
  const options = { weekday: 'short', day: '2-digit', month: '2-digit' }
  return new Intl.DateTimeFormat('tr-TR', options).format(param)
}

const formatDateText = (date) => {
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  selectedDate.value = `${day}/${month}/${year}`
}

const getSpecialist = (param) => {
  selectedSpecialist.value = param
}

const searchCatName = (param) => {
  return allServicesList.value.filter((e) => {
    return e.id == param
  })[0].name
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

const showSuccess = (param, header) => {
  Swal.fire({
    title: header ? header : $t('success'),
    text: param,
    icon: 'success',
    confirmButtonText: $t('ok')
  })
}

watchEffect(() => {
  if (errorMsg.value !== '') {
    showError(errorMsg.value)
  }
})

const formatAppDate = (param) => {
  const dateObject = new Date(param)
  const day = dateObject.getDate().toString().padStart(2, '0')
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0')
  const year = dateObject.getFullYear()
  return `${year}-${month}-${day}`
}

const getAvaibleDate = async () => {
  if (appointment.services[0] && appointment.specialist.id) {
    await fetchFilledHours({
      employees: appointment.specialist.id,
      date: formatAppDate(appointment.date)
    })
    computeAvaibleHours()
  } else {
    showError($t('getApp.error1'))
  }
}

const getInitialAvaibleDate = async () => {
  appointment.date = new Date()
  await getAvaibleDate()
}

const setAppHour = (param) => {
  appointment.hour = param
}

const setDate = (param) => {
  appointment.date = param
}

const trimmedPhone = computed(() => {
  return appointment.phone.replace(/\s/g, '')
})

// ****************Get Appointment Verify Code********************//

const getSmsVerify = async () => {
  let phone = trimmedPhone.value.slice(1)
  await fetchVerifyCode(phone)
  localStorage.setItem('appInfo', JSON.stringify(appointment))

  if (getVerifyStatus.value) {
    showSuccess($t('getApp.successText'), $t('getApp.successTitle'))
    router.push({
      name: 'randevuOnay'
    })
  } else {
    showError($t('getApp.error2'))
  }
}

// ****************Check Customer Registration********************//
const phoneValidation = (phoneNumber) => {
  // Remove white spaces, hyphens, and parentheses
  const cleanedPhoneNumber = phoneNumber.replace(/[\s-()]/g, '')
  // Define a regular expression for a valid turkish phone number
  const internationalPhoneNumberRegex = /^\+(?:\d{1,4})?\d{10}$/
  return internationalPhoneNumberRegex.test(cleanedPhoneNumber)
}

const checkCustomerRegistration = async () => {
  if (phoneValidation(appointment.phone)) {
    //remove + from the phone number
    let phone = trimmedPhone.value.slice(1)

    await checkCustomer(phone)
  } else {
    showError($t('getApp.error3'))
  }
}

const customerInfos = computed(() => {
  if (customerAllInfo.value) {
    return {
      name: customerAllInfo.value.name ?? '',
      surname: customerAllInfo.value.surname ?? '',
      customer_id: customerAllInfo.value.id ?? ''
    }
  } else {
    return {
      name: '',
      surname: '',
      customer_id: ''
    }
  }
})

watch(customerInfos, (newValue) => {
  if (newValue) {
    ;(appointment.name = newValue.name),
      (appointment.surname = newValue.surname),
      (appointment.customer_id = newValue.customer_id)
  }
})

//********************Computing Avaible Appointment Hours****************** //

const workTimesInfo = computed(() => {
  if (themeData.value) {
    return {
      appInterval: themeData.value.appointment_time,
      workSchedule: themeData.value.worktimes
    }
  } else {
    return {}
  }
})

const filledHoursList = computed(() => {
  if (filledHours.value) {
    return filledHours.value
  } else {
    return []
  }
})

const getTimeRanges = (start, end, interval, lang) => {
  const ranges = []
  const format = {
    hour: 'numeric',
    minute: 'numeric'
  }

  if (start == null || end == null) {
    return false
  }

  const start_hour = parseInt(start.split(':')[0])
  const start_minute = parseInt(start.split(':')[1])
  const end_hour = parseInt(end.split(':')[0])
  const end_minute = parseInt(end.split(':')[1])
  const st = new Date(1970, 0, 1, start_hour, start_minute, 0)
  const en = new Date(1970, 0, 1, end_hour, end_minute, 0)
  let fark = (en.getTime() - st.getTime()) / 1000 / 60
  for (let minutes = start_minute; minutes < fark + start_minute; minutes = minutes + interval) {
    const date = new Date()
    date.setHours(start_hour)
    date.setMinutes(minutes)
    ranges.push(date.toLocaleTimeString(lang, format))
  }
  return ranges
}

const computeAvaibleHours = () => {
  if (appointment.date && filledHoursList.value) {
    //we are converting our date string to date object because in our calendar we are storing date as a string
    let appointmentDate
    if (typeof appointment.date === 'string') {
      appointmentDate = new Date(appointment.date)
    } else {
      appointmentDate = appointment.date
    }

    // from date object 0 represent sunday in our array 0 represent monday

    let day = appointmentDate.getDay()
    if (day == 0) {
      day = 6
    } else {
      day = day - 1
    }
    let selectedDayInfo = workTimesInfo.value.workSchedule[day]
    let appInterval = workTimesInfo.value.appInterval
    console.log(avaibleAppHours.value)
    if (selectedDayInfo.start === null || selectedDayInfo.finish === null) {
      showError($t('getApp.error4'))
      isOpen.value = true
      avaibleAppHours.value = []
    } else {
      const companyAppSchedule = getTimeRanges(
        selectedDayInfo.start,
        selectedDayInfo.finish,
        appInterval,
        'tr'
      )
      let filledHoursArr = []
      filledHours.value.map((item) => {
        filledHoursArr.push(item.hour)
      })

      avaibleAppHours.value = companyAppSchedule.filter((item) => {
        return !filledHoursArr.includes(item)
      })

      if (avaibleAppHours.value.length === 0) {
        avaibleAppHours.value = []
        showError($t('getApp.error5'))
      }
    }
  }
}

watch(activeDateBtn, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    appointment.hour = ''
  }

  watch(
    () => appointment.date,
    () => {
      isOpen.value = false
    }
  )
})
</script>

<style scoped>
.appointment-title {
  font-size: 24px;
}
.avaibleHoursBlock {
  position: relative;
}
.avaibleHoursBlock:before {
  content: '';
  background: #b7b7b7;
  width: 100%;
  height: 100%;
  z-index: 99;
  position: absolute;
  left: 0;
  top: 0;
  height: 300px;
}
.btn-rprimary {
  position: relative;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  color: #ffffff;
  font-size: 16px;
  background-color: #0069ff;
  font-weight: 700;
  padding: 8px 30px;
  border: 2px solid #0069ff;
  line-height: 30px;
  font-weight: 500;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}

.btn-rprimary:hover {
  color: #0069ff;
  background-color: transparent;
}

.btn-style-one {
  background-color: #ff3c00;
  border: 2px solid #ff3c00;
  border-radius: 4px;
}

.btn-style-one {
  position: relative;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  color: #ffffff;
  font-size: 16px;
  border-radius: 5px;
  font-weight: 700;
  padding: 8px 30px;
  line-height: 30px;
}

.btn-style-two {
  position: relative;
  display: inline-block;
  text-align: center;
  white-space: nowrap;
  color: #ffffff;
  font-size: 14px;
  border-radius: 5px;
  background-color: #0069ff;
  font-weight: 700;
  padding: 8px 30px;
  border: 2px solid #0069ff;
  line-height: 30px;
}

.btn-primary.disabled,
.btn-primary:disabled {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
}

.btn-style-two {
  background-color: #0069ff;
  border: 2px solid #0069ff;
}

.btn.disabled,
.btn:disabled {
  opacity: 0.65;
}

.active {
  background-color: #0069ff !important;
  color: white !important;
}

ul {
  padding: 0;
}

li {
  list-style: none;
}

.summary-title {
  font-size: 20px;
  font-weight: 500;
}
</style>
