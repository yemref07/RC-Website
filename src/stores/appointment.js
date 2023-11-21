import { ref } from 'vue'
import { defineStore } from 'pinia'
import instance from '../utils/axiosInstance';

export const useAppointmentStore = defineStore('appStore', () => {
    const data = ref('');
    const subdomain = ref(null)
    const filledHours = ref([]);
    const verifyStatus = ref(false);
    const errorMsg = ref('');
    const customerAllInfo = ref({});
    const createAppStatus = ref(false);
    const createFastAppStat = ref(false)
    const isVisibleFastAppMdl = ref(false)
    const requestedService  = ref('');
    const pendingHours = ref(false)

    const setRequestedService = (param) => {
        requestedService.value = param
    }

    const setFalseFastAppStat = ()=>{
        createFastAppStat.value = false
    }

    const toggleFastAppModal = () =>{
        isVisibleFastAppMdl.value = !isVisibleFastAppMdl.value
    }

    const closeFastAppModal = ()=>{
        isVisibleFastAppMdl.value = false
    }

    const extractSubdomain = () => {
      if(import.meta.env.MODE == 'development'){
        subdomain.value = "panel";
        // subdomain.value = "sinan";
      }else{
        let url = window.location.hostname;
        let domain = url;
        if (url.includes("://")) {
            domain = url.split('://')[1];
        }
        subdomain.value = domain.split('.')[0];
      }
    }



    const sendAppData = async (payload) => {
        extractSubdomain()
        try {
            const response = await instance.post(`${subdomain.value}/createappointment`, payload)
            data.value = response.data
            createAppStatus.value = response.data.isonline
        }

        catch (error) {
            console.error(error)
            errorMsg.value='Randevu Oluşturulurken bir hata oluştu'
        }
    }

    const getFastApp = async (payload) => {
        extractSubdomain()
        try {
            const response = await instance.post(`${subdomain.value}/newappointment`, payload)
            data.value = response.data
            if(response.data.appointment_no){
                createFastAppStat.value = true
            }
            else{
                createFastAppStat.value = false
            }
        }

        catch (error) {
            console.error(error)
            errorMsg.value='Randevu Oluşturulurken bir hata oluştu'
            createFastAppStat.value = false
        }
    }

    const fetchFilledHours = async (payload) => {
        const msg = {
            user_id:payload.employees,
            date_at:payload.date,
        }
        pendingHours.value = true

        extractSubdomain()
        try {
            const response = await instance.post(`${subdomain.value}/getemployeetimes`, msg)
            data.value = response.data

            filledHours.value = response.data
        }

        catch (error) {
            console.error(error)
            errorMsg.value = "Bir Hata Oluştu"
        }

        finally{
            pendingHours.value = false
        }
    }
    
    const fetchVerifyCode = async (payload) => {
        const msg = {
            phone:payload,
        }

        try{
            const response = await instance.post(`${subdomain.value}/sendsms`, msg);
            verifyStatus.value = response.data.status
        }
        catch(error){
            console.error(error);
            errorMsg.value = "Bir hata oluştu lütfen daha sonra tekrar deneyin"
        }
    }
    
    const checkCustomer = async (payload)=>{
        const msg = {
            phone:payload
        }
        try{
            const response = await instance.post(`${subdomain.value}/getcustomer`, msg);
            customerAllInfo.value = response.data
        }
        
        catch(error){
            if(error.response.data.message ==='Müşteri bulunamadı'){
                // errorMsg.value = 'Hoşgeldiniz'
            }else{
                 errorMsg.value = 'Bir hata oluştu lütfen daha sonra tekrar deneyin';
                 console.error(error.response.data.message );
            }
        }
    }


    return {
        fetchFilledHours,
        fetchVerifyCode,
        sendAppData,
        checkCustomer,
        data,
        filledHours,
        errorMsg,
        customerAllInfo,
        verifyStatus,
        createAppStatus,
        getFastApp,
        createFastAppStat,
        isVisibleFastAppMdl,
        toggleFastAppModal,
        setFalseFastAppStat,
        closeFastAppModal,
        setRequestedService,
        requestedService,
        pendingHours 
    }
})