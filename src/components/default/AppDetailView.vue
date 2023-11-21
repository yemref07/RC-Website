<template>
  <div class="container mt-150">
    <div class="row">
      <div class="col-sm-12 text-center py-5">
        <h2>{{$t('appDetail.title')}}</h2>
      </div>

      <div
        class="col-sm-12 col-md-8 mx-auto"
        ref="contentToPrint"
        style="
          margin-right: auto !important;
          margin-left: auto !important
          flex: 0 0 auto;
        "
      >
        <div
          style="
            border-left: 10px solid var(--rblue);
            padding: 3rem !important;
            position: relative;
            z-index: 2;
            transition:
              box-shadow 0.25s linear,
              -webkit-box-shadow 0.25s linear;
            box-shadow: 0 10px 20px rgba(1, 14, 40, 0.1);
            background-color: #fff;
          "
        >
          <div class="">
            <h3 style="font-size: 28px">Randevu Bilgileri</h3>

            <img
              src="/images/randevucenter.png"
              alt=""
              width="400"
              style="
                max-width: 100%;
                height: auto;
                position: absolute;
                top: 50%;
                right: 50%;
                transform: translate(50%, -50%);
                z-index: 1;
                opacity: 0.3;
                filter: grayscale(0.5);
              "
            />

            <ul style="margin-top: 2rem; padding: 0">
              <li style="list-style: none">
                <span style="font-size: 24px; font-weight: 500; color: var(--rblack)"
                  >{{$t('appDetail.services')}}</span
                >
                <ul style="padding: 0">
                  <li
                    v-for="(item, index) in appInfo.services"
                    :key="index"
                    style="list-style: none"
                  >
                    {{ searchCatName(item) }}
                  </li>
                </ul>
              </li>
            </ul>

            <ul style="margin-top: 2rem; padding: 0">
              <li style="list-style: none">
                <span style="font-size: 24px; font-weight: 500; color: var(--rblack)">{{$t('appDetail.specialist')}}</span>
              </li>

              <li style="list-style: none">
                <span class="">{{ appInfo.specialist?.name }}</span>
              </li>
            </ul>

            <ul style="margin-top: 2rem; padding: 0">
              <li style="list-style: none">
                <span style="font-size: 24px; font-weight: 500; color: var(--rblack)"
                  >{{$t('appDetail.dateHour')}}</span
                >
              </li>

              <li style="list-style: none">
                <span class="">{{ dateText() }} - {{ appInfo.hour }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="container mt-3">
    <div class="row">
      <div class="col-sm-12 col-md-8 mx-auto text-center">
        <div class="row gap-2 flex-md-nowrap">

          <div class="col-md-6">
            <button class="btn btn-primary py-2 px-5 w-75" @click="printAppSummary">{{$t('appDetail.print')}}</button>
          </div>

          <div class="col-md-6">
            <button class="btn btn-primary py-2 px-5 w-75" @click="generatePDF">{{$t('appDetail.pdf')}}</button>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import '@vuepic/vue-datepicker/dist/main.css'

import { useServiceStore } from '../../stores/service'

const serviceStore = useServiceStore()
const {fetchServiceData} = serviceStore;
const { services } = storeToRefs(serviceStore)

const contentToPrint = ref(null)


const appInfo = ref('')

const allServicesList = computed(() => {
  if (services.value.services) {
    return services.value.services
  } else {
    return []
  }
})

const dateText = () => {
  const isoString = appInfo.value.date
  const date = new Date(isoString)

  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0') 
  // Add 1 to the month because months are zero-based
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

const printAppSummary = () => {

  if (contentToPrint.value) {
    const printWindow = window.open('', '', 'width=600,height=600')
    if (!printWindow) {
      console.error('Yazdırma penceresi açılamadı')
      return
    }

    printWindow.document.open()
    printWindow.document.write(`
      <html>
        <head>
          <link rel="stylesheet" type="text/css" href="/css/print.css" media="print">
          <title>Randevu Center</title>
        </head>
        <body>
          ${contentToPrint.value.innerHTML}
        </body>
      </html>
    `)
    printWindow.document.close()
    printWindow.onload = () => {
      printWindow.print()
      printWindow.onafterprint = () => {
        printWindow.close()
      }
    }
  }
}

import * as html2pdf from 'html2pdf.js';

const generatePDF = async () => {
  const element = contentToPrint.value 

  const pdfOptions = {
    margin: 10,
    filename: 'randevu-bilgileri.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  try {
    const pdf = await html2pdf().from(element).set(pdfOptions).outputPdf().save()
  } 
  catch (error) {
    console.error('PDF generation error:', error)
  }
}
</script>

<style scoped>
.appointment-title {
  font-size: 28px;
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
  font-size: 24px;
  font-weight: 500;
  color: var(--rblack);
}

.card-content {
  border-left: 10px solid var(--rblue);
  position: relative;
  z-index: 2;
}

.bg-logo {
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(50%, -50%);
  z-index: 1;
  opacity: 0.3;
  filter: grayscale(0.5);
}
</style>
