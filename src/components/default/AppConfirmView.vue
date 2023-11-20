<template>
  <div class="container mt-150">
    <div class="row">
      <div class="col-sm-12 text-center py-5">
        <h2>{{ $t('appConfirm.title') }}</h2>
      </div>
      <div class="col-md-6">
        <div class="card-content">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col"></th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">{{ $t('appConfirm.services') }}</th>
                  <td v-for="(item, index) in appInfo.services" :key="index">
                    {{ searchCatName(item) }}
                  </td>
                </tr>
                <tr>
                  <th scope="row">Uzman</th>
                  <td>{{appInfo.specialist?.name}}</td>
                </tr>
                <tr>
                  <th scope="row">Tarih</th>
                  <td colspan="2">{{ dateText() }} - {{ appInfo.hour }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="mt-4 info-card">
            <span>{{ appInfo.phone }}</span> {{ $t('appConfirm.phoneText') }}
          </div>

          <div class="d-flex flex-column justify-content-center align-content-center mt-4">
            <label for="" class="form-label">{{ $t('appConfirm.appConfirmCode') }}</label>
            <input type="text" class="form-control py-2" v-model.trim="appInfo.smsverify" maxlength="6" minlength="6" />

            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" v-model="contractApprove.c1" checked/>
              <label class="form-check-label"
                >{{ $t('appConfirm.contract1') }}</label
              >
            </div>

            <div class="form-check mt-3">
              <input class="form-check-input" type="checkbox" v-model="contractApprove.c2" checked/>
              <label class="form-check-label"
                >{{ $t('appConfirm.contract2') }}</label
              >
            </div>

            <button class="btn btn-primary mt-4 py-2" @click="createApp">{{ $t('appConfirm.createApp') }}</button>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card-content">
          <h3 class="appointment-title">{{ $t('appConfirm.appSummary') }}</h3>

          <ul>
            <li>
              <span class="summary-title">{{ $t('appConfirm.services') }}</span>
              <ul>
                <li v-for="(item, index) in appInfo.services" :key="index">
                  {{ searchCatName(item) }}
                </li>
              </ul>
            </li>
          </ul>

          <ul>
            <li>
              <span class="summary-title">{{ $t('appConfirm.specialist') }}</span>
            </li>

            <li>
              <span class="">{{appInfo.specialist?.name}}</span>
            </li>
          </ul>

          <ul>
            <li>
              <span class="summary-title">{{ $t('appConfirm.dateHour') }}</span>
            </li>

            <li>
              <span class="">{{ dateText() }} - {{ appInfo.hour }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, reactive, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import '@vuepic/vue-datepicker/dist/main.css'
import { useAppointmentStore } from '../../stores/appointment'
import { useServiceStore } from '../../stores/service'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
import {useI18n} from 'vue-i18n'

const {t:$t} = useI18n()

const router = useRouter()
const appStore = useAppointmentStore()
const { sendAppData} =  appStore
const { errorMsg, createAppStatus } = storeToRefs( appStore)

const serviceStore = useServiceStore()
const {fetchServiceData} = serviceStore
const {services} = storeToRefs(serviceStore)

const appInfo = ref('')
const contractApprove = reactive({
  c1: true,
  c2: true
})

const isAppointmentCreated = computed(() => {
  if (createAppStatus.value) {
    return createAppStatus.value
  } else {
    return false
  }
})

const allServicesList = computed(() => {
  if (services.value) {
    return services.value.services
  } else {
    return []
  }
})

const dateText = () => {
  const isoString = appInfo.value.date
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') // Add 1 to the month because months are zero-based
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

const searchCatName = (param) => {
  return allServicesList.value.filter((e) => {
    return e.id == param
  })[0].name
}

onMounted(async () => {
  await fetchServiceData()
  const getAppInfo = localStorage.getItem('appInfo')
  if (getAppInfo) {
    const parsedData = JSON.parse(getAppInfo)
    appInfo.value = parsedData
  }
})

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
   confirmButtonText: $t('ok')
  })
}

watchEffect(() => {
  if (errorMsg.value !== '') {
    showError(errorMsg.value)
  }
})

const preciseDate = (date, hour) => {
  const appDate = new Date()
  let hourParts = hour.split(':')
  appDate.setHours(hourParts[0])
  appDate.setMinutes(hourParts[1])
  appDate.setSeconds(0)
  appDate.setMilliseconds(0)
  const isoAppDate = new Date(
    appDate.getUTCFullYear(),
    appDate.getUTCMonth(),
    appDate.getUTCDate(),
    appDate.getUTCHours(),
    appDate.getUTCMinutes()
  ).toISOString()

  return isoAppDate
}

const checkValidation = () => {
  if (contractApprove.c1 && contractApprove.c2) {
    return true
  } 

  if(!contractApprove.c1 && !contractApprove.c2) {
    showError($t('appConfirm.error1'))
    return false
  }

  if(!appInfo.value.smsverify){
    showError($t('appConfirm.error2'))
  }
}

const createApp = async () => {
  if (checkValidation()) {
    await sendAppData({
      user_id: appInfo.value.specialist.id,
      start_time: preciseDate(appInfo.value.date, appInfo.value.hour),
      customer_id: appInfo.value.customer_id,
      sms_verify: appInfo.value.smsverify,
      name: appInfo.value.name,
      surname: appInfo.value.surname,
      phone: appInfo.value.phone,
      appointment_services: appInfo.value.serviceNames,
      services: appInfo.value.services
    })
    if (isAppointmentCreated.value) {
      showSuccess($t('appConfirm.success1'))
      router.push({
        name: 'randevuDetay'
      })
    }
  }
}
</script>

<style scoped>
.appointment-title {
  font-size: 24px;
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

.table {
  border: transparent;

}

.table td{
  text-align: ;
}
.info-card {
  background-color: #cce5ff;
  color: #43639b;
  padding: 20px 40px;
}
</style>
