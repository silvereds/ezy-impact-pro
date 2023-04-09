<script setup lang="ts">
import { RouterView } from 'vue-router'
import useUiStore from './stores/ui';
import {storeToRefs} from "pinia"
import Loader from "@/components/Loader.vue"
const {loader} = storeToRefs(useUiStore())

</script>

<template>
  <div>
    <!-- <div v-if="loader">
        <Loader />
    </div> -->
    <RouterView />
  </div>
</template>
