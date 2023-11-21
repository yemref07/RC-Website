/* eslint-disable no-unused-vars */
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'
import { useRouter } from 'vue-router'
import  instance  from '../utils/axiosInstance'

export const useThemeStore = defineStore('themeStore', () => {
  const router = useRouter()
  const data = ref(null)
  const theme = ref(null)
  const subdomain = ref(null)
  const title = ref(null)
  const errorMsg = ref('');

  

  const watchData = watch(data, (newValue, oldValue) => {
    theme.value = newValue.web_theme
  })
  

  const extractSubdomain = () => {
    if(import.meta.env.MODE == 'development'){
      subdomain.value = "panel";
    }
    // https://panel.rapp.com.tr/s/
    else{
      let url = window.location.hostname;
      let domain = url;
      if (url.includes("://")) {
          domain = url.split('://')[1];
      }
      subdomain.value = domain.split('.')[0];
    }
  }


  const fetchData = async () => {
    extractSubdomain()
    try {
      const response = await instance.post(`${subdomain.value}/home`, instance)
      data.value = response.data
      theme.value = response.data.web_theme
      title.value = response.data.title
    } 
    catch (error) {
      errorMsg.value = error.response.data.message
      router.push({ path: '/404' })
      
      if(error.response.status === 500){
        router.push({ path: '/404' })
        errorMsg.value = "Firma Bulunamadı" 
      }

      if(error.response.status === 404){
        router.push({ path: '/404' })
        errorMsg.value = "Firma Bulunamadı" 
      }
    }
  }


  return {
    theme,
    fetchData,
    extractSubdomain,
    watchData,
    data,
    errorMsg,
    title
  }
})
