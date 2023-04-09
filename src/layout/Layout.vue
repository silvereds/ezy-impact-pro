<script setup lang="ts">

import SideBar from "./part/SideBar.vue"
import Header from "./part/Header.vue"
import initUiManipulation from "@/utils/ui"
import {onMounted} from "vue";

onMounted(()=>initUiManipulation())
</script>
<template>
    <div class="layout has-sidebar fixed-sidebar fixed-header">
      <SideBar />
      <div id="overlay" class="overlay"></div>
      <div class="layout">
        <main class="content">
          <div>
            <a id="btn-toggle" href="#" class="sidebar-toggler break-point-lg">
              <i class="ri-menu-line ri-xl"></i>
            </a>
            <Header />
            <div class="main-content">
              <RouterView></RouterView>
            </div>
          </div>
        </main>
        <div class="overlay"></div>
      </div>
    </div>
</template>