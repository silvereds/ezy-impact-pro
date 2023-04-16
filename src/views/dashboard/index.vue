<script setup lang="ts">
import {ref , reactive} from "vue";
import {storeToRefs} from "pinia";
import useUiStore from "@/stores/ui"
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import AddEditBuilding from "./components/AddEditBuilding.vue";
import buildingStore from "@/stores/BUILDING/store";
import StatCard from "./components/StatCard.vue"
import Graph from "./components/Graph.vue"
import "./index.scss"

const store = buildingStore()
const {data} = storeToRefs(store)
console.log(data.value)

const ui = useUiStore()
const showEdit = ref(false)
const showAdd = ref(false)
const searchText = ref(null)
const selectedId = ref()


</script>
<template>
    <div class="mt-2 h-100" style="height:100%">
        <div class="bg-white flex flex-row justify-content-between align-items-center px-3">
            <h4> Tableau de bord </h4>
        </div>
        <div class="grid w-100 mt-3 pa-2" >
            <StatCard title="bâtiment" :value="4" barColor="#2f8ee5" />
            <StatCard title="Équipements" :value="2" barColor="#00acac" />
            <StatCard title="Activités" :value="4" barColor="#f1b263" />
            <StatCard title="Total" :value="10" barColor="#2f8ee5" />
        </div>
        <div class="card px-2 pt-2">
            <div class="grid m-2">
                <div class="md:col-7 lg:col-6 card bg-white" style="padding-inline:2rem">
                    <div class="card">
                        <div class="card-header mt-2 mb-2">
                            <div class="flex align-items-center justify-content-between">
                                <h3> Liste des batiments</h3>
                                <span class="p-input-icon-left" style="width:60%">
                                    <i class="pi pi-search" />
                                    <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
                                </span>
                            </div>
                            <Button label="nouveau batiment" icon="pi pi-plus" @click="showAdd = true" />
                        </div>
                        <div style="padding:1rem 1rem 3rem 1rem;">
                            <div 
                                v-for="building in (Object as any).values(data)" 
                                :key="building?.id"
                                @click="selectedId = building?.id;showEdit=true" 
                                class="flex justify-content-between align-items-center w-100 mt-4 pointer"
                            >
                                <div class="flex align-items-center">
                                    <img src="https://poseidon.primevue.org/layout/images/dashboard/image-product-1.png"/>
                                    <div class="mx-2" >
                                        <span class="title">réference</span><br/>
                                        <span class="value-building"> {{ building?.reference }} </span>
                                    </div>
                                </div>
                                <div class="mx-2">
                                    <span class="title">Nom du site</span><br/>
                                    <span class="value-building"> {{ building?.name }} </span>
                                </div>
                                <div class="mx-2">
                                    <span class="title">Superficie</span><br/>
                                    <span class="value-building"> {{ building?.area}} m2 </span>
                                </div>
                            </div>
                        </div>
                        <div class="card">
                            <Paginator :rows="10" :totalRecords="(Object as any).values(data).length" :rowsPerPageOptions="[10, 20, 30]"></Paginator>
                        </div>
                    </div>
                </div>
                <div class="md:col-5 lg:col-6 card bg-silver" style="padding:0">
                    <div class="px-1" style="background-color:#ebf8f8">
                        <Graph />
                    </div>
                </div>
            </div>
        </div>
        <Dialog v-model:visible="showEdit" modal header="Mise à jour">
            <AddEditBuilding :defaultId="selectedId" :callback="()=>showEdit = false" />
        </Dialog>
        <Dialog header="Nouveau Bâtiment" v-model:visible="showAdd" modal>
            <AddEditBuilding  :callback="()=>showAdd = false"/>
        </Dialog>
    </div>
    
</template>
