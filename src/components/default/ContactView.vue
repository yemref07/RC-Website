<template>
  <pageHeader :title="$t('contact.title')" :subTitle="contactInfo.companyName" />
  <div class="container mt-150">
    <div class="row">
      <div class="col-md-6 col-lg-7">
        <div class="contact-title p-3">
          <h3>
            <Icon
              icon="teenyicons:contact-outline"
              width="30"
              height="30"
              class="me-2 text-rblue"
            />
            {{ $t('contact.section1') }}
          </h3>
        </div>
        <div class="card-content">
          <iframe
            title = "Harita"
            class="rounded"
            :src="location"
            width="100%"
            height="350"
            style="border: 0"
            frameborder="0"
            allowfullscreen=""
            loading="lazy"
          ></iframe>
          <ul class="contact-info mt-3" v-if="contactInfo">
            <li>
              <a href="https://faq.whatsapp.com/5913398998672934/?helpref=uf_share"></a>
              <a :href="`tel:${contactInfo.wp}`">
                <Icon
                  icon="akar-icons:whatsapp-fill"
                  width="25"
                  height="25"
                  class="align-middle me-2"
                />
                {{ contactInfo.wp }}
              </a>
            </li>

            <li>
              <a :href="`tel:${contactInfo.phone}`">
                <Icon icon="bi:phone" width="25" height="25" class="align-middle me-2" />
                {{ contactInfo.phone }}
              </a>
            </li>

            <li>
              <Icon icon="ion:location-outline" width="25" height="25" class="align-middle me-2" />
              {{ contactInfo.address }}
            </li>
            <li>
              <a :href="`mailto:${contactInfo.email}`">
                <Icon icon="bi:envelope" width="25" height="25" class="align-middle me-2" />
                {{ contactInfo.email }}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="col-md-6 col-lg-5">
        <div class="contact-title p-3">
          <h3>
            <Icon icon="solar:phone-linear" width="30" height="30" class="me-2 text-rblue" />
            {{ $t('contact.section2') }}
          </h3>
        </div>
        <form class="card-content">
          <div class="row">
            <div class="col-12 col-lg-6 mt-3">
              <label for="nameSurname" class="form-label">{{$t('nameSurname')}}</label>
              <input
                type="text"
                class="form-control p-2"
                :placeholder="$t('nameSurname')"
                v-model="message.nameSurname"
                required
              />
            </div>

            <div class="col-12 col-lg-6 mt-3">
              <label for="nameSurname" class="form-label">{{$t('phone')}}</label>
              <input
                v-model="message.phone"
                type="text"
                class="form-control p-2"
                :placeholder="$t('phone')"
                required
              />
            </div>

            <div class="col-12 mt-4">
              <label for="exampleFormControlTextarea1" class="form-label">{{$t('message')}}</label>
              <textarea
                class="form-control"
                id="exampleFormControlTextarea1"
                rows="5"
                v-model="message.comment"
                required
              ></textarea>
            </div>

            <div class="col-12 mt-4">
              <button type="submit" @click="sendForm" class="btn btn-primary px-5 py-2">
                {{$t('send')}}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Icon } from '@iconify/vue'
import { useThemeStore } from '../../stores/themeInfo'
import { storeToRefs } from 'pinia'
import { computed, reactive, ref, watchEffect } from 'vue'
import { useContactStore } from '../../stores/contact'
import pageHeader from './components/pageHeader.vue'
import Swal from 'sweetalert2'
import {useI18n} from 'vue-i18n'

const {t:$t} = useI18n()

const contactStore = useContactStore();
const {errorMsg2,isSend} = storeToRefs( contactStore);
const {sendData} = contactStore

const store = useThemeStore()
const { data } = storeToRefs(store)

const isValid = ref(false)

const message = reactive({
  nameSurname: '',
  phone: '',
  comment: ''
})

const lat = computed(() => {
  if (data.value) {
    return data.value.map_lat
  } else {
    return null
  }
})

const lng = computed(() => {
  if (data.value) {
    return data.value.map_lng
  } else {
    return null
  }
})

const contactInfo = computed(() => {
  if (data.value) {
    return {
      companyName:data.value.title,
      phone: data.value.phone,
      wp: data.value.whatsapp,
      email: data.value.email,
      address: data.value.address
    }
  } else {
    return null
  }
})

const location = computed(() => {
  return ` https://maps.google.com/maps?q=${lat.value},${lng.value}&t=&z=15&ie=UTF8&iwloc=&output=embed`
})


const showError = (param) => {
    Swal.fire({
    title: $t('error'),
    text: param,
    icon: 'error',
    confirmButtonText: $t('ok'),
    customClass:{
      popup:"index-99"
    }
  })

}

const showSuccess = () => {
    Swal.fire({
    title: $t('success'),
    text: $t('contact.success1'),
    icon: 'success',
   confirmButtonText: $t('ok')
  })


}

watchEffect(() => {
  const message = errorMsg2.value
  if (message !== '') {
    showError(errorMsg2.value)
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
    showError( $t('contact.error1') )
  }
}

const sendForm = async (e) => {
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
.contact-title h3 {
  font-size: 18px;
}
.contact-title {
  -webkit-box-shadow: 0px 0px 18px 0px rgba(82, 63, 105, 0.07) !important;
  box-shadow: 0px 0px 18px 0px rgba(82, 63, 105, 0.07) !important;
}

ul {
  padding: 0;
}
li {
  list-style: none;
}

.contact-info li {
  margin-bottom: 12px;
}

.contact-info a {
  text-decoration: none;
  color: black;
}

.contact-info a:hover {
  color: var(--rblue);
}
</style>
