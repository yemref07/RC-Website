<template>
  <router-link to="randevu-al" v-if="appType" title="Hemen Randevu Al">
    <h2 class="bg-light-green text-light py-3 px-4 text-center verify mb-5 section-title">
      {{ $t('buttons.getAppNow') }}
    </h2>
  </router-link>

  <h2 class="bg-light-green text-light py-3 px-4 text-center verify mb-5 section-title"  
  v-else @click="toggleFastAppModal">
    {{ $t('buttons.getAppNow') }}
  </h2>

  <div class="card-content">
    <span class="d-inline-block profile-title mb-2">
      {{ title }}
    </span>

    <div class="d-flex flex-row mt-3 flex-wrap gap-2">

<!--       
      <router-link to="/randevu-al" class="btn btn-outline-primary btn-contact" v-if="appType" title="Randevu Al">
        <Icon icon="teenyicons:appointments-outline" width="20" height="20" color="" class="me-1" />
        {{ $t('buttons.getApp') }}
      </router-link>

      <button class="btn btn-outline-primary btn-contact" @click="toggleFastAppModal" title="Randevu Al"  v-else >
        <Icon icon="teenyicons:appointments-outline" width="20" height="20" color="" class="me-1" />
        {{ $t('buttons.getFastApp') }}
      </button> -->


      <button type="button" class="btn btn-outline-primary btn-contact flex-grow-1" @click="openMsgModal" title="Mesaj Gönder">
        <Icon icon="uil:message" width="20" height="20" color="" class="me-1" />
        {{ $t('buttons.sendMessage') }}
      </button>

      <a title="WhatsApp" type="button" class="btn btn-outline-primary btn-contact flex-grow-1" @click="sendWpMessage">
        <Icon icon="ic:baseline-whatsapp" width="20" height="20" color="" class="me-1" />
        {{ $t('whatsApp') }}
      </a>
    </div>

    <ul class="mt-4 contact-links">
      <li>
        <a :href="`tel:${info.phone}`" class="contact-link" :title="info.phone">
          <Icon icon="bi:phone-fill" width="24" height="24" class="me-1 text-rblue" />
          {{ info.phone }}
        </a>
      </li>

      <li>
        <a :href="`tel:${info.wp}`" class="contact-link" :title="info.wp">
          <Icon icon="mingcute:phone-fill" width="24" height="24" class="me-1 text-rblue" />
          {{ info.wp }}
        </a>
      </li>

      <li>
        <a :href="`mailto:${info.email}`" class="contact-link" :title="info.email">
          <Icon icon="ic:round-mail" width="24" height="24" class="me-1 text-rblue" />
          {{ info.email }}
        </a>
      </li>

      <li>
        <a href="#" class="contact-link" :title="info.address">
          <Icon icon="iconamoon:location-fill" width="24" height="24" class="me-1 text-rblue" />
          {{ info.address }}
        </a>
      </li>
    </ul>

    <button
      type="button"
      class="btn btn-outline-primary btn-contact w-100 mt-3"
      @click="shareLocModal = true"
    >
      <Icon icon="solar:share-linear" width="20" height="20" color="" class="me-1" />
      {{ $t('buttons.shareLoc') }}
    </button>

    <div class="d-flex flex-row mt-4 justify-content-center">
      <a :href="info.facebook" title="facebook">
        <Icon icon="ri:facebook-fill" width="34" height="34" class="social-icon" />
      </a>
      <a :href="info.instagram" title="instagram">
        <Icon icon="bi:instagram" width="34" height="34" class="social-icon"
      /></a>
      <a :href="info.twitter" title="twitter">
        <Icon icon="pajamas:twitter" width="34" height="34" class="social-icon" />
      </a>
      <a :href="info.linkedin" title="linkedin">
        <Icon icon="ri:linkedin-fill" width="34" height="34" class="social-icon" />
      </a>
      <a :href="info.youtube" title="youtube">
        <Icon icon="iconoir:youtube" width="34" height="34" color="red" class="social-icon" />
      </a>

      <a :href="info.website" title="website">
        <Icon icon="tabler:world-www" width="34" height="34" color="black" class="social-icon" />
      </a>
    </div>
  </div>

  <el-dialog v-model="shareLocModal" align-center center class="modal-width" >
    <span class="loc-modal-title"> {{ $t('buttons.shareLoc') }}</span>
    <template #footer>
      <span class="dialog-footer">
        <input
          v-model="phone"
          type="tel"
          :placeholder=" $t('mapSection.sharelocPhone')"
          class="form-control py-3 mb-3"
        />
        <button
          class="btn btn-primary w-100 text-center"
          type="primary"
          @click="shareLocation(phone)"
        >
          {{ $t('mapSection.share') }}
        </button>
      </span>
    </template>
  </el-dialog>

  <el-dialog v-model="messageModal" align-center center class="modal-width">
    <span class="loc-modal-title">{{ $t('buttons.sendMessage') }}</span>
    <template #footer>
      <span class="dialog-footer">
        <div class="row">
          <div class="col-md-6">
            <input
              v-model="message.nameSurname"
              type="text"
              :placeholder="$t('nameSurname')"
              class="form-control py-3 mb-3"
            />
          </div>

          <div class="col-md-6">
            <input
              v-model="message.phone"
              type="tel"
              :placeholder="$t('phone')"
              class="form-control py-3 mb-3"
            />
          </div>

          <div class="col-md-12">
            <input
              v-model="message.comment"
              type="text"
              :placeholder="$t('message')"
              class="form-control py-3 mb-3"
            />
          </div>
        </div>
        <button class="btn btn-primary w-100 text-center" type="primary" @click="sendMessage">
          {{ $t('send') }}
        </button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { ref, reactive, watchEffect } from 'vue'
import { useContactStore } from '../../../stores/contact'
import { storeToRefs } from 'pinia'
import { h } from 'vue'
import { ElNotification, ElMessage } from 'element-plus'
import { useAppointmentStore } from '../../../stores/appointment'
import {useI18n} from 'vue-i18n'

const {t:$t} = useI18n()

const appStore = useAppointmentStore()
const {toggleFastAppModal} = appStore

const contactStore = useContactStore()
const { isSend, errorMsg } = storeToRefs(contactStore)
const { sendData } = contactStore
const isValid = ref(false)

const props = defineProps({
  info: Object,
  title: String,
  lat: String,
  lng: String,
  appType:String
})
const phone = ref('')
const shareLocModal = ref(false)
const messageModal = ref(false)
const message = reactive({
  nameSurname: '',
  phone: '',
  comment: ''
})

const shareLocation = (phone) => {
  let maps = `${props.info.title} ${props.info.phone} ${props.info.address} https://maps.google.com/maps?q=${props.lat},${props.lng}`

  window.open(
    `https://api.whatsapp.com/send/?phone="+${phone}+"&text="+${maps}+"&app_absent=0`,
    '_blank'
  )
}

const openMsgModal = () => {
  messageModal.value = true
}

const sendWpMessage = () => {
  window.open(`https://wa.me/${props.info.wp}`, '_blank')
}

const showError = (param) => {
  ElMessage({
    showClose: true,
    message: param,
    type: 'error'
  })
}

const showSuccess = () => {
  ElNotification({
    title: 'Mesajınız',
    type: 'success',
    message: h('i', { style: 'color: success' }, $t('profileInfo.success1'))
  })
}

watchEffect(() => {
  const message = errorMsg.value

  if (message !== '') {
    showError(errorMsg.value)
  }
})

watchEffect(() => {
  if (isSend.value) {
    showSuccess()
  }
})

const checkValidation = () => {
  isValid.value = false
  if (message.nameSurname !== '' && message.phone !== '' && message.comment !== '') {
    isValid.value = true
  } else {
    isValid.value = false
    showError( $t('profileInfo.error1'))
  }
}

const sendMessage = async (e) => {
  e.preventDefault()

  checkValidation()
  if (isValid.value) {
    await sendData(message)
    message.nameSurname = ''
    message.phone = ''
    message.comment = ''
  }
  isSend.value = false
}
</script>

<style scoped>

.profile-title{
  font-size: 22px;
  font-weight: 500;
}

.verify {
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
}

.card-content {
  transition:
    box-shadow 0.25s linear,
    -webkit-box-shadow 0.25s linear;
  box-shadow: 0 10px 20px rgba(1, 14, 40, 0.1);
  background-color: #fff;
  padding: 20px;
}

.contact-links li {
  margin-bottom: 0.9rem;
}

.contact-link {
  color: black;
  font-weight: 400;
  font-size: 16px;
}
.contact-link:hover {
  color: var(--rblue);
}

.social-icon {
  margin-left: 10px;
  margin-right: 10px;
  color: #031b4e79!important;
}

ul li {
  list-style: none;
}
a {
  text-decoration: none;
}
ul {
  padding: 0;
}

.loc-modal-title {
  position: relative;
  display: block;
  font-size: 20px;
  color: #031b4e;
  font-weight: 700;
  line-height: 1.2em;
  text-align: center;
}
</style>
