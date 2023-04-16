<script lang="ts" setup>
import {onMounted } from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import Store from "@/stores/COLDHEAT_EQUIPMENT/store";
import useUiStore from "@/stores/ui";
import type { EQUIPMENT } from "@/dataType";
import InputNumber from 'primevue/inputnumber';

const store = Store()
const ui = useUiStore()
const props = defineProps<{itemId?:string, callback?:()=>void}>()
const {owner , declarer } = storeToRefs(ui)

const typeList:any = [{id:1,name:"type1"},{id:2,name:"type2"},{id:3,name:"type3"}]
const brandList:any = {
    1:{id:1,name:"marque1",model:[{id:1,name:"modele11"},{id:1,name:"modele12"}]},
    2:{id:2,name:"marque2",model:[{id:1,name:"modele21"},{id:1,name:"modele22"}]}
}

const unitList:any ={
    1:{id:1 , name:"km"},
    2:{id:2 , name:"m"},
    3:{id:3 , name:"kg"},
} 

let data = ref<EQUIPMENT>({
  reference:null,
  type: null,
  brand: null,
  model: null,
  performanceValue: null,
  performanceUnit: null,
  name: null,
  declarerId: null,
  owner: null,
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
                    <Dropdown  v-model="data.type" :options="typeList" optionLabel="name" class="input-ezy" />
                </div>
        
            </div>
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Marque </label>
                    <Dropdown  v-model="data.brand" :options="(Object as any).values(brandList)" optionLabel="name" class="input-ezy" />
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Modèle </label>
                    <Dropdown  v-model="data.model" :options="brandList?.[data.brand?.id as string]?.model" optionLabel="name" class="input-ezy" optionValue="name" />
                </div>
            </div>
            
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column ml-2 gap-2">
                    <label> Performance d'équipement </label>
                    <div class="flex">
                        <InputNumber v-model="data.performanceValue" class="input-performance" style="height:2.6rem" />
                        <Dropdown  
                            v-model="data.performanceUnit" 
                            :options="(Object as any).values(unitList)"
                            optionLabel="name" 
                            class="select-unit" 
                        />
                    </div>
                </div>
                <div class="flex flex-column ml-2 gap-2">
                    <label> Déclarant </label>
                    <Dropdown  v-model="data.declarerId" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="frName" />
                </div>
            </div>
            
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Nom de L équipement </label>
                    <InputText v-model="data.name" class="input-ezy" style="height:2.6rem" />
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