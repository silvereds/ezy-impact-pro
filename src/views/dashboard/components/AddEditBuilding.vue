<script setup lang="ts">
import type { BUILDING } from "@/dataType";
import { reactive, toRefs, onMounted } from "vue"
import {storeToRefs} from "pinia";
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from "primevue/button";
import buildingStore from "@/stores/BUILDING/store";

const store = buildingStore()
const{data:dataStore,loading} = storeToRefs(store)
const props = defineProps<{defaultId?:string,callback?:()=>void}>()
const {defaultId, callback} = toRefs(props)

const data = reactive<BUILDING>({
    reference:'',
    nameOfTheSite:'',
    area:0
})

onMounted(()=>{
    if(defaultId?.value){
        const init = (dataStore.value as any)?.[`${defaultId.value}`]
        data.reference = init.reference
        data.nameOfTheSite = init.nameOfTheSite
        data.area = init.area
    }
})
const onClick = ()=>{
    console.log("building action ", loading.value)
    if(defaultId?.value){
        store.updateData({data,callback:callback?.value,id:defaultId?.value})
    }else{
        store.addData({data,callback:callback?.value})
    }
}

</script>
<template>
    <div class="pa-2 flex flex-column gap-2 " style="width:30vw">
        <InputText v-model="data.reference"  type="text" placeholder="référence" class="p-inputtext-sm"  />
        <InputText v-model="data.nameOfTheSite"  type="text" placeholder="nom du site" class="p-inputtext-sm"  />
        <InputNumber v-model="data.area" inputId="integeronly" placeholder="superficie en m2" class="p-inputtext-sm" suffix=" m2" />
        <div class="flex align-items-center justify-content-center">
            <Button label="Enregistrer" style="margin-top:1rem;width:40%" :loading="loading" @click="onClick()" />
        </div>
    </div>
</template>
