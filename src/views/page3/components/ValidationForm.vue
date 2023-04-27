<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import {ref} from "vue";
import Button from "primevue/button"
import elecEqStore from "@/stores/ELECTRICAL_EQUIPMENT/store";
import type { ELECTRIC_DTO } from "@/dataType";
import InputNumber from 'primevue/inputnumber';
import Textarea from 'primevue/textarea';
import useUiStore from "@/stores/ui";
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';

const store = elecEqStore()
const ui:any = useUiStore()
const props = defineProps<{itemId:string, callback?:()=>void}>()

const performanceValue = ref<number|null>(null)
const validate = ref(true)

let data = ref<ELECTRIC_DTO>({
    reference: null,
    userId: null,
    typeReference:null,
    performanceReference:null ,
    equipmentName: null,
    enterpriseId: '1',
    ownerType: null,
    brand:null,
    modele:null,
})

const onSave = ()=>{
    const d:ELECTRIC_DTO = data.value 
    
    if(isNaN(d.emissionFactor as number) || d.reportingFrequencyId === null){
        alert("le facterur d'emission et fréquence de déclaration requise")
        return
    }
    const toSend:any = {
        ...d,
        performanceReference:{
            ...d.performanceReference,
            value:Number(performanceValue.value),
        }
    }

    console.log("data to send " , toSend)
    
    store.updateData({
        data:toSend,
        callback:()=>{}, 
        id:props?.itemId,
        isValidation:validate.value
    })
   
}

onMounted(()=>{
    if(props?.itemId){
        const item = store.select(props?.itemId) || {}
        data.value.reference = item?.reference
       performanceValue.value = item?.equipmentPerformanceValue
       data.value.userId =item?.userId
       data.value.ownerType = item?.ownerType
       data.value.equipmentName = item?.equipmentName
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
        data.value.adminComment = item?.adminComment || ''
        data.value.emissionFactor = item?.emissionFactor || null
        data.value.hypotheses = item?.hypotheses || ""
        data.value.reportingFrequencyId = item?.reportingFrequencyId || null
        data.value.emissionFactorDataSource = item?.emissionFactorDataSource || ""
    }
})


</script>
<template>
    <div class="w-100">
        <div class="flex flex-column align-items-center justify-content-center">
            <div class="surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                <Dropdown  
                    v-model="data.reportingFrequencyId" 
                    :options="ui.frequence" 
                    optionLabel="frName"
                    optionValue="id" 
                    class=" w-full md:w-25rem"
                    placeholder="fréquence de déclaration"
                />
                <InputNumber class="p-inputtext w-full md:w-25rem mt-3" v-model="data.emissionFactor" placeholder="Facteur d'emission" size="small" />
                <InputText v-model="data.emissionFactorDataSource" placeholder="Source de données" class="p-inputtext p-component w-full md:w-25rem mt-3"/>
                <Textarea v-model="data.hypotheses" placeholder="Hypothèse" class="p-inputtext p-component w-full md:w-25rem mt-3"/>
                <Textarea v-model="data.adminComment" placeholder="Commentaire" class="p-inputtext p-component w-full md:w-25rem mt-3"/>
                <div class="flex align-items-center validation-textarea">
                    <Checkbox :binary="true" v-model="validate" inputId="valid" name="pizza" value="Cheese" />
                    <label for="valid" class="ml-2"> valider les informations </label>
                </div>
                <div class="mt-3 flex align-items-center justify-content-center" >
                    <Button label="Enregister" @click="onSave()" :loading="store.loading" />
                </div>
            </div>
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