import { ref} from 'vue'
import { defineStore } from 'pinia'
import instance from '../utils/axiosInstance';

export const useServiceStore = defineStore('serviceStore', () => {
    const services = ref([]);
    const subdomain = ref(null)
    
    const extractSubdomain = () => {
        if(import.meta.env.MODE == 'development'){
        subdomain.value = "panel";
        }else{
        let url = window.location.hostname;
        let domain = url;
        if (url.includes("://")) {
            domain = url.split('://')[1];
        }
        subdomain.value = domain.split('.')[0];
        }
    }


    const fetchServiceData = async () => {
        extractSubdomain()
        
        try {
            const response = await instance.post(`${subdomain.value}/services`)
            services.value = response.data

        }

        catch (error) {
            console.error(error)
        }
    }

    return {
        services,
        fetchServiceData
    }
})