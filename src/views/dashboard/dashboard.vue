<script setup lang="ts">
import {ref , computed} from "vue";
import NoSelect from "@/components/NoSelect.vue"
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Paginator from 'primevue/paginator';
import Dialog from 'primevue/dialog';
import AddEditBuilding from "./components/AddEditBuilding.vue";
import buildingStore from "@/stores/BUILDING/store";
import StatCard from "./components/StatCard.vue"
import Graph from "./components/Graph.vue"
import "./index.scss"
import useUiStore from "@/stores/ui";
import useAuthStore from "@/stores/authStore";

const store = buildingStore()
const ui = useUiStore()
const auth = useAuthStore()
const rowPerPage = ref(10)
const page = ref(0)
const showEdit = ref(false)
const showAdd = ref(false)
const searchText = ref<string>('')
const selectedId = ref()
const filterData = computed(()=>{
    const storeData = store.getBuilding
    const d = (Object as any).values(storeData)
    return d.filter((el:any)=>el?.nameOfTheSite?.toLowerCase()?.includes(searchText.value?.toLowerCase()))
})
const statData = computed(()=>{
    let nbEquip:number = 0;
    let nbAct:number = 0;

    (Object as any).entries(ui.stat).forEach(([key,val]:any)=>{
        if(key.toLowerCase().includes("equipment")){
            nbEquip = nbEquip + val?.total
        }else{
            nbAct = nbAct + val.total
        }
    
    })
    return {nbEquip, nbAct}
})
// watch(()=>auth.user,(newUser,prevUser)=>{
//     console.log("new user")
// })
</script>
<template>
    
    <div class="mt-2" style="height:100%">
        <div class="bg-white flex flex-row justify-content-between align-items-center px-3 header-content">
            <h4> Tableau de bord </h4>
        </div>
        <div v-if="auth.user">
            <div class="content-main">
                <div class="grid w-100 mt-3 pa-2" >
                    <StatCard title="bâtiment" :value="(Object as any).values(store.getData()).length" barColor="#2f8ee5" />
                    <StatCard title="Équipements" :value="statData?.nbEquip || 0" barColor="#00acac" />
                    <StatCard title="Activités" :value="statData?.nbAct || 0" barColor="#f1b263" />
                    <StatCard title="Total" :value="(statData?.nbEquip || 0)+(statData?.nbAct || 0)" barColor="#2f8ee5" />
                </div>
                <div class="card px-2 pt-2">
                    <div class="grid m-2 bg-white">
                        <div class="md:col-7 lg:col-6 card bg-white" style="padding-inline:2rem">
                            <div class="card">
                                <div class="card-header mt-2 mb-2">
                                    <div class="flex align-items-center justify-content-between">
                                        <h3>Bâtiments</h3>
                                        <span class="p-input-icon-left" style="width:60%">
                                            <i class="pi pi-search" />
                                            <InputText class="p-inputtext-sm" v-model="searchText" placeholder="Search" style="border-radius:20px;width:100%" />
                                        </span>
                                    </div>
                                    <Button label="nouveau batiment" icon="pi pi-plus" @click="showAdd = true" />
                                </div>
                               
                                <div style="padding:1rem 1rem 3rem 1rem;">
                                    
                                    <div>
                                        <div v-if="filterData.length === 0" class="flex align-items-center justify-content-center">
                                            Aucunes données 
                                        </div>
                                        <div v-else>
                                            <div
                                            
                                                v-for="building in filterData?.slice(page*rowPerPage,(page+1)*rowPerPage)" 
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
                                                    <span class="value-building"> {{ building?.nameOfTheSite }} </span>
                                                </div>
                                                <div class="mx-2">
                                                    <span class="title">Superficie</span><br/>
                                                    <span class="value-building"> {{ building?.area}} m2 </span>
                                                </div>
                                            </div>
                                            <div class="card">
                                                <Paginator 
                                                    @page="(PaginatorInfo:any)=>page = PaginatorInfo.page"
                                                    @update:rows="(row:number)=>rowPerPage = row" 
                                                    :rows="rowPerPage" 
                                                    :totalRecords="filterData?.length" 
                                                    :rowsPerPageOptions="[10, 1, 30]"
                                                >
                                                </Paginator>
                                            </div>
                                        </div>
                                        
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                        <div class="md:col-5 lg:col-6 card" style="padding:0">
                            <div class="px-1 bg-white">
                                <Graph :statData="ui.stat" />
                            </div>
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
        <NoSelect v-else />
    </div>
    
</template>
