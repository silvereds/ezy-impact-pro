<script lang="ts" setup>
import useAuthStore from "@/stores/authStore";
import InputText from "primevue/inputtext"
import Button from "primevue/button"
import {ref} from "vue"

const auth = useAuthStore()
const data = ref({email:'',password:''})
const login = ()=>{
    auth.login(data.value)
}


</script>

<template>
    <div class="flex align-items-center justify-content-center bg-primary" style="height:100vh;width:100vw" >
        <div class="flex flex-row align-items-center justify-content-center ">
            <div class="m-2 flex align-items-center justify-content-center" style="height:30vw; width:40vh">
                
                <h4 class="text-black" style="color:#fff"> Ezy-impact </h4>
            </div>
            
            <div class="flex flex-column gap-4" style="width:30vw">
                <p style="font-size:18px"> Login now </p>
                <InputText v-model="data.email" placeholder="email" />
                <InputText v-model="data.password" placeholder="password" />
                <Button label="Login" severity="secondary" @click="login()" />
            </div>
        </div>
    </div>
</template>