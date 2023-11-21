<template>
  <div class="d-flex flex-row justify-content-between bg-white p- 2">
    <div class="">
      <h2 class="section-title">
        <Icon
          icon="uil:comment-edit"
          width="34"
          height="34"
          color=""
          class="social-icon text-rblue"
        />
        {{ title }} - {{ $t('sections.makeReview') }}
      </h2>
    </div>
  </div>
  <div class="card-content">
    <form>
      <div class="row">
        <div class="col-12 mb-4">
          <p class="stars-title">{{ $t('customerReview.rating') }}</p>
          <el-rate v-model="message.rate" :colors="colors" size="large" />
        </div>

        <div class="col-12 col-sm-6 mt-3">
          <label for="nameSurname" class="form-label">{{ $t('customerReview.nameSurname') }}</label>
          <input
            type="text"
            class="form-control p-2"
            :placeholder="$t('customerReview.nameSurname')"
            v-model="message.nameSurname"
            required
          />
        </div>

        <div class="col-12 col-sm-6 mt-3">
          <label for="nameSurname" class="form-label">{{ $t('customerReview.phone') }}</label>
          <input
            v-model="message.phone"
            type="text"
            class="form-control p-2"
            :placeholder="$t('customerReview.phone')"
            required
          />
        </div>

        <div class="col-12 mt-4">
          <label for="exampleFormControlTextarea1" class="form-label">{{
            $t('customerReview.comment')
          }}</label>
          <textarea
            class="form-control"
            id="exampleFormControlTextarea1"
            rows="5"
            v-model="message.comment"
            required
          ></textarea>
        </div>

        <div class="col-12 mt-4">
          <button type="submit" @click="sendData" class="btn btn-primary px-5 py-2">
            {{ $t('customerReview.send') }}
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive, watchEffect, computed } from 'vue'
import { useThemeStore } from '../../../stores/themeInfo'
import { useReviewStore } from '../../../stores/reviews'
import { storeToRefs } from 'pinia'
import Swal from 'sweetalert2'
import {useI18n} from 'vue-i18n'

const {t:$t} = useI18n()

const reviewStore = useReviewStore()
const themeStore = useThemeStore()
const { data } = storeToRefs(themeStore)
const { errorMsg, isSend } = storeToRefs(reviewStore)
const { sendReview } = reviewStore

const isValid = ref(false)

const message = reactive({
  nameSurname: '',
  phone: '',
  comment: '',
  rate: ''
})

const title = computed(() => {
  if (data.value) {
    return data.value.title
  } else {
    return ''
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

const showSuccess = () => {
  Swal.fire({
    title: $t('success'),
    text: $t('sendComment.success1'),
    icon: 'success',
   confirmButtonText: $t('ok')
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

const sendData = async (e) => {
  e.preventDefault()
  checkValidation()
  if (isValid.value) {
    await sendReview(message)
    message.nameSurname = ''
    message.phone = ''
    message.comment = ''
    message.rate = ''
  }
  isSend.value = false
}

const checkValidation = () => {
  isValid.value = false
  if (
    message.nameSurname !== '' &&
    message.phone !== '' &&
    message.comment !== '' &&
    message.rate !== ''
  ) {
    isValid.value = true
  } else {
    isValid.value = false
    showError($t('sendComment.error1'))
  }
}

const colors = ref(['#99A9BF', '#F7BA2A', '#FF9900'])
</script>

<style>
.el-rate .el-rate__icon {
  font-size: 34px !important;
}

.stars-title{
  font-size: 18px;
  font-weight: 600;
}
</style>
