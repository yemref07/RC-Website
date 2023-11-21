import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '../utils/axiosInstance';

export const useContactStore = defineStore('contactStore', () => {
    const isSend = ref(false);
    const errorMsg = ref('');
    const errorMsg2 = ref('');
    const subdomain = ref(null)

    const extractSubdomain = () => {
      if(import.meta.env.MODE == 'development'){
        subdomain.value = "sinan";
      }else{
        let url = window.location.hostname;
        let domain = url;
        if (url.includes("://")) {
            domain = url.split('://')[1];
        }
        subdomain.value = domain.split('.')[0];
      }
    }

    const sendData = async (payload) => {
        extractSubdomain()
        const msg = {
          phone:payload.phone,
          name:payload.nameSurname,
          message:payload.comment,
        } 
        try {
          const response = await instance.post(`/${subdomain.value}/newmessage`, msg)
          if (response.status === 200 || response.status === 201 || response.status === 204) {
            isSend.value = true
          }
        } catch (error) {
          errorMsg.value = 'Mesaj Gönderilirken Bir Hata Oluştu'
          errorMsg2.value = 'İletişim Formu Gönderilirken Bir Hata Oluştu'
          console.error('Error:', error)
          isSend.value = false
        } finally {
          // Hide loading state, regardless of success or error
        }
    }

    return {
        isSend,
        errorMsg,
        errorMsg2,
        sendData
    }
})