import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '../utils/axiosInstance';


export const useReviewStore = defineStore('reviewsStore', () => {
    const reviews = ref([]);
    const isSend = ref(false);
    const errorMsg = ref("");
    const subdomain = ref(null)

    const extractSubdomain = () => {
        if(import.meta.env.MODE == 'development'){
          subdomain.value = "panel";
        //   subdomain.value = "sinan";
        }else{
          let url = window.location.hostname;
          let domain = url;
          if (url.includes("://")) {
              domain = url.split('://')[1];
          }
          subdomain.value = domain.split('.')[0];
        }
      }

    const fetchReviews = async () => {
        extractSubdomain()
        try {
            const response = await instance.post(`${subdomain.value}/reviews`)
            reviews.value = response.data.reviews;
        }
        catch (error) {
            console.error(error)
        }
    }

    const sendReview = async (payload) => {
        const msg = {
            phone: payload.phone,
            name: payload.nameSurname,
            star: payload.rate,
            message: payload.comment,
        }
        extractSubdomain()
        try {
            const response = await instance.post(`${subdomain.value}/newreview`, msg)
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                isSend.value = true;
            }

        }

        catch (error) {
            errorMsg.value = 'Yorum Gönderilirken Bir Hata Oluştu'
            console.error('Error:', error);
            isSend.value = false;
        }

        finally {
            // Hide loading state, regardless of success or error
        }
    }

    return {
        sendReview,
        reviews,
        isSend,
        errorMsg,
        fetchReviews
    }
})