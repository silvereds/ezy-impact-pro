<script setup lang="ts">
import {toRefs} from "vue"
const props =defineProps<{
    icon? : string,
    title : string,
    value : string|number
}>()

const {icon , title , value} = toRefs(props)
</script>
<template>
    <div class="card card-detail flex align-items-center justify-content-start full-width bg-silver pa-2">
        <div>
            <i :class="(icon ? icon : 'pi pi-tag')+' mr-2'"></i>
        </div>
        <div>
            <span class="text-title"> {{ title }} </span><br/>
            <span> {{ value }} </span>
        </div>
    </div>
</template>