<template>
    <div class="container">
        <div class="row">
            <div class="col-sm-8 col-md-6 mx-auto">
                <img src="/404.svg" alt="" class="img-fluid">
                <h2 class="text-center" v-if="errorMsg.length > 0" >{{ errorMsg }} !</h2>
                <div class="text-center" v-else>
                    <h2 class="">Aradığınız sayfa bulunamadı</h2>
                    <router-link to="/" class="btn btn-primary mt-3">Anasayfaya Dön</router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { useThemeStore } from '../stores/themeInfo';
const store = useThemeStore()
const {errorMsg} =  storeToRefs(store)


</script>

<style lang="scss" scoped>

</style>