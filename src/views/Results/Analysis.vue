<script setup lang="ts">
import {ref, onMounted, reactive} from "vue";
import OverlayPanel from 'primevue/overlaypanel';
import Dropdown from 'primevue/dropdown';
import Button from "primevue/button";
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';
import { SCOPE } from "@/dataType";

const category = ref({
    [SCOPE.FIXE_EQUIPMENT]:{name:'Équipement fixes'},
    [SCOPE.MOBILE_EQUIPMENT]:{name:'Équipement mobiles'},
    [SCOPE.ELECTRICAL_EQUIPMENT]:{name:'Équipement électriques'},
    [SCOPE.COLD_HEAT_EQUIPMENT]:{name:'Équipement froid et chaleur'},
    [SCOPE.INDUSTRIAL_ACTIVITIES]:{name:'Activités industrielle'},
    [SCOPE.GES_ACTIVITIES]:{name:'Activités emettrices des GES'},
    [SCOPE.BIOMAS_ACTIVITIES]:{name:'Activités liées à la biomasse'}

})

const selectedItems = reactive<any>({})
const dates = ref();
const type = ref()
const labels = ref(['Jan','Feb','Mar'])

const op = ref();
const toggle = (event:any) => {
    op.value.toggle(event);
}

const chartData = ref({
    labels: labels.value,
    datasets: [
        {
            label:"empreinte carbone 500 kgCo2e ",
            data: [540, 325, 702],
            backgroundColor: ['#75bef8', '#a0d2fa', '#cae6fc'],
            tension: 0.4
        }
    ]
});

const chartOptions = ref({
    maintainAspectRatio: false,
    aspectRatio: 1,
    scales: {
        y: {
            beginAtZero: true
        }
    }
});

</script>
<template>
    <div style="height:100%">
        <div class="bg-white flex flex-row justify-content-between align-items-center pl-2 pr-3 py-3">
            <div class="flex flex-row align-items-center header-content">
                <i class="ri-bar-chart-2-fill mr-2" style="font-size:1.5rem"></i> 
                <span class="mr-2">
                    Résultats d'analyse
                </span>
            </div>
        </div>
        <div class="grid pa-2 mt-1" :style='{overflowY:"auto",paddingBottom:"1rem",height:"95%"}'>
            <div class="col md:col-8 xl:col-8  h-100 bg-white">
                <div class="card flex align-items-center justify-content-between">
                    <div class="flex align-items-center w-100">
                        <label class="mr-2"> Période </label>
                        <Calendar style="width:50%;font-size:14px;height:2.5rem" v-model="dates" selectionMode="range" :manualInput="false" showButtonBar />
                    </div>
                    <div>
                        <Button icon="pi pi-filter" severity="info" label="filtrer" @click="toggle" />
                        <OverlayPanel ref="op">
                            <Dropdown v-model="type"  :options="['type1','type2','type3']"  placeholder="type" class="w-full" />
                            <Button icon="pi pi-plus" severity="secondary" label="Ajouter" @click="toggle" class="w-full mt-2" />
                        </OverlayPanel>
                    </div>
                </div>

                <div class="card">
                    <Chart type="line" :data="chartData" :options="chartOptions" :height="500" :width="600" />
                </div>
            </div>
            <div class="col md:col-4 xl:col-4 bg-white">
                    <div class="card">
                        <div class="card-header">
                            <div class="flex align-items-center justify-content-end">
                                <h3> Catégory </h3>
                            </div>
                        </div>
                        <div>
                            <div 
                                v-for="[key,val] in (Object as any).entries(category)" 
                                :key="key"
                                @click="selectedItems[key] ? delete selectedItems[key] : selectedItems[key] = key" 
                                class="flex justify-content-end align-items-center w-100 pa-1 pointer"
                                :style="{
                                    backgroundColor:selectedItems[key] ? '#eef0fa' : '#fff',
                                    padding:'1rem 0rem 1rem 0rem',
                                    marginTop:'10px',
                                    borderRadius:'5px'
                                }"
                            >
                                <div class="flex align-items-center">
                                    <i class="pi pi-plus ml-2"></i>
                              
                                    <div class="mx-2" >
                                        <span class="value-building" style="font-size:16px"> {{ val?.name }} </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
            </div>
        </div>
    </div>
    
</template>