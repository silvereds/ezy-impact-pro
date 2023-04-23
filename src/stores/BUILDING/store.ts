import { defineStore } from 'pinia'
import { serverTimestamp, updateDoc } from 'firebase/firestore'
// import Api from '@/api/fetchWrapper'
import STATUS, { type BUILDING } from '@/dataType'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc, getDocs, collection } from 'firebase/firestore'
import db from '@/firebaseConfig'
import useUiStore from '../ui'
import Api from '@/api/fetchWrapper'

const initialState: any = {}

const buildingStore = defineStore('building', {
  state: () => {
    return {
      data: initialState,
      loading: false,
      loader:false,
      buildingLoaded:false,
      ui: useUiStore()
    }
  },
  getters: {
    getFormatted: (state) => {
      return state.data
    }
  },
  actions: {
    // to get all building of system
    async getData() {
      if(!this.buildingLoaded){
        try{
          Api.get({
            url: '/building/all',
            onSuccess: (data: any) => {
              data.forEach((building:any)=>{
                this.data[building?.id] = building
              })
            },
            onError: (err: any) => {
              console.log('error', err)
            }
          })
        }catch(err){
          console.log("error when fetching building",err)
        }finally{
          this.buildingLoaded = true
          this.loader = false
        }
      }
    },
    // to add building 
    async addData({ data, callback }: { data: any; callback?: () => void }) {
      try {
        this.loading = true
        console.log("building to update", {...data, declarationStatus:STATUS.PENDING})
        Api.post({
          url:'/building',
          body:{
            ...data, 
            declarationStatus:STATUS.PENDING,  
            userId: this.ui.declarer?.map((el)=>el.id)[0],
            enterpriseId:1
          },
          onSuccess:(data:BUILDING)=>{
            this.data[data?.id as string] = data
            this.ui.notifySuccess({ message: 'Bâtiment ajouté' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("erreur : "+(err?.metadata ? 'cette référence est déja attibuée vueillez la modifier et réesayer ':'erreur de connexion'))
            console.log("error add building",err)
            this.loading = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    // to update building here
    async updateData({ data, callback, id }: { data: any; callback?: () => void; id: string }) {
      try {
        this.loading = true
        
        console.log("building to update", {...data, declarationStatus:STATUS.PENDING})
        Api.put({
          url:'/building/'+id,
          body:{
            ...data, 
            declarationStatus:STATUS.PENDING,  
            userId: this.ui.declarer?.map((el)=>el.id)[0],
            enterpriseId:1
          },
          onSuccess:(data:BUILDING)=>{
            this.data[id] = { ...this.data[id], ...data }
            this.ui.notifySuccess({ message: 'Mise à jour éffectué' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("erreur : "+(err?.metadata ? 'cette référence est déja attibuée vueillez la modifier et réesayer ':'erreur de connexion'))
            console.log("error update building",err)
            this.loading = false
          }
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
})
export default buildingStore
