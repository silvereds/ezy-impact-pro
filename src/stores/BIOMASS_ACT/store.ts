// import { defineStore } from 'pinia'
// import { serverTimestamp, updateDoc } from 'firebase/firestore'
// // import Api from '@/api/fetchWrapper'
// import STATUS from '@/dataType'
// import { v4 as uuidv4 } from 'uuid'
// import { doc, getDocs, collection, writeBatch, increment, query, where } from 'firebase/firestore'
// import db from '@/firebaseConfig'
// import useUiStore from '../ui'
// const initialState: any = {}

// const store = defineStore('BIOMAS_ACTIVITIES', {
//   state: () => {
//     return {
//       data: initialState,
//       loading: false,
//       fetching: false,
//       ui: useUiStore()
//     }
//   },
//   getters: {
//     getFormatted: (state) => {
//       return state.data
//     }
//   },
//   actions: {
//     async getData() {
//       if ((Object as any).values(this.data).length === 0) {
//         this.fetching = true
//         const snap = await getDocs(collection(db, 'BIOMAS_ACTIVITIES'))
//         snap.forEach((doc) => {
//           // doc.data() is never undefined for query doc snapshots
//           this.data[doc.id] = doc.data()
//         })

//         this.fetching = false
//       }
//     },
//     // async addData({ data, callback }: { data: any; callback?: () => void }) {
//     //   try {
//     //     this.loading = true
//     //     const id = uuidv4()
//     //     const toSave = {
//     //       ...data,
//     //       id,
//     //       status: STATUS.PENDING,
//     //       createdAt: serverTimestamp(),
//     //       updatedAt: serverTimestamp()
//     //     }
//     //     await setDoc(doc(db, 'BIOMAS_ACTIVITIES/' + id), toSave)
//     //     this.data[id] = toSave
//     //     this.ui.notifySuccess({ message: 'Activité ajouté' })
//     //     callback?.()
//     //   } catch (err) {
//     //     console.log(err)
//     //   } finally {
//     //     this.loading = false
//     //   }

//     //   //this.data.push({ ...data, type: data?.type?.frName, status: STATUS.PENDING })
//     // },
//     async addData({ data, callback }: { data: any; callback?: () => void }) {
//       try {
//         this.loading = true
//         const batch = writeBatch(db)
//         const id = uuidv4()
//         const toSave = {
//           ...data,
//           id,
//           status: STATUS.PENDING,
//           createdAt: serverTimestamp(),
//           updatedAt: serverTimestamp()
//         }
//         const q = query(
//           collection(db, 'BIOMAS_ACTIVITIES'),
//           where('reference', '==', data?.reference)
//         )
//         const querySnapshot = await getDocs(q)
//         let count = 0
//         querySnapshot.forEach((doc) => {
//           count++
//         })

//         if (count === 0) {
//           const docRef = doc(db, 'BIOMAS_ACTIVITIES/' + id)
//           const statRef = doc(db, 'STATISTICS/STAT')
//           batch.set(docRef, toSave, { merge: true })
//           batch.set(
//             statRef,
//             {
//               BIOMAS_ACTIVITIES: {
//                 [STATUS.PENDING]: increment(1),
//                 total: increment(1)
//               }
//             },
//             { merge: true }
//           )

//           await batch.commit()
//           this.data[id] = toSave
//           this.ui.notifySuccess({ message: 'Activité  ajouté' })
//           callback?.()
//         } else {
//           this.ui.notifyError("veuillez changer la référence de l' activité")
//         }
//       } catch (err) {
//         console.log(err)
//         this.ui.notifyError('erreur' + err)
//       } finally {
//         this.loading = false
//       }
//     },
//     async updateData({ data, callback, id }: { data: any; callback?: () => void; id: string }) {
//       try {
//         this.loading = true
//         delete data.createdAt

//         const toUpdate = {
//           ...data,
//           status: STATUS.PENDING,

//           updatedAt: serverTimestamp()
//         }

//         await updateDoc(doc(db, 'BIOMAS_ACTIVITIES/' + id), toUpdate)
//         this.data[id] = { ...this.data[id], ...toUpdate }
//         this.ui.notifySuccess({ message: 'Mise à jour éffectué', position: 'bottom-center' })
//         callback?.()
//       } catch (err) {
//         console.log(err)
//         this.ui.notifyError('error' + err, 'bottom-center')
//       } finally {
//         this.loading = false
//       }
//     }
//   }
// })
// export default store
import { defineStore } from 'pinia'
import STATUS  from '@/dataType'
import useUiStore from '../ui'
import Api from '@/api/fetchWrapper'
import useAuthStore from '../authStore'

const initialState: any = {}
const Store = defineStore('biomass_act', {
  state: () => {
    return {
      data: initialState,
      declarationData:null,
      loading: false,
      loadingData:false,
      onlyFetch: false,
      ui: useUiStore(),
      auth:useAuthStore()
    }
  },
  getters: {
    getFormatted: (state) => {
      return state.data
    },
    getBiomassActivity:(state)=>{
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
    // to get fixe equipment 
    async getData() {
      if ( (this.auth?.user as any)?.id && !this.data[(this.auth.user as any).id]) {
        this.loadingData = true
        Api.get({
          url: '/biomassActivity/enterprise/'+(this.auth.user as any).id,
          onSuccess: (data: any[] = []) => {
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
    // to add fixe equipment to store
    async addData({ data, callback }: { data: any; callback?: () => void }) {
      try{
        this.loading = true
        const enterpriseId = (this.auth.user as any).id
        Api.post({
          url:'/biomassActivity',
          body:{...data,enterpriseId,declarationStatus:STATUS.PENDING},
          onSuccess:(data:any)=>{
            const id = (this.auth.user as any).id
            this.data[id] = {...(this.data[id]||{})}
            this.data[id][`${data.id}`] = {...(data|| {})}
            this.ui.notifySuccess({ message: 'Activité ajouté', position: 'bottom-center' })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("veuillez changer la référence de l' activité", 'bottom-center')
            console.log("error whwn add fixed Equipement",err)
            this.loading = false
          }
        })
      }catch(err){
        this.ui.notifyError('erreur' + err)
      }
    },
    // to update to fixe equipment to store 
    async updateData({ data, callback, id , isValidation }: { data: any; callback?: () => void; id: string , isValidation?:boolean }) {
      try{
        this.loading = true
        const enterpriseId = (this.auth.user as any).id
        Api.put({
          url:'/biomassActivity/'+id,
          body:{
            ...data,
            enterpriseId , 
            declarationStatus:isValidation ? STATUS.VALIDATED : STATUS.PENDING
          },
          onSuccess:(data:any)=>{
            this.data[enterpriseId][`${data.id}`] = {...(data|| {})}
            
            this.ui.notifySuccess({ 
              message:isValidation ? 'Validation Effectué':'Mise à jour éffectuer', 
              position: 'bottom-center' 
            })
            this.loading = false
            callback?.()
          },
          onError:(err:any)=>{
            this.ui.notifyError("verifier que les données sont correctement remplis", 'bottom-center')
            console.log("error whwn add industrial activity",err)
            this.loading = false
          }
        })
      }catch(err){
        this.ui.notifyError('erreur' + err)
      }
    },
    // to delete fixe equipment 
    async deleteData({callback, id }: {callback?: () => void; id: string }) {
      try{
        this.loading = true
        const enterpriseId = (this.auth.user as any).id
        Api.del({
          url:'/biomassActivity/'+id,
          onSuccess:()=>{
            delete this.data[enterpriseId][id]
            this.ui.notifySuccess({ message: 'Activité supprimée', position: 'bottom-center' })
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
    },
    // to list declaration of user
    getDeclarationData({callback}:{callback:(data:any)=>void}) {
      const enterpriseId = (this.auth.user as any).id
      let url = `/declaration/filterSortAndOrder?equipmentType=INDUSTRIAL_ACTIVITY`
      url = url+"&enterpriseId="+enterpriseId
      
      Api.get({
          url,
          onSuccess:(data:any)=>{
            console.log("declaration list", data) ; 
            this.declarationData = data
            callback?.(data)
          },
          onError:(data:any)=>{
            console.log("error",data)
          }
      })
    },
    // to to do new  declaration 
    addDeclaration({data,callback}:{data:any,callback:(data:any)=>void}){
      Api.post({
        url:"/delaration/1",
        body:data,
        onSuccess:(data:any)=>{
          console.log("added declaration",data)
          callback?.(data)
        },
        onError:(data:any)=>{
          console.log("error when add declaration",data)
        }
      })
    }
  }
})
export default Store

