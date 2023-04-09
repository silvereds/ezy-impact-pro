<script setup lang="ts">
// import Dropdown from 'v-dropdown'
// import Avatar from "primevue/avatar"
import RightHeader from "./rightHeader.vue"
</script>
<template>
    <div>
        <header class="header">
            <div class="search flex-row-between">
                <i class="ri-search-line"></i>
                <input />
            </div>
            <div class="flex-row-between">
                <RightHeader />
            </div>
        </header>
    </div>
</template>