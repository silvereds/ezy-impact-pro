<script setup lang="ts">
import OverlayPanel from 'primevue/overlaypanel';
import RightHeader from "./rightHeader.vue"
import useAuthStore from '@/stores/authStore';
import Avatar from "primevue/avatar"
import { storeToRefs } from 'pinia';
import {ref} from "vue"

const op = ref();
const toggle = (event:any) => {
    op.value.toggle(event);
}

const auth = useAuthStore()
const {userList, current:selected} = storeToRefs(auth)
</script>
<template>
    <div>
        <header class="header">
            <div class="flex-row-between">
                <button class="w-full p-link flex align-items-center p-2 pl-3 text-color  bg-silver" @click="toggle">
                    <div v-if="selected" class="flex align-items-center text-color">
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                        <div class="flex flex-column align">
                            <span class="font-bold"> {{ (selected as any)?.name}} </span>
                            <span class="text-sm">Entreprise</span>
                        </div>
                    </div>
                    <div v-else>
                        cliquer ici pour selectionner un utilsateur
                    </div>
                </button>
                <OverlayPanel ref="op">
                    <div 
                        class="flex align-items-center p-2 pl-3" 
                        v-for="(item,key) in userList" 
                        :key="key" 
                        :style="{cursor:'pointer', backgroundColor:(selected as any)?.id === item?.id ? '#d0e1fd':'#fff'}" 
                        @click="auth.setCurrent(item)"
                    >
                        <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" class="mr-2" shape="circle" />
                        <div class="flex flex-column align">
                            <span class="font-bold">{{ item?.name}}  </span>
                            <span class="text-sm">Agent</span>
                        </div>
                    </div>
                </OverlayPanel>
            </div>
            <div class="flex-row-between">
                <RightHeader />
            </div>
        </header>
    </div>
</template>