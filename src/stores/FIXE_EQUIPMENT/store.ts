import { defineStore } from 'pinia'
import STATUS from '@/dataType'
import useUiStore from '../ui'
import Api from '@/api/fetchWrapper'

const initialState: any = {}

const fixeEqStore = defineStore('fixeEq', {
  state: () => {
    return {
      data: initialState,
      loading: false,
      loadingData:false,
      onlyFetch: false,
      ui: useUiStore()
    }
  },
  getters: {
    getFormatted: (state) => {
      return state.data
    }
  },
  actions: {
    async getData() {
      if (!this.onlyFetch) {
        this.loadingData = true
        Api.get({
          url: '/fixedEquipment/enterprise/1',
          onSuccess: (data: any[] = []) => {
            data?.forEach((el:any)=>{
              this.data[el.id] = el
            })
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
            this.data[`${data.id}`] = {...(data|| {})}
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
        
        Api.put({
          url:'/fixedEquipment/'+id,
          body:{...data,declarationStatus:STATUS.PENDING},
          onSuccess:(data:any)=>{
            
            this.data[`${data.id}`] = {...(data|| {})}
            
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
    },
    async deleteData({callback, id }: {callback?: () => void; id: string }) {
      try{
        this.loading = true
        
        Api.del({
          url:'/fixedEquipment/'+id,
          onSuccess:()=>{
            delete this.data[id]
            this.ui.notifySuccess({ message: 'Donnée supprimée', position: 'bottom-center' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("une erreur s'est produite", 'bottom-center')
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
export default fixeEqStore
