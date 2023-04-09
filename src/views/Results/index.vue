<script setup lang="ts">
import {ref} from "vue";
import useUiStore from "@/stores/ui"
import InputText from 'primevue/inputtext';
// import Table from "@/components/table/index.vue";

const ui = useUiStore()
const searchText = ref(null)
// const onStatusChange = (status:string)=>{
//     console.log("status here",status)
// }
// const onDelete = (id:string)=>{
//     // show modal delete
//     console.log(id)
// }
// const onEdit = (id:string)=>{
//     // show modal edit
//     console.log(id)
// }
// const onShow = (id:string)=>{
//     // show all detail on modal
//     console.log(id)
// }

// const columns = [
//   { title: "Référence", key: "reference",show:true },
//   { title: "Type d'activité", key: "type" , show:true },
//   { title: "Unité", key: "measurment", show:true },
//   { title: "Déclarant", key: "userId" },
// ];

</script>
<template>
    <div class="mt-2 bg-red h-100">
        <div class="bg-white flex flex-row justify-content-between align-items-center pl-2 pr-3 py-3">
            <div class="flex flex-row align-items-center">
                <i class="ri-bar-chart-2-fill mr-2" style="font-size:1.5rem"></i> 
                <span class="mr-2">
                    Résultats
                </span>
            </div>
            <span class="p-input-icon-left" style="width:60%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
       
    </div>
    
</template>