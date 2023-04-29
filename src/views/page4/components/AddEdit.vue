<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import Store from "@/stores/COLDHEAT_EQUIPMENT/store";
import useUiStore from "@/stores/ui";
import { SCOPE, type COLD_HEAT_EQUIPMENT_DTO } from "@/dataType";
import InputNumber from 'primevue/inputnumber';

const store = Store()
const ui = useUiStore()
const props = defineProps<{itemId?:string, callback?:()=>void}>()
const {owner , declarer, getSelectable } = storeToRefs(ui)
const {brand,type,equipment_performance,model}:any = getSelectable.value(SCOPE.COLD_AND_HEAT_EQUIPMENT,['type','brand','model','equipment_performance'])

let performanceValue = ref(null)
let data = ref<COLD_HEAT_EQUIPMENT_DTO>({
    reference: null,
    userId: null,
    typeReference:null,
    performanceReference:null ,
    enterpriseId: '1',
    ownerType: null,
    brand:null,
    modele:null,
})

const onSave = ()=>{
    const d:any = data.value
    
    if((Object as any).values(d).some((el:any) => el === null) || performanceValue.value === null){
        alert("remplir tous les champs")
        return
    }
    const toSend:any = {...d,model:d.modele , performanceReference:{...d.performanceReference,value:Number(performanceValue.value)}}
    console.log("cold heat equipment to save",toSend)
    if(!props?.itemId){
        store.addData({data:toSend,callback:props?.callback})
    }else{
        store.updateData({data:toSend,callback:()=>{}, id:props?.itemId})
    }
}
onMounted(()=>{
    if(props?.itemId){
        // data.value = {...data.value , ...(store.data[props?.itemId] || {}) }
        const item = store.select(props?.itemId) || {}

       data.value.reference = item?.reference
       performanceValue.value = item?.equipmentPerformanceValue
       data.value.userId =item?.userId
       data.value.ownerType = item?.ownerType
       data.value.typeReference = {
           reference:item?.type?.reference,
           unit:'',
           value:item?.type?.frName,
       }
       data.value.brand = {
           reference:item?.brand?.reference,
           unit:'',
           value:item?.brand?.frName,
       }
       data.value.modele = {
           reference:item?.model?.reference,
           unit:'',
           value:item?.model?.frName,
       }
       data.value.performanceReference = {
           reference:item?.equipmentPerformance?.reference,
           unit:'',
           value:item?.equipmentPerformance?.frName,
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
                        :options="type.map((t:any)=>({reference:t?.reference,unit:'',value:t?.frName}))" 
                        optionLabel="value" 
                        class="input-ezy" 
                    />
                </div>
        
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Marque </label>
                    <Dropdown  
                        v-model="data.brand" 
                        :options="brand?.map((b:any)=>({reference:b?.reference,unit:'',value:b?.frName}))" 
                        optionLabel="value" 
                        class="input-ezy" 
                    />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Modèle </label>
                    <Dropdown  
                        v-model="data.modele" 
                        :options="model?.map((b:any)=>({reference:b.reference,unit:'',value:b?.frName}))" 
                        optionLabel="value" 
                        class="input-ezy" 
                        
                    />
                </div>
            </div>
           
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                
                <div class="flex flex-column ml-2 gap-2">
                    <label> Performance d'équipement </label>
                    <div class="flex">
                        <InputNumber v-model="performanceValue" class="input-performance" style="height:2.6rem" />
                        <Dropdown  
                            v-model="data.performanceReference" 
                            :options="equipment_performance?.map((b:any)=>({reference:b.reference,unit:'',value:b?.frName}))"
                            optionLabel="value" 
                            class="select-unit" 
                        />
                    </div>
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Déclarant </label>
                    <Dropdown  v-model="data.userId" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="id" />
                </div>
            </div>
            
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                
                <div class="flex flex-column gap-2">
                    <label> type de propriété </label>
                    <Dropdown optionValue="value"  v-model="data.ownerType" :options="owner" optionLabel="frName" class="input-ezy" />
                </div>
                <div class="flex flex-column gap-2 input-ezy">
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
