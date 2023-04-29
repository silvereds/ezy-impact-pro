<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import Store from "@/stores/INDUSTRIAL_ACT/store";
import useUiStore from "@/stores/ui";
import { SCOPE, type ACTIVITY } from "@/dataType";
import InputNumber from 'primevue/inputnumber';

const store = Store()
const ui = useUiStore()
const {owner , declarer,  getSelectable } = storeToRefs(ui)
const { type, measurement}:any = getSelectable.value(SCOPE.INDUSTRIAL_ACTIVITY,['type','measurement'])
const unitValue = ref<number|null>(null)
const props = defineProps<{itemId?:string, callback?:()=>void}>()


let data = ref<ACTIVITY>({
    reference:null,
    typeOfActivity:null,
    userId:null,
    unitOfMeasure:null,
    ownerType:null,
})

const onSave = ()=>{
    const d:any = data.value
    if((Object as any).values(d).some((el:any) => el === null) || unitValue.value === null){
        alert("remplir tous les champs")
        return
    }
    const toSend = {...d,unitOfMeasure:{...d.unitOfMeasure,value:unitValue.value}}

    console.log("industrial activity   to save",d)
    
    if(!props?.itemId){
        
        store.addData({data:toSend,callback:props?.callback})
    }else{
        
        store.updateData({data:toSend,callback:()=>{}, id:props?.itemId})
    }
}
onMounted(()=>{
    if(props?.itemId){
        const item:any = store.select(props?.itemId) || {}
        data.value.reference = item?.reference as string
        data.value.userId = item?.userId
        data.value.ownerType = item?.ownerType
        unitValue.value = item?.measureValue
        data.value.typeOfActivity = {
            reference:item?.activityType?.reference,
            unit:item?.activityType?.frName,
            value:item?.activityType?.frName,
        }
        data.value.unitOfMeasure = {
            reference:item?.measurment?.reference,
            unit:item?.measurment?.frName,
            value:'',
        }
    }
})


</script>
<template>
    <div class="w-100">
        <div class="flex align-items-center p-inline-1">
            <div class="flex flex-column gap-2 w-100">
                <label> Votre reférence </label>
                <InputText v-model="data.reference" class="input-ezy"  />
            </div>
            <div class="flex flex-column gap-2">
                <label> Type d'activité</label>
                <Dropdown  
                    v-model="data.typeOfActivity" 
                    :options="type.map((b:any)=>({reference:b?.reference,unit:b.frName,value:b?.frName}))" 
                    optionLabel="value" 
                    class="input-ezy" 
                />
            </div>
        </div>
        <div class="flex align-items-center justify-content-between mt-5">
            <div class="flex flex-column gap-2">
                <label> Unité de mésure </label>
                <Dropdown  
                    v-model="data.unitOfMeasure" 
                    :options="measurement.map((b:any)=>({reference:b?.reference,unit:b.frName,value:'',}))" 
                    optionLabel="unit" 
                    class="input-ezy" 
                />
            </div>
            <div class="flex flex-column ml-2 gap-2">
                <label> Valeur </label>
                <InputNumber v-model="unitValue"  class="input-ezy" />
            </div>
        </div>
        <div class="flex  align-items-center justify-content-between mt-5">
            <div class="flex flex-column gap-2">
                <label> Déclarant </label>
                <Dropdown  v-model="data.userId" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="id" />
            </div>
            <div class="flex flex-column gap-2 ml-2">
                <label> type de propriété </label>
                <Dropdown optionValue="value"  v-model="data.ownerType" :options="owner" optionLabel="frName" class="input-ezy" />
            </div>
        </div>
            
        <div class="flex flex-row align-items-center justify-content-center mt-3">
            <Button label="enregister" @click="onSave()" :loading="store.loading"  />
        </div>
    </div>
</template>
<style lang="scss">
.input-ezy{
    width:25rem;
    height:2.6rem
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