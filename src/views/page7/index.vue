<script setup lang="ts">
import {ref , onMounted} from "vue";
import InputText from 'primevue/inputtext';
import Table from "@/components/table/index.vue";
import AddEdit from "./components/AddEdit.vue";
import dataStore from "@/stores/BIOMASS_ACT/store";
import { useConfirm } from "primevue/useconfirm";
import {storeToRefs} from "pinia";
import Drawer from "@/components/Drawer.vue"
import { SCOPE, type Select } from "@/dataType";
import Dialog from "primevue/dialog";

const store = dataStore()
const {data, fetching} = storeToRefs(store)
const confirm = useConfirm();

const searchText = ref(null)
const open = ref(false)
const showDetail = ref(false)
const selectedId= ref<string|undefined>()
const selectedItem = ref<any>(null)

const onStatusChange = (status:string)=>{
    console.log("status here",status)
}
const onDelete = (id:string)=>{
    // show modal delete
    confirm.require({
        message: 'Are you sure you want to proceed?',
        header: 'Confirmation',
        icon: 'pi pi-exclamation-triangle',
        accept: () => {
            console.log("confirmed", id)
        },
        reject: () => {
            console.log("rejected")
        },
    });
}

const onEdit = (id:string)=>{
console.log("id", id)
}

const onShow = (id:string)=>{
    selectedItem.value = (data.value as any)?.[id]
    selectedId.value = id
    showDetail.value = true;
}

const columns = [
  { title: "Référence", key: "reference",show:true },
  { title: "Type d'activité", key: "type" , show:true , formatter:(data:Select)=>data?.name || "" },
  { title: "Unité", key: "unit", show:true,formatter:(data:Select)=>data?.name || ""},
  { title: "Déclarant", key: "userId" },
];

onMounted(async ()=> await store.getData())
</script>
<template>
    <div class="mt-2 bg-red h-100">
        <div class="bg-white flex flex-row justify-content-between align-items-center pl-2 pr-3 py-3">
            <div class="flex flex-row align-items-center">
                <i class="ri-body-scan-fill mr-2" style="font-size:2rem"></i> 
                <span class="mr-2">
                    Configurations
                </span>
                <i class="pi pi-angle-right"></i>
                <span>
                    Activités liées à la biomasse
                </span>
            </div>
            <span class="p-input-icon-left" style="width:60%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
        <div class="pa-2">
            <Table 
                title="Activités liées à la biomasse" 
                subtitle="cliquer sur nouveau pour ajouter un nouvel activité" 
                :columns="columns.filter((el)=>el.show)" 
                :data="(Object as any).values(data)"
                :onNew="()=>open = true"
                :onStatusChange="onStatusChange"
                :onDelete="onDelete"
                :onShow="onShow"
                :onEdit="onEdit"
                :loading="fetching"  
            />
        </div>
        <Dialog 
            v-model:visible="open" 
            modal 
            :style="{ backgroundColor:'#fff' }" 
            position="center"
        >
            <template #header>
                <div class="flex flex-row align-items-center justify-content-start gap-2 w-100">
                    <i class="pi pi-plus" style="font-size:1rem;margin-right:0.5rem;font-weight:700" ></i>
                    <span style="font-size:18px;font-weight:600"> Nouvel Activité  </span>
                </div>
            </template>
            <AddEdit :callback="()=>open = false" />
        </Dialog>
        <Drawer 
            :onClose="()=>showDetail = false" 
            :visible="showDetail" 
            :selectedId="selectedId"
            :category="SCOPE.GES_ACTIVITIES"
        >
            <template v-slot:detail>
                <div>
                    {{ selectedItem?.type }}
                </div>
            </template>
            <template v-slot:update>
                <div>
                    <AddEdit :itemId="selectedId" />
                </div>
            </template>
        </Drawer>
    </div>
    
</template>