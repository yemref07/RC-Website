/* eslint-disable no-unused-vars */
import { ref, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import axios from 'axios'

export const useThemeStore = defineStore('themeStore', () => {
  const data = ref(null)
  const theme = ref(null)
  const subdomain = ref(null)

  const watchData = watch(data, (newValue, oldValue) => {
    theme.value = newValue.web_theme
    console.log('newValue', newValue.title, 'theme', theme.value)
  })

  const extractSubdomain = () => {
    const hostname = 'princess-guzellik-bakirkoy.rapp.com.tr/web'
    // const hostname = window.location.hostname;

    const parts = hostname.split('.')
    if (parts.length > 2) {
      subdomain.value = parts[0]
    } else {
      console.error('no subdomain is found')
    }
  }

  const instance = axios.create({
    baseURL: 'https://api.rapp.com.tr/web/',
    timeout: 5000,
    headers: {
      'Content-Type': 'application/json'
    }
  })

  const fetchData = async () => {
    extractSubdomain()
    try {
      const response = await instance.post(`${subdomain.value}`, instance)
      data.value = response.data
      theme.value = response.data.web_theme
      console.log(data.value, 'api response')
    } catch (error) {
      console.error(error)
    }
  }

  return {
    theme,
    fetchData,
    extractSubdomain,
    watchData,
    data
  }
})
