<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import {ref} from "vue";
import useUiStore from "@/stores/ui"
import InputText from 'primevue/inputtext';
import Table from "@/components/table/index.vue";
import DECLARATION_STATUS from "@/utils/constant"

const ui = useUiStore()
const searchText = ref(null)
const onStatusChange = (status:string)=>{
    console.log("status here",status)
}
const onDelete = (id:string)=>{
    // show modal delete
}
const onEdit = (id:string)=>{
    // show modal edit
}
const onShow = (id:string)=>{
    // show all detail on modal
}

const columns = [
  { title: "Référence", key: "reference", show:true },
  { title: "Type", key: "type",show:true },
  { title: "Combustible", key: "fuelUsed" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  { title: "Site", key: "nameOfTheSite" },
  { title: "Propriétaire", key: "userId" },
  { title: "Nom d'équipement", key: "equipmentName", show:true },
  {title:"Type de propriété" , key:"ownerType"},
];

const data = [
    {reference:"reference1", type:"type1",equipmentName:"Nom1",status:DECLARATION_STATUS.VALIDATED },
    {reference:"reference2", type:"type2",equipmentName:"Nom2", status:DECLARATION_STATUS.PENDING },
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
    {reference:"reference3", type:"type3",equipmentName:"Nom3" , status:DECLARATION_STATUS.DRAFT},
]

</script>
<template>
    <div class="mt-2 bg-red h-100">
        <div class="bg-white flex flex-row justify-content-between align-items-center pl-2 pr-3 py-3">
            <div class="flex flex-row align-items-center">
                <i class="ri-send-to-back" style="font-size:2rem"></i> 
                <span class="mr-2">
                    Configurations
                </span>
                <i class="pi pi-angle-right"></i>
                <span>
                    Équipements mobiles
                </span>
            </div>
            <span class="p-input-icon-left" style="width:50%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
        <div class="pa-2">
            <Table 
                title="Équipements mobiles" 
                subtitle="ce tableau liste tous les équipements mobiles" 
                :columns="columns.filter((el)=>el.show)" 
                :data="data"
                :onNew="()=>ui.notifyError('bonjour')"
                :onStatusChange="onStatusChange"
                :onDelete="onDelete"
                :onShow="onShow"
                :onEdit="onEdit" 
            />
        </div>
    </div>
    
</template>