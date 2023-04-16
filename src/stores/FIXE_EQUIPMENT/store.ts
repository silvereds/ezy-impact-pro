import { defineStore } from 'pinia'
import { serverTimestamp, updateDoc } from 'firebase/firestore'
// import Api from '@/api/fetchWrapper'
import STATUS from '@/dataType'
import { v4 as uuidv4 } from 'uuid'
import { doc, getDocs, collection, writeBatch, increment, query, where } from 'firebase/firestore'
import db from '@/firebaseConfig'
import useUiStore from '../ui'

const initialState: any = {}

const fixeEqStore = defineStore('fixeEq', {
  state: () => {
    return {
      data: initialState,
      loading: false,
      fetching: false,
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
      if ((Object as any).values(this.data).length === 0) {
        this.fetching = true
        const snap = await getDocs(collection(db, 'FIXE_EQUIPMENT'))
        snap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.data[doc.id] = doc.data()
        })

        this.fetching = false
      }
      // Api.get({
      //   url: '/selectableField/all',
      //   onSuccess: (data: any) => {
      //     this.data = data.data
      //     console.log(data)
      //     this.loading = false
      //   },
      //   onError: (err: any) => {
      //     console.log('error', err)
      //     this.loading = false
      //   }
      // })
    },
    async addData({ data, callback }: { data: any; callback?: () => void }) {
      try {
        this.loading = true
        const batch = writeBatch(db)
        const id = uuidv4()
        const toSave = {
          ...data,
          id,
          status: STATUS.PENDING,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        }
        const q = query(collection(db, 'FIXE_EQUIPMENT'), where('reference', '==', data?.reference))
        const querySnapshot = await getDocs(q)
        let count = 0
        querySnapshot.forEach((doc) => {
          count++
        })

        if (count === 0) {
          const docRef = doc(db, 'FIXE_EQUIPMENT/' + id)
          const statRef = doc(db, 'STATISTICS/STAT')
          batch.set(docRef, toSave, { merge: true })
          batch.set(
            statRef,
            {
              FIXE_EQUIPMENT: {
                [STATUS.PENDING]: increment(1),
                total: increment(1)
              }
            },
            { merge: true }
          )

          await batch.commit()
          this.data[id] = toSave
          this.ui.notifySuccess({ message: 'Équipement fixe ajouté', position: 'bottom-center' })
          callback?.()
        } else {
          this.ui.notifyError("veuillez changer la référence de l' équipement", 'bottom-center')
        }
      } catch (err) {
        console.log(err)
        this.ui.notifyError('erreur' + err)
      } finally {
        this.loading = false
      }

      //this.data.push({ ...data, type: data?.type?.frName, status: STATUS.PENDING })
    },
    async updateData({ data, callback, id }: { data: any; callback?: () => void; id: string }) {
      try {
        this.loading = true
        delete data.createdAt

        const toUpdate = {
          ...data,
          status: STATUS.PENDING,

          updatedAt: serverTimestamp()
        }
        console.log(toUpdate)
        await updateDoc(doc(db, 'FIXE_EQUIPMENT/' + id), toUpdate)
        this.data[id] = { ...this.data[id], ...toUpdate }
        this.ui.notifySuccess({ message: 'Mise à jour éffectué' })
        callback?.()
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    }
  }
})
export default fixeEqStore
