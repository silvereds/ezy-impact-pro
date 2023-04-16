<script lang="ts" setup>
import {onMounted} from "vue"
import InputText from "primevue/inputtext";
import Dropdown from 'primevue/dropdown';
import {ref} from "vue";
import Button from "primevue/button"
import {storeToRefs} from "pinia";
import Store from "@/stores/GES_ACTIVITIES/store";
import useUiStore from "@/stores/ui";
import type { ACTIVITIES } from "@/dataType";


const store = Store()
const ui = useUiStore()
const props = defineProps<{itemId?:string, callback?:()=>void}>()
const {declarer} = storeToRefs(ui)

let data = ref<ACTIVITIES>({
    reference:null,
    type:null,
    declarerId:null,
    unit:null,
})
const typeList:any = [{id:1,name:"type1"},{id:2,name:"type2"},{id:3,name:"type3"}]
const unitList:any =[{id:1 , name:"km"},{id:2 , name:"m"},{id:3 , name:"kg"}]


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
    <div class="">
        <div class="flex align-items-center flex-column justify-content-center w-100">
            <div class="flex flex-column align-items-center justify-content-between mt-3">
                <div class="flex flex-column gap-2">
                    <label> Votre reférence </label>
                    <InputText v-model="data.reference" class="input-ezy" style="height:2.6rem" />
                </div>
            </div>
            <div class="flex flex-column align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Type d'activité</label>
                    <Dropdown  v-model="data.type" :options="typeList" optionLabel="name" class="input-ezy" />
                </div>
            </div>
            <div class="flex flex-column align-items-center justify-content-between mt-5">
                <div class="flex flex-column gap-2">
                    <label> Unité de mésure </label>
                    <Dropdown  v-model="data.unit" :options="unitList" optionLabel="name" class="input-ezy" />
                </div>
            </div>
         
            <div class="flex flex-row align-items-center justify-content-between mt-5">
                
                <div class="flex flex-column ml-2 gap-2">
                    <label> Déclarant </label>
                    <Dropdown  v-model="data.declarerId" :options="declarer" optionLabel="frName" class="input-ezy" optionValue="frName" />
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