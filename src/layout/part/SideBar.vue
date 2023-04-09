<script setup lang="ts">
import { dashboardRoute , scopeRoute, otherRoute } from '@/router';
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
                            <span class="badge secondary">Beta</span>
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
                <div>
                <img
                    class="react-logo"
                    src="https://user-images.githubusercontent.com/25878302/213938106-ca8f0485-3f30-4861-9188-2920ed7ab284.png"
                    alt="react"
                />
                </div>
                <div style="padding: 0 10px">
                <span style="display: block; margin-bottom: 10px"
                    >Pro sidebar is also available as a react package
                </span>
                <div style="margin-bottom: 15px">
                    <img
                    alt="preview badge"
                    src="https://img.shields.io/github/stars/azouaoui-med/react-pro-sidebar?style=social"
                    />
                </div>
                <div>
                    <a href="https://github.com/azouaoui-med/react-pro-sidebar" target="_blank"
                    >Check it out!</a
                    >
                </div>
                </div>
            </div>
        </div>
    </div>
</aside>
</template>