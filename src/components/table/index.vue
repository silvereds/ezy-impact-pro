<template>
    <div>
        <DataTable 
            ref="dt" 
            scrollable 
            scrollHeight="500px" 
            paginator 
            :rows="10" 
            :rowsPerPageOptions="[10, 20]" 
            class="p-datatable-sm" 
            :value="props.data" 
            tableStyle="min-width: 50rem"
            :loading="loading"
        >
            <template #header>
                <div class="flex flex-wrap align-items-center justify-content-between gap-2 mb-3 table-header p-1">
                    <div>
                        <span class="text-md text-900">{{ props.title}}  </span><br/>
                        <span class="text-xs font-light"> {{ props?.subtitle }} </span>
                    </div>
                    <div class="flex flex-row">
                        <div class="p-inputgroup flex-1">
                            <span class="p-inputgroup-addon bg-primary">
                                <i class="pi pi-filter"></i>
                            </span>
                            <Dropdown 
                                v-model="selectedStatus" 
                                :options="status" 
                                optionLabel="name" 
                                placeholder="Filtrer par status" 
                                class="w-full md:w-14rem mr-3 text-sm"
                                
                            >
                                <template #value="slotProps">
                                    <div v-if="slotProps.value" class="flex align-items-center">
                                        <div>{{ slotProps.value.label }}</div>
                                    </div>
                                    <span v-else>
                                        {{ slotProps.placeholder }}
                                    </span>
                                </template>
                                <template #option="slotProps">
                                    <div class="flex align-items-center">
                                        <span class="flex align-items-center justify-content-center mr-3" :style="slotProps.option.style"> {{ slotProps.option.code }}</span>
                                        <div>{{ slotProps.option.label }}</div>
                                    </div>
                                </template>
                            </Dropdown>
                        </div>
                        <Button size="small" icon="pi pi-plus"  label="Nouveau" @click="props?.onNew?.()" />
                        <Button size="small" class="ml-3" icon="pi pi-download" rounded @click="exportCSV()"  />
                    </div>
                </div>
            </template>
            <template #empty>
                <div style="height:400px" class="flex flex-column align-items-center justify-content-center">
                    <div>
                        <EmptyImage  />
                    </div>
                    <p style="color:#7d84ab;font-size:18px">Tableau vide</p>
                    <p style="color:silver;font-size:12px">cliquer sur nouveau pour ajouter un nouvel élément </p>
                </div>
            </template>
            <Column field="reference" header="Référence">
                <template #body="slotProps">
                    <div class="flex flex-row">
                        <i class="pi pi-link px-2" />
                        {{  slotProps.data.reference }}
                    </div>
                </template>
            </Column>
            <Column header="Status" key="status">
               <template #body="slotProps">
                    <span class="px-1" :style="getStatusStyle(slotProps.data.declarationStatus)">
                        {{  (nameStatus as any)?.[slotProps.data.declarationStatus]?.toLowerCase() }}
                    </span>
                </template>
            </Column>
            <Column v-for="column in columns" :field="column.key" :header="column.title" :key="column.key">
                <template #body="slotProps">
                    <span>
                        {{ column?.formatter ? column.formatter(slotProps.data[column.key]): slotProps.data[column.key]}}
                    </span>
                </template>
            </Column>
            <Column header="Action">
                <template #body="slotProps">
                    <div class="flex flex-row justify-content-end">
                        <Button size="small" style="background-color:#E5E3F1" icon="pi pi-eye" label="Voir" @click="props?.onShow?.(slotProps.data.id)" text />
                       
                        <!-- <Button severity="danger"  size="small" class="ml-2" icon="pi pi-trash" rounded @click="props?.onDelete?.(slotProps.data.id)"  /> -->
                    </div>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup lang="ts">
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown'  // optional
import EmptyImage from '@/assets/icons/empty.vue';

import STATUS from "@/dataType"
import { ref , watch} from 'vue';

const dt = ref()
const exportCSV = () => {
    dt.value.exportCSV();
};
const selectedStatus = ref();
const status = ref([
    { name: STATUS.ALL,label:'Tout' , code: 't', style:{background:'silver',borderRadius:'5px',height:'1.5rem',width:'1.5rem'} },
    { name: STATUS.DRAFT,label:"Brouillon", code: 'b', style:{background:'#ffcdd2',borderRadius:'5px',width:'1.5rem', height:'1.5rem',color:'#c63737'}},
    { name: STATUS.PENDING,label:"En Attente", code: 'c',style:{background:'#abc9fb',borderRadius:'5px',width:'1.5rem',height:'1.5rem' , color:'#204887'} },
    { name: STATUS.VALIDATED, label:"valides", code: 'v',style:{background:'#a0e6ba',borderRadius:'5px',width:'1.5rem',height:'1.5rem',color:'#136c34'} },
]);

const nameStatus = {
    [STATUS.DRAFT]:"Brouillon",
    [STATUS.PENDING]:"En Attente",
    [STATUS.VALIDATED]:"validé",
}

function getStatusStyle(status:string){
    if(status === STATUS.DRAFT){
        return {background:'#ffcdd2',borderRadius:'5px',color:'#c63737'}
    }
    if(status === STATUS.PENDING){
        return {background:'#abc9fb',borderRadius:'5px' , color:'#204887'}
    }
    if(status === STATUS.VALIDATED){
        return {background:'#a0e6ba',borderRadius:'5px',color:'#136c34'}
    }
    return {}
}

const props = defineProps<{
    title: string
    loading?:boolean
    subtitle: string
    onDelete?:(id:string)=>void
    onShow?:(id:string)=>void
    onEdit?:(id:string)=>void
    onNew?:()=>void
    onStatusChange?:(status:string)=>void
    onPageChange?:(page:number)=>void
    columns:any[]
    data:any[]
}>()

watch(selectedStatus , (newSelected,prevSelected)=>{
    props?.onStatusChange?.(newSelected.value?.name)
    console.log(prevSelected)
})

</script>