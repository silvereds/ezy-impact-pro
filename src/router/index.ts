import { createRouter, createWebHistory } from 'vue-router'
import Layout from '../layout/Layout.vue'
import Page1 from '../views/page1/index.vue'
import Page2 from '../views/page2/index.vue'
import Page3 from '../views/page3/index.vue'
import Page4 from '../views/page4/index.vue'
import Page5 from '../views/page5/index.vue'
import Page6 from '../views/page6/index.vue'
import Page7 from '../views/page7/index.vue'
import Validation from '../views/Validation/index.vue'
import Declaration from '../views/Declaration/index.vue'
import Results from '../views/Results/index.vue'
import Analysis from '../views/Results/Analysis.vue'
import Dashboard from '../views/dashboard/index.vue'
import NotFound from '../views/notFound/NotFound.vue'
import useUiStore from '@/stores/ui'
import useAuthStore from '@/stores/authStore'
import buildingStore from '@/stores/BUILDING/store'
import Login from '../views/auth/Login.vue'

function requireAuth(to: any) {
  // const accessToken = import.meta.env.VITE_ACCESS_TOKEN
  const auth = useAuthStore()
  const ui = useUiStore()
  const buildStore = buildingStore()

  if (!auth.isAuth && to.name !== 'Login') {
    console.log('not authenticated redirection to login page')
    return { name: 'Login' }
  }
  buildStore.getData()
}

const authRoute = [
  {
    path: '/Login',
    name: 'Login',
    component: Login
  }
]

export const dashboardRoute = [
  {
    path: '/dashboard',
    name: 'dashboard',
    title: 'tableau de bord',
    icon: 'mdi mdi-cube menu-icon',
    component: Layout,
    children: [{ path: '', component: Dashboard }]
  }
]

export const otherRoute = [
  // {
  //   path: '/validation',
  //   title: 'Validation',
  //   name: 'validation',
  //   icon: 'ri-list-check-2',
  //   component: Layout,
  //   children: [{ path: '', component: Validation }]
  // },
  // {
  //   path: '/declaration',
  //   name: 'declaration',
  //   title: 'Déclaration',
  //   icon: 'ri-list-check',
  //   component: Layout,
  //   children: [{ path: '', component: Declaration }]
  // },
  {
    path: '/resultat',
    name: 'result',
    title: 'Résultat Global',
    icon: 'ri-bar-chart-2-fill',
    component: Layout,
    children: [{ path: '', component: Results }]
  },
  {
    path: '/resultat-analyse',
    name: 'result-analysis',
    title: 'Résultat et  Analyse',
    icon: 'ri-list-check-2',
    component: Layout,
    children: [{ path: '', component: Analysis }]
  }
]

export const scopeRoute = [
  {
    path: '/Equipment',
    name: 'Equipment',
    title: 'Équipements',
    icon: 'ri-send-to-back',
    component: Layout,
    children: [
      {
        path: '/fixes',
        title: 'Fixes',
        name: 'fixeEquipment',
        component: Page1
      },
      {
        path: '/mobiles',
        title: 'Mobiles',
        name: 'mobileEquipment',
        component: Page2
      },
      {
        path: '/electriques',
        title: 'Électriques',
        name: 'electricalEquipment',
        component: Page3
      },
      {
        path: '/froidChaleur',
        title: 'Froid Chaleur',
        name: 'coldHeatEquipment',
        component: Page4
      }
    ]
  },
  {
    path: '/activities',
    name: 'Activities',
    title: 'Activités',
    icon: 'ri-body-scan-fill',
    component: Layout,
    children: [
      {
        path: '/act_industrielle',
        name: 'industrialActivities',
        title: 'Industrielles',
        component: Page5
      },
      {
        path: '/act_fugitives',
        title: 'À Emission des GES',
        name: 'fugitiveActivities',
        component: Page6
      },
      {
        path: '/act_biomasse',
        title: 'Biomasse',
        name: 'biomassActivities',
        component: Page7
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Layout
    },
    ...dashboardRoute,
    ...scopeRoute,
    ...otherRoute,
    ...authRoute,
    {
      path: '/:catchAll(.*)',
      component: NotFound,
      name: 'NotFound'
    }
  ]
})
router.beforeEach(requireAuth)
export default router
