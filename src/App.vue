<script setup lang="ts">
import { RouterView } from 'vue-router'
import useUiStore from './stores/ui';
import {storeToRefs} from "pinia"
import Loader from "@/components/Loader.vue"
import buildingStore from './stores/BUILDING/store';

const {loader:loadingSelectable} = storeToRefs(useUiStore())
const {loader:loadingBuilding} = storeToRefs(buildingStore())

</script>

<template>
  <div>
    <div v-if="loadingSelectable || loadingBuilding">
        <Loader />
    </div>
    <RouterView v-else />
  </div>
</template>
