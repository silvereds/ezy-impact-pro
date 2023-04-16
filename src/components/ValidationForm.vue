<script setup lang="ts">
import {ref, toRefs, onMounted} from "vue";
import InputNumber from 'primevue/inputnumber';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

interface Validation{
    factorEmission:number|null,
    source:string|null,
    hypothesis?:string,
    comment?:string,
    validateData:boolean,
}
const props = defineProps<{category:string , itemId?:string}>()
const {category , itemId } = toRefs(props)
const data =  ref<Validation>({
    factorEmission:null,
    source:null,
    hypothesis:'',
    comment:'',
    validateData:true
})
const save = ()=>{
 
}

onMounted(()=>{
    console.log("on validation form", itemId?.value, category.value)
})



</script>
<template>
        <div class="flex flex-column align-items-center justify-content-center">
            <div class="surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
                <InputNumber class="p-inputtext p-component w-full md:w-25rem" v-model="data.factorEmission" placeholder="Facteur d'emission" size="small" />
                <InputText v-model="data.source" placeholder="Source de données" class="p-inputtext p-component w-full md:w-25rem mt-2"/>
                <Textarea v-model="data.hypothesis" placeholder="Hypothèse" class="p-inputtext p-component w-full md:w-25rem mt-2"/>
                <Textarea v-model="data.comment" placeholder="Commentaire" class="p-inputtext p-component w-full md:w-25rem"/>
                <div class="flex align-items-center validation-textarea">
                    <Checkbox :binary="true" v-model="data.validateData" inputId="valid" name="pizza" value="Cheese" />
                    <label for="valid" class="ml-2"> valider les informations </label>
                </div>
                <div class="mt-3 flex align-items-center justify-content-center" >
                    <Button label="Enregister" @click="save()" />
                </div>
            </div>
        </div>
</template>

<style lang="scss">
.validation-input{
    margin-top:1rem;
    width:50%;
    height:2.5rem;
}
.validation-textarea{
    margin-top:1rem;
    width:50%;
}
</style>