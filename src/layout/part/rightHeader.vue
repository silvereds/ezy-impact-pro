<script setup>
    import { ref } from "vue";
    import Avatar from "primevue/avatar";
    import Menu from 'primevue/menu';
    import Button from "primevue/button";
    import Divider from 'primevue/divider';
    import useAuthStore from "@/stores/authStore"
    const  auth = useAuthStore()

    const menu = ref();
    const items = ref([
        {
      
            items: [
                {
                    label: 'Profile',
                    icon: 'pi pi-user',
                    command: () => {}
                },
                {
                    label: 'Paramètre',
                    icon: 'pi pi-cog',
                    command: () => {}
                }
            ]
        },
    ]);

const toggle = (event) => {
    menu.value.toggle(event);
};


</script>

<template>
    <div class="flex flex-row">
        <div class="card flex justify-content-center">
            <div class="flex flex-row align-items-center cursor-pointer" @click="toggle" aria-haspopup="true" aria-controls="overlay_menu">
                <Avatar v-badge.danger="4" class="p-overlay-badge" image="https://primefaces.org/cdn/primevue/images/organization/walter.jpg"  shape="circle" />
                <span class="ml-2"> Silvere tchoffo </span>
            </div>
            <Menu ref="menu" id="overlay_menu" :model="items" :popup="true" />
        </div>
        <Divider layout="vertical" />
        <Button label="Déconnexion" icon="pi pi-sign-out" iconPos="right" text @click="auth.logout()" />
    </div>
</template>
