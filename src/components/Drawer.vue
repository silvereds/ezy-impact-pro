<script lang="ts" setup>
import { toRefs } from "vue";
import Button from "primevue/button";
import Sidebar from 'primevue/sidebar';
import ValidationForm from "@/components/ValidationForm.vue";
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const props = defineProps<{
    selectedId?:string,
    visible:boolean,
    item:any,
    onClose:()=>void, 
    onDelete:(id:string)=>void,
    category:string
}>()
const {visible , selectedId , onClose, category,item} = toRefs(props)



</script>
<template>
    <Sidebar :visible="visible" style="width:50vw" :showCloseIcon="false" position="right">
            <template #header>
                <div class="flex-row-between" style="width:100%">
                    <div class="flex align-items-center flex-row-start">
                        <i class="pi pi-link" style="margin-right:1rem;font-size:40px"></i>
                        <div>
                            <span class="flex align-items-center text-primary" style="font-weight:600">
                                Réference <br/>
                            </span>
                            <span style="font-size:12px;font-weight:400">{{ item?.reference }}</span>
                        </div>
                    </div>
                    <div class="flex">
                        <Button icon="pi pi-trash" severity="danger" label="supprimer" @click="onDelete(selectedId as string)" />
                        <Button text icon="pi pi-times" @click="onClose()" />
                    </div>
                </div>
            </template>
                <div class="card" style="width:100%;height:100%">
                    <TabView>
                        <TabPanel header="Détail" style="background-color:red">
                            
                                <slot name="detail"></slot>
                            
                        </TabPanel>
                        <TabPanel header="Modifier">
                            <slot name="update"></slot>
                        </TabPanel>
                        <TabPanel header="Validation">
                            <ValidationForm :category="category" :itemId="selectedId" />
                        </TabPanel>
                        <TabPanel header="Déclaration">
                            <p> déclaration </p>
                        </TabPanel>
                    </TabView>
                </div>
            
        </Sidebar>
</template>