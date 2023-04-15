
<script setup lang="ts">
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart';
onMounted(() => {
    chartData.value = setChartData();
});

const chartData = ref();
const chartOptions = ref({
    plugins: {
        legend: {
            labels: {
                usePointStyle: true
            }
        }
    }
});

const setChartData = () => {
    const documentStyle = getComputedStyle(document.body);

    return {
        labels: ['FIXES', 'MOBILES', 'ELECTRIQUES',"FROID CHALEURS"],
        datasets: [
            {
                data: [540, 325, 702,300],
                backgroundColor: [
                    documentStyle.getPropertyValue('--blue-500'), 
                    documentStyle.getPropertyValue('--yellow-500'), 
                    documentStyle.getPropertyValue('--green-500'),
                    documentStyle.getPropertyValue('--green-400'),
                ],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
            }
        ]
    };
};
</script>
<template>
    <div class="card flex justify-content-center">
        <Chart type="doughnut" :data="chartData" :options="chartOptions" class="w-full md:w-30rem" />
    </div>
</template>

