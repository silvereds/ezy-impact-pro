<script setup lang="ts">
import {ref} from "vue";
import useUiStore from "@/stores/ui"
import InputText from 'primevue/inputtext';
import Table from "@/components/table/index.vue";

const ui = useUiStore()
const searchText = ref(null)

</script>
<template>
    <div class="mt-2 bg-red h-100">
        <div class="bg-white flex flex-row justify-content-between align-items-center px-3">
            <h4>Tableau de bord </h4>
            <span class="p-input-icon-left" style="width:60%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
        
    </div>
    
</template>