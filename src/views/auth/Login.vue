<script lang="ts" setup>
import useAuthStore from "@/stores/authStore";
import {ref} from "vue"

const auth = useAuthStore()
const data = ref({email:'impact.cogit@gmail.com',password:'12345678'})
const login = ()=>{
    auth.login(data.value)
}


</script>

<template>
<div class="px-5 min-h-screen flex justify-content-center align-items-center bg-primary">
    <div class="border-1 surface-border surface-card border-round py-7 px-4 md:px-7 z-1">
        <div class="mb-4">
            <div class="text-900 text-xl font-bold mb-2">Connexion</div>
            <span class="text-600 font-medium">Veuillez saisir vos données</span>
        </div>
        <div class="flex flex-column">
            <span class="p-input-icon-left w-full mb-4">
                <i class="pi pi-envelope"></i>
                <input v-model="data.email" class="p-inputtext p-component w-full md:w-25rem" id="email" type="text" placeholder="Email">
            </span>
            <span class="p-input-icon-left w-full mb-4">
                <i class="pi pi-lock"></i>
                <input v-model="data.password" class="p-inputtext p-component w-full md:w-25rem" id="password" type="password" placeholder="Password">
            </span>
            <div class="mb-4 flex flex-wrap gap-3">
                <div>
                    <div class="p-checkbox p-component p-checkbox-checked mr-2">
                        <div class="p-hidden-accessible"><input type="checkbox" name="checkbox"></div>
                        <div class="p-checkbox-box p-highlight">
                            <span class="p-checkbox-icon pi pi-check"></span>
                        </div>
                    </div>
                    <label for="checkbox" class="text-900 font-medium mr-8"> Se Souvenir de moi </label>
                </div>
                
            </div>
            <button class="p-button p-component w-full" type="button" aria-label="Log In" @click="login()">
                <span class="p-button-label"> Se Connecter</span>
                <span class="p-ink" role="presentation" aria-hidden="true"></span>
            </button>
        </div>
    </div>
</div> 
</template>