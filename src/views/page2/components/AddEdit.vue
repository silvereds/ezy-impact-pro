<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import fixeEqStore from "@/stores/MOBILE_EQUIPMENT/store";
import useUiStore from "@/stores/ui";


const store = fixeEqStore()
const ui = useUiStore()
const props = defineProps<{itemId?:string, callback?:()=>void}>()
const {building, units , fuelUsed, type, owner , declarer } = storeToRefs(ui)

let data = ref<any>({
    reference:null,
    type:null,
    fuelUsed:null,
    performanceValue:null,
    performanceUnit:null,
    location:null,
    declarer:null,
    equipmentName:null,
    owner:null,
})

const onSave = ()=>{
    const d:any = data.value
    if(!props?.itemId){
        
        store.addData({data:d,callback:props?.callback})
    }else{
        store.updateData({data:d,callback:()=>{}, id:props?.itemId})
    }
}
onMounted(()=>{
    if(props?.itemId){
        data.value = {...data.value , ...(store.data[props?.itemId] || {}) }
    }
})


</script>
<template>
    <div class="w-100">
        <div class="flex align-items-center flex-column justify-content-center w-100">
            <div class="flex flex-row align-items-center justify-content-between mt-3">
                <div class="flex flex-column gap-2">
                    <label> Votre reférence </label>
                    <InputText v-model="data.reference" class="input-ezy" style="height:2.6rem" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Type </label>
                    <Dropdown  v-model="data.type" :options="type" optionLabel="frName" optionValue="frName" class="input-ezy" />
                </div>
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Combustible utilisé </label>
                    <Dropdown  v-model="data.fuelUsed" :options="fuelUsed" optionLabel="frName" optionValue="frName" class="input-ezy" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Performance d'équipement </label>
                    <div class="flex">
                        <InputText v-model="data.performanceValue" class="input-performance" style="height:2.6rem" />
                        <Dropdown  
                            v-model="data.performanceUnit" 
                            :options="units" 
                            optionLabel="frName"
                            optionValue="frName" 
                            class="select-unit" 
                        />
                    </div>
                </div>
            </div>
            <!-- équipment name  ,    -->
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Emplacement (sur quel bâtiment) </label>
                    <Dropdown  v-model="data.location" :options="building" optionLabel="frName" class="input-ezy" optionValue="frName" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Déclarant </label>
                    <Dropdown  v-model="data.declarer" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="frName" />
                </div>
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Nom de L équipement </label>
                    <InputText v-model="data.equipmentName" class="input-ezy" style="height:2.6rem" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> type de propriété </label>
                    <Dropdown optionValue="frName"  v-model="data.owner" :options="owner" optionLabel="frName" class="input-ezy" />
                </div>
            </div>
            
        </div>
        <div class="flex flex-row align-items-center justify-content-center mt-3">
            <Button label="enregister" @click="onSave()" :loading="store.loading"  />
        </div>
    </div>
</template>
<style lang="scss">
.input-ezy{
    width:16rem;
}

.select-unit{
    width:7rem;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
}
.input-performance{
    height:3rem;
    width:9rem;
    border-top-right-radius:0;
    border-bottom-right-radius: 0;
}
</style>