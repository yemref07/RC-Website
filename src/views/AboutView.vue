<template>
    <div>
        <h1>{{ data.title }}</h1>
    </div>
</template>

<script setup>
import { useThemeStore } from '../stores/themeInfo';
import {storeToRefs} from 'pinia';

const store = useThemeStore();
const {data} = storeToRefs(store);

console.log(data)

</script>

<style lang="scss" scoped>

</style>