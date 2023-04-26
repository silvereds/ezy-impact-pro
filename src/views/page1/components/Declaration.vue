<script setup lang="ts">
import {ref , onMounted} from "vue";
import fixeEqStore from '@/stores/FIXE_EQUIPMENT/store';
import { storeToRefs } from "pinia";
const loading = ref(false)
const store = fixeEqStore()
const {declarationData}:any = storeToRefs(store)

onMounted(()=>{
    console.log("declaratonDate",declarationData.value)
    if(!declarationData.value){
        loading.value = true
        store.getDeclarationData({callback:()=>loading.value = false})
    }
})

</script>
<template>
    <div class="flex align-items-center justify-content-center pa-2">
        {{ declarationData}}
        <div v-if="loading">
            <h4 class="text-center">
                chargement des données en cours...
            </h4>
        </div>
        <div v-else>
            <div v-if="declarationData?.length === 0">
                aucune declaration pour l'instant
            </div>
            <div v-else>
                data
            </div>
        </div>
    </div>
</template>