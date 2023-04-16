<script setup lang="ts">
import {ref, onMounted} from "vue";
import Button from "primevue/button";
import Chart from 'primevue/chart';
import Calendar from 'primevue/calendar';

const dates = ref();

const chartData = ref({
    labels: [
        'Équipement fixes', 
        'Équipement mobiles', 
        'Équipement électriques', 
        'Équipement froid et chaleur', 
        'Activités industrielle ', 
        'GES', 
        'Activités liées à la biomasse',
    ],
    datasets: [
        {
            label:"empreinte carbone 500 kgCo2e ",
            data: [540, 325, 702, 620,700,600,500],
            backgroundColor: ['#75bef8', '#a0d2fa', '#cae6fc', '#fef0cd','#1769aa','#c2eff5','#00a0b4'],            
        }
    ]
});

const circleChartData = ref({
        datasets: [
        {
            label:"empreinte carbone 500 kgCo2e ",
            data: [540, 325, 702, 620,700,600,500],
            backgroundColor: ['#75bef8', '#a0d2fa', '#cae6fc', '#fef0cd','#1769aa','#c2eff5','#00a0b4'],  
        }
    ]
})

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
                    Résultats Goblal
                </span>
            </div>
        </div>
        <div class="grid pa-2 mt-1 bg-white" style="overflow-y:auto;padding-bottom:1rem;height:95%">
            <div class="col md:col-7 xl:col-7  h-100 bg-white">
                <div class="card flex align-items-center justify-content-start">
                    <label class="mr-2"> Période </label>
                    <Calendar style="width:50%;height:2.5rem" v-model="dates" selectionMode="range" :manualInput="false" showButtonBar />
                </div>
                <div class="card">
                    <Chart type="bar" :data="chartData" :options="chartOptions" :height="600" :width="600" />
                </div>
            </div>
            <div class="md:col-5  xl:col-5 flex flex-column align-items-start justify-content-start bg-white">

                <div class="card pa-2" style="width:100%">
                    <div class="card-header">
                        <span>Empreinte carbone</span><br/>
                        <span>26 May 2023 - 27 Mai 2023</span>
                    </div>
                    <div class="flex align-items-center">
                        <div style="height:10rem;width:10rem">
                            <Chart type="doughnut" :data="circleChartData" :options="{cutout: '50%'}" :width="100" :height="100"  />
                        </div>
                        <div class="flex flex-column gap-1">
                            <Button label="Équipement" severity="secondary"  />
                            <Button label="Activité"  severity="secondary" />
                        </div>
                    </div>
                </div>
                <div class="card pa-2"  style="background-image:linear-gradient(134deg, #13518a, #1b74c5 99%);color:#fff">
                    <div class="card-header">
                        <span>Total</span><br/>
                        <span>26 May 2023 - 27 Mai 2023</span>
                    </div>
                    <div>
                        <Chart type="doughnut" :data="circleChartData" :options="{cutout: '50%'}" :width="100" :height="100"  />
                    </div>
                </div>
            </div>
        </div>
    </div>
    
</template>