<script setup lang="ts">
import {ref , onMounted , watch , computed} from "vue";
import ConfirmDialog from 'primevue/confirmdialog';
import ValidationForm from "./components/ValidationForm.vue";
import Declaration from "./components/Declaration.vue";
import InputText from 'primevue/inputtext';
import Table from "@/components/table/index.vue";
import AddEdit from "./components/AddEdit.vue";
import dataStore from "@/stores/ELECTRICAL_EQUIPMENT/store";
import { useConfirm } from "primevue/useconfirm";
import {storeToRefs} from "pinia";
import Drawer from "@/components/Drawer.vue"
import { SCOPE } from "@/dataType";
import Dialog from "primevue/dialog";
import useAuthStore from "@/stores/authStore";
import { OWNER_TYPE_LABEL } from "@/utils/constant";
import NoSelect from "@/components/NoSelect.vue";
import CardDetail from "@/components/CardDetail.vue";

const store = dataStore()
const {loadingData,loading} = storeToRefs(store)
const auth = useAuthStore()
const confirm = useConfirm();
const searchText = ref('')
const declarationStatus = ref('ALL')
const open = ref(false)
const showDetail = ref(false)
const selectedId= ref<string|undefined>()
const selectedItem = ref<any>(null)

const onStatusChange = (status:string)=>{
    declarationStatus.value = status
}

const onDelete = (id:string)=>{
    confirm.require({
        message: 'Êtes vous sûre de vouloir supprimer cet équipement?',
        header: 'Supression',
        icon: 'pi pi-exclamation-triangle',
        acceptClass: 'p-button-danger',
        accept: () => {
            store.deleteData({id,callback:()=>{ showDetail.value = false}})
        },
        reject: () => {
            console.log("rejected")
        },
    });
}

const onShow = (id:string)=>{
    selectedItem.value = store.select(id)
    selectedId.value = id
    showDetail.value = true;
    console.log("mobile equipment selected",selectedItem.value)
}
const columns = [
  { title: "Référence", key: "reference", show:true },
  { title: "Type", key: "type" , show:true, formatter:(data:any)=>data?.frName},
  { title: "Marque", key: "brand",show:true, formatter:(data:any)=>data?.frName },
  { title: "Modèle", key: "model" , show:true , formatter:(data:any)=>data?.frName},
  {title:"Année de production" , key:"productionYear"},
  { title: "Combustible", key: "fuelUsed" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  { title: "Nom d'équipement", key: "equipmentName",show:true },
  { title: "Propriétaire", key: "userId" },
  {title:"Type de propriété" , key:"ownerType"},
];

onMounted(async ()=> await store.getData())

watch(()=>auth.user,(newUser:any,oldUser:any)=>{
    store.getData()
    console.log("new user", newUser)
    console.log("old user", oldUser)
})

const filterData = computed(()=>{
    const d = (Object as any).values(store.getMobileEquiment)
    const filter = (el:any)=>{
        return (
            el?.reference?.toLowerCase()?.includes(searchText.value?.toLowerCase())||
            el?.type?.frName?.toLowerCase()?.includes(searchText.value?.toLowerCase())||
            el?.equipmentName?.toLowerCase()?.includes(searchText.value?.toLowerCase())
        )
    }

    if(declarationStatus.value === "ALL"){
        return d.filter(filter)
    }
    let statusData:any = d.filter((el:any)=>el.declarationStatus === declarationStatus.value)

    return statusData.filter(filter)
})
</script>
<template>
    <div class="mt-2 bg-red h-100">
        <div class="header-content flex flex-row justify-content-between align-items-center pl-2 pr-3 py-3">
            <div class="flex flex-row align-items-center">
                <i class="ri-send-to-back" style="font-size:2rem"></i> 
                <span class="mr-2">
                    Configuration
                </span>
                <i class="pi pi-angle-right"></i>
                <span>
                    Équipements électriques
                </span>
            </div>
            <span class="p-input-icon-left" style="width:50%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
        <div v-if="auth.user">
            <div class="pa-2">
                <Table 
                    title="Équipements électriques" 
                    subtitle="ce tableau liste tous les équipements électriques" 
                    :columns="columns.filter((el)=>el.show)" 
                    :data="filterData"
                    :onNew="()=>open = true"
                    :onStatusChange="onStatusChange"
                    :onDelete="onDelete"
                    :onShow="onShow"
                    :loading="loadingData" 
                />
            </div>
            <ConfirmDialog></ConfirmDialog>
            <Dialog 
                v-model:visible="open" 
                modal 
                :style="{backgroundColor:'#fff' }" 
                position="center"
            >
                <template #header>
                    <div class="flex flex-row align-items-center justify-content-start gap-2 w-100">
                        <i class="pi pi-plus" style="font-size:1rem;margin-right:0.5rem;font-weight:700" ></i>
                        <span style="font-size:18px;font-weight:600"> Nouvel Equipement Mobile  </span>
                    </div>
                </template>
                <AddEdit :callback="()=>open = false" />
            </Dialog>
            <Drawer 
                :onClose="()=>showDetail = false" 
                :visible="showDetail" 
                :selectedId="selectedId"
                :item="selectedItem"
                :onDelete="onDelete"
                :category="SCOPE.ELECTRICAL_EQUIPMENT"
            >
                <template v-slot:detail>
                    <div class="grid">
                        <div class="md:col-6">
                            <CardDetail 
                                title="type" 
                                :value="selectedItem?.type?.frName" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                title="marque" 
                                :value="selectedItem?.brand?.frName" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                title="modèle" 
                                :value="selectedItem?.model?.frName" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                icon="pi pi-stop-circle" 
                                title="performance" 
                                :value="selectedItem?.equipmentPerformanceValue + ' ' + selectedItem?.equipmentPerformance?.frName" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                icon="pi pi-user" 
                                title="déclarant" 
                                :value="selectedItem?.userId" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                icon="pi pi-eject" 
                                title="type de propriété" 
                                :value="(OWNER_TYPE_LABEL as any)[selectedItem?.ownerType]" 
                            />
                        </div>
                        <div class="md:col-6">
                            <CardDetail 
                                icon="pi pi-bolt" 
                                title="nom de l équipement" 
                                :value="selectedItem?.equipmentName" 
                            />
                        </div>
                        
                    </div>
                </template>
                <template v-slot:update>
                    <div>
                        <AddEdit :itemId="selectedId" />
                    </div>
                </template>
                <template v-slot:validation>
                    <ValidationForm :itemId="selectedId as string" />
                </template>
                <template v-slot:declaration>
                    <div>
                        <Declaration /> 
                    </div>
                </template>
            </Drawer>
            <BlockUI :blocked="loading" fullScreen class="flex align-items-center justify-content-center">
            </BlockUI>
        </div>
        <NoSelect v-else />
    </div>
    
</template>