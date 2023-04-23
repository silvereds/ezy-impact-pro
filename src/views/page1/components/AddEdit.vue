<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import fixeEqStore from "@/stores/FIXE_EQUIPMENT/store";
import useUiStore from "@/stores/ui";
import type { FIXED_EQUIPMENT } from "@/dataType";
import  { SCOPE  } from "@/dataType";
import buildingStore from "@/stores/BUILDING/store";
import InputNumber from 'primevue/inputnumber';

const store = fixeEqStore()
const ui = useUiStore()
const {data:buildings} = storeToRefs(buildingStore())

const props = defineProps<{itemId?:string, callback?:()=>void}>()
const {owner , declarer, getSelectable } = storeToRefs(ui)
const {fuel_used,type,equipment_performance} = getSelectable.value(SCOPE.FIXE_EQUIPMENT,['type','fuel_used','equipment_performance'])
// console.log("selectable field", {fuel_used,type,equipment_performance})
// console.log("building here", buildings.value)

const performanceValue = ref<number|null>(null)

let data = ref<FIXED_EQUIPMENT>({
    reference: null,
    userId: null,
    typeReference:null,
    fuelReference:null,
    performanceReference:null ,
    equipmentName: null,
    buildingId: null,
    enterpriseId: '1',
    ownerType: null,
})

const onSave = ()=>{
    const d:FIXED_EQUIPMENT = data.value 

    if((Object as any).values(d).some((el:any) => el === null) || performanceValue.value === null){
        alert("remplir tous les champs")
        return
    }
    console.log({...d,performanceReference:{...d.performanceReference,value:Number(performanceValue.value)}})
    if(!props?.itemId){
        store.addData({
            data:{...d,performanceReference:{...d.performanceReference,value:Number(performanceValue.value)}},
            callback:props?.callback
        })
    }else{
        store.updateData({data:d,callback:()=>{}, id:props?.itemId})
    }
}
onMounted(()=>{
    if(props?.itemId){
        const item = store.data[props?.itemId] || {}
        //console.log("selected item", item)
        data.value.buildingId = item?.building?.id
        data.value.reference = item?.reference
        performanceValue.value = item?.equipmentPerformanceValue
        data.value.userId = item?.userId
        data.value.ownerType = item?.ownerType
        data.value.equipmentName = item?.equipmentName
        data.value.typeReference = {
            reference:item?.type?.reference,
            unit:item?.type?.name,
            value:item?.type?.frName,
        }
        data.value.fuelReference = {
            reference:item?.fuelUsed?.reference,
            unit:item?.fuelUsed?.name,
            value:item?.fuelUsed?.frName,
        }
        data.value.performanceReference = {
            reference:item?.equipmentPerformance?.reference,
            unit:item?.equipmentPerformance?.name,
            value:item?.equipmentPerformanceValue
        }
        
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
                    <Dropdown  
                        v-model="data.typeReference" 
                        :options="type.map((el:any)=>({reference:el?.reference,unit:el?.name,value:el.frName}))" 
                        optionLabel="value" 
                        class="input-ezy" 
                    />
                </div>
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Combustible utilisé </label>
                    <Dropdown  
                        v-model="data.fuelReference" 
                        :options="fuel_used.map((el:any)=>({reference:el?.reference,unit:el?.name,value:el.frName}))" 
                        optionLabel="value" 
                        class="input-ezy" 
                    />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Performance d'équipement </label>
                    <div class="flex">
                        <InputNumber v-model="performanceValue" class="input-performance" style="height:2.6rem" />
                        <Dropdown  
                            v-model="data.performanceReference" 
                            :options="equipment_performance.map((el:any)=>({reference:el?.reference,unit:el?.name,value:el.frName}))" 
                            optionLabel="value"
                            class="select-unit" 
                        />
                    </div>
                </div>
            </div>
            <!-- équipment name  ,    -->
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Emplacement </label>
                    <Dropdown 
                        placeholder="sur quel bâtiment"  
                        v-model="data.buildingId" 
                        :options="(Object as any).values(buildings)" 
                        optionLabel="nameOfTheSite" 
                        class="input-ezy" 
                        optionValue="id" 
                    />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Déclarant </label>
                    <Dropdown  v-model="data.userId" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="frName" />
                </div>
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Nom de L équipement </label>
                    <InputText v-model="data.equipmentName" class="input-ezy" style="height:2.6rem" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> type de propriété </label>
                    <Dropdown optionValue="value"  v-model="data.ownerType" :options="owner" optionLabel="frName" class="input-ezy" />
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