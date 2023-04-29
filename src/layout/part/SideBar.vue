<script setup lang="ts">
import { dashboardRoute , scopeRoute, otherRoute } from '@/router/router';
import useAuthStore from '@/stores/authStore';
import Button from 'primevue/button';
const  auth = useAuthStore()
</script>


<template>
<aside id="sidebar" class="sidebar break-point-lg">
    <a id="btn-collapse" class="sidebar-collapser"><i class="ri-arrow-left-s-line"></i></a>
    <div class="image-wrapper">
        <img src="@/assets/images/sidebar-bg.jpg" alt="sidebar background" />
    </div>
    <div class="sidebar-layout">
        <div class="sidebar-header">
        <div class="pro-sidebar-logo">
            <div>E</div>
            <h5>EZY-Impact</h5>
        </div>
        </div>
        <div class="sidebar-content">
            <nav class="menu open-current-submenu">
                <ul>
                <li class="menu-header"><span> Main </span></li>
                <li class="menu-item" v-for="(route , i) in dashboardRoute" :key="i">
                    <RouterLink :to="route.path">
                        <span class="menu-icon">
                            <i class="ri-apps-2-fill"></i>
                        </span>
                        <span class="menu-title"> {{  route?.title }} </span>
                        <span class="menu-suffix">
                            <span class="badge secondary">Pro</span>
                        </span>
                    </RouterLink>
                </li>
                <!-- configuration block -->
                <li class="menu-header"><span> Configuration </span></li>
                <li class="menu-item sub-menu" v-for="(route , i) in scopeRoute" :key="i">
                    <a href="#">
                        <span class="menu-icon">
                            <i :class="route.icon"></i>
                        </span>
                        <span class="menu-title">{{  route.title }}</span>
                    </a>
                    <div class="sub-menu-list">
                    <ul>
                        <li class="menu-item" v-for="(subRoute , i) in route.children" :key="i">
                            <RouterLink :to="subRoute.path">
                                <span class="menu-icon">
                                    <i class="ri-arrow-right-line"></i>
                                </span>
                                <span class="menu-title"> {{ subRoute.title }}</span>
                            </RouterLink>
                        </li>
                    </ul>
                    </div>
                </li>

                <li class="menu-header"><span> Calculs </span></li>
                <li class="menu-item" v-for="(route , i) in otherRoute" :key="i">
                    <RouterLink :to="route.path">
                        <span class="menu-icon">
                            <i :class="route.icon"></i>
                        </span>
                        <span class="menu-title"> {{  route?.title }} </span>
                        <!-- <span class="menu-suffix">
                            <span class="badge secondary"></span>
                        </span> -->
                    </RouterLink>
                </li>
              </ul>
            </nav>
        </div>
        <div class="sidebar-footer">
            <div class="footer-box">
               <Button 
                    label="Nouveau Champs " 
                    icon="pi pi-plus" 
                    iconPos="left" 
                    text 
                    style="width:100%;color:#fff;border-radius:0px;height:3rem;text-align:left;background:#0b1a2c"
                />
            </div>
            <div class="footer-box">
               <Button 
                    label="Déconnexion" 
                    icon="pi pi-sign-out" 
                    iconPos="left" 
                    text 
                    style="width:100%;color:#fff;border-radius:0px;height:3rem;text-align:left;background:#0b1a2c"
                    @click="auth.logout()" 
                />
            </div>
        </div>
    </div>
</aside>
</template>