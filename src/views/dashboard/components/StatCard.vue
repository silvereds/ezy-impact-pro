<script setup lang="ts">
    const props = defineProps<{
        title:string,
        value:number,
        barColor:string,
    }>()
</script>
<template>

    <div class="col-12 md:col-12 xl:col-3">
        <div class="card w-100 stat-card">
            <div class="card-header flex align-items-start justify-content-between w-100">
                <p class="text-title" style="margin:0">
                    {{props.title}}
                </p>
                <div class="header-buttons">
                    <a href="#" class="flex align-items-center justify-content-center bg-white">
                        <i class="pi pi-arrow-up rotate-30"></i>
                    </a>
                </div>
            </div>
            <div class="flex align-items-center justify-content-between my-1">
                <p style="font-weight:600;font-size:1.75rem">
                    {{ props.value }}
                </p>
                <div class="card flex align-items-end justify-content-between stat-graph">
                    <span :style="{height:'12px',backgroundColor:barColor}"></span>
                    <span :style="{height:'40px',backgroundColor:barColor}"></span>
                    <span :style="{height:'30px',backgroundColor:barColor}"></span>
                    <span :style="{height:'40px',backgroundColor:barColor}"></span>
                    <span :style="{height:'30px',backgroundColor:barColor}"></span>
                    <span :style="{height:'60px',backgroundColor:barColor,opacity:1}"></span>
                </div>
            </div>
            <div class="flex align-items-center justify-content-between my-1">
                <span style="font-size:13px">
                    <i class="pi pi-arrow-up" style="color:#00acac"></i> 
                    <span style="color:#00acac">55%</span> 
                    increase in today sales
                </span>
            </div>
        </div>
    </div>
</template>