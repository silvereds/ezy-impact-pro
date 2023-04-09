<script setup lang="ts">
import {reactive} from "vue";
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
const props = defineProps<{itemId?:string, callback?:Function}>()
const data =  reactive<Validation>({
    factorEmission:null,
    source:null,
    hypothesis:'',
    comment:'',
    validateData:true
})
const save = ()=>{
    console.log(data)
    console.log(props)
}
</script>
<template>
        <div class="flex flex-column align-items-center justify-content-center">
            <InputNumber v-model="data.factorEmission" placeholder="Facteur d'emission" size="small" class="validation-input" />
            <InputText v-model="data.source" placeholder="Source de données" class="validation-input"/>
            <Textarea v-model="data.hypothesis" placeholder="Hypothèse" class="validation-textarea"/>
            <Textarea v-model="data.comment" placeholder="Commentaire" class="validation-textarea"/>
            <div class="flex align-items-center validation-textarea">
                <Checkbox :binary="true" v-model="data.validateData" inputId="valid" name="pizza" value="Cheese" />
                <label for="valid" class="ml-2"> valider les informations </label>
            </div>
            <div class="mt-3 flex align-items-center justify-content-center" >
                <Button label="Enregister" @click="save()" />
            </div>
        </div>
</template>

<style lang="scss">
.validation-input{
    margin-top:1rem;
    width:70%;
    height:2.5rem;
}
.validation-textarea{
    margin-top:1rem;
    width:70%;
}
</style>