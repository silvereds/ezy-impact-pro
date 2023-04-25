import { defineStore } from 'pinia'
import Api from '@/api/fetchWrapper'
import STATUS from '@/dataType'
import useUiStore from '../ui'
import useAuthStore from '../authStore'

const initialState: any = {}
const mobileEqStore = defineStore('mobileEq', {
  state: () => {
    return {
      data: initialState,
      loading: false,
      onlyFetch:false,
      loadingData:false,
      fetching: false,
      ui: useUiStore(),
      auth:useAuthStore(),
    }
  },
  getters: {
    getMobileEquiment:(state)=>{
      if(!(state.auth.user as any).id){
        return {}
      }
      if(!state.data[(state.auth.user as any).id]){
        return {}
      }
      return state.data[(state.auth.user as any).id]
    },
    select:(state)=>(id:string)=>state.data[(state.auth.user as any).id][id]
  },
  actions: {
    async getData() {
      if ((this.auth?.user as any)?.id && !this.data[(this.auth.user as any).id]) {
        this.loadingData = true
        Api.get({
          url: '/mobileEquipment/enterprise/'+(this.auth.user as any).id,
          onSuccess: (data: any) => {
            const d:any = {}
            data?.forEach((el:any)=>{
              d[el.id] = el
            })
            this.data[(this.auth.user as any).id] = d
            //console.log("fixed equipement list",this.data)
            this.onlyFetch = true
            this.loadingData = false
          },
          onError: (err: any) => {
            console.log('error', err)
            this.onlyFetch = true
            this.loadingData = false
          }
        })
      }
    },
    async addData({ data, callback }: { data: any; callback?: () => void }) {
      try{
        this.loading = true
        
        Api.post({
          url:'/fixedEquipment',
          body:{...data,declarationStatus:STATUS.PENDING},
          onSuccess:(data:any)=>{
            const id = (this.auth.user as any).id
            this.data[id] = {...(this.data[id]||{})}
            this.data[id][`${data.id}`] = {...(data|| {})}
            this.ui.notifySuccess({ message: 'Équipement fixe ajouté', position: 'bottom-center' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("veuillez changer la référence de l' équipement", 'bottom-center')
            console.log("error whwn add fixed Equipement",err)
            this.loading = false
          }
        })
      }catch(err){
        this.ui.notifyError('erreur' + err)
      }
    },
    async updateData({ data, callback, id }: { data: any; callback?: () => void; id: string }) {
      try{
        this.loading = true
        const enterpriseId = (this.auth.user as any).id
        Api.put({
          url:'/fixedEquipment/'+id,
          body:{...data},
          onSuccess:(data:any)=>{
            this.data[`${data.id}`] = {...(data|| {}),}
            this.ui.notifySuccess({ message: 'Mise à jour éffectuer', position: 'bottom-center' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("veuillez changer la référence de l' équipement", 'bottom-center')
            console.log("error whwn add fixed Equipement",err)
            this.loading = false
          }
        })
      }catch(err){
        this.ui.notifyError('erreur' + err)
      }
    }
  }
})
export default mobileEqStore
