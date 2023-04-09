<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
//  swiper for animation here
import { Swiper, SwiperSlide  } from 'swiper/vue';
import { Controller } from 'swiper';
import 'swiper/css';

import {ref, watch} from "vue";
import Sidebar from 'primevue/sidebar';
import ConfirmDialog from 'primevue/confirmdialog';
import Button from "primevue/button";
import InputText from 'primevue/inputtext';
import Table from "@/components/table/index.vue";
import ValidationForm from "@/components/ValidationForm.vue";
import Dialog from "primevue/dialog";
import { useConfirm } from "primevue/useconfirm";
import AddEdit from "./components/AddEdit.vue";
import fixeEqStore from "@/stores/equipments/fixeEqStore";
import {storeToRefs} from "pinia";

const swipe = ref<any>(null)
const activeIndex = ref<number|null>(null)
const setSwiper = (swiper:any) => swipe.value = swiper
const onSwipe = (index:number)=>{
    activeIndex.value = index
    swipe.value?.slideTo(index)
}

const store = fixeEqStore()
const {data} = storeToRefs(store)

const confirm = useConfirm();

const searchText = ref(null)
const open = ref(false)
const showDetail = ref(false)

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
    console.log(id)
    showDetail.value = true;
}

const columns = [
  { title: "Référence", key: "reference", },
  { title: "Type", key: "type",show:true },
  { title: "Combustible", key: "fuelUsed" },
  { title: "Performance", key: "equipmentPerformance" },
  {title:"Unité", key:"measureUnit"},
  { title: "Site", key: "nameOfTheSite" },
  { title: "Propriétaire", key: "userId" },
  { title: "Nom d'équipement", key: "equipmentName", show:true },
  {title:"Type de propriété" , key:"ownerType"},
];

watch(store.data , (newData , prevData)=>{
    console.log("prev data", prevData)
    console.log("new data", newData)

})


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
                    Équipements fixes
                </span>
            </div>
            
            <span class="p-input-icon-left" style="width:50%">
                <i class="pi pi-search" />
                <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
            </span>
        </div>
        <div class="pa-2">
            <Table 
                title="Équipements fixes" 
                subtitle="ce tableau liste tous les équipements fixes" 
                :columns="columns.filter((el)=>el.show)" 
                :data="store.data"
                :onNew="()=>open = true"
                :onStatusChange="onStatusChange"
                :onDelete="onDelete"
                :onShow="onShow"
                :onEdit="onEdit" 
            />
        </div>
        <ConfirmDialog></ConfirmDialog>
        <Dialog 
            v-model:visible="open" 
            modal 
            :style="{ width: '50vw', height:'100vh', backgroundColor:'#fff' }" 
            position="top"
        >
            <template #header>
                <div class="flex flex-row align-items-center justify-content-start gap-2 w-100">
                <i class="pi pi-plus" style="font-size:1rem;margin-right:0.5rem;font-weight:700" ></i>
                    <span style="font-size:18px;font-weight:600"> Nouvel Equipement fixe  </span>
                </div>
            </template>
            <AddEdit />
        </Dialog>
        <Sidebar v-model:visible="showDetail" style="width:50vw">
            <template #header>
                <div class="flex-row-between ">
                    <h2> Détail  </h2>
                    <div class=" flex flex-row " style="margin-right:2rem">
                        <Button 
                            :style="{borderBottom:activeIndex === 1 ? '2px solid #636564':null,color:'#636564'}"
                            text 
                            label="Valider" 
                            icon="pi pi-check"  
                            @click="onSwipe(1)" 
                        />
                        <Button 
                            :style="{borderBottom:activeIndex === 2 ? '2px solid #636564':null,color:'#636564'}"
                            text 
                            label="Editer" 
                            icon="pi pi-pencil" 
                            @click="onSwipe(2)" 
                        />
                    </div>
                    
                </div>
            </template>
            <Swiper
                :slides-per-view="1"
                :space-between="50"
                :modules="[Controller]" 
                @swiper="setSwiper"
            >
                <swiper-slide>
                    <div>
                        lorem ipsun dollor loren ipsu dolor
                        lorem ipsun dollor loren ipsu dolor
                        lorem ipsun dollor loren ipsu dolor
                        lorem ipsun dollor loren ipsu dolor
                        lorem ipsun dollor loren ipsu dolor
                        lorem ipsun dollor loren ipsu dolorå
                    </div>
                </swiper-slide>
                <swiper-slide>
                    <ValidationForm />
                </swiper-slide>
                <swiper-slide>
                    <Button icon="pi pi-angle-left" severity="success" rounded aria-label="Search" @click="onSwipe(0)" />
                    <AddEdit />
                </swiper-slide>
            </Swiper>
        </Sidebar>
    </div>
    
</template>
<style lang="scss">
.title{
    font-size:16px;
    font-weight:600
}
.value{
    font-size:12px;
    font-weight:300
}
.icon-title{
    margin-right:1rem;
    margin-left:1rem;
    font-weight:700
}

</style>