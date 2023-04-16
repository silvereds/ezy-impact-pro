import { defineStore } from 'pinia'
import { serverTimestamp, updateDoc } from 'firebase/firestore'
// import Api from '@/api/fetchWrapper'
import STATUS from '@/dataType'
import { v4 as uuidv4 } from 'uuid'
import { doc, getDocs, collection, writeBatch, increment, query, where } from 'firebase/firestore'
import db from '@/firebaseConfig'
import useUiStore from '../ui'
const initialState: any = {}

const store = defineStore('BIOMAS_ACTIVITIES', {
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
        const snap = await getDocs(collection(db, 'BIOMAS_ACTIVITIES'))
        snap.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          this.data[doc.id] = doc.data()
        })

        this.fetching = false
      }
    },
    // async addData({ data, callback }: { data: any; callback?: () => void }) {
    //   try {
    //     this.loading = true
    //     const id = uuidv4()
    //     const toSave = {
    //       ...data,
    //       id,
    //       status: STATUS.PENDING,
    //       createdAt: serverTimestamp(),
    //       updatedAt: serverTimestamp()
    //     }
    //     await setDoc(doc(db, 'BIOMAS_ACTIVITIES/' + id), toSave)
    //     this.data[id] = toSave
    //     this.ui.notifySuccess({ message: 'Activité ajouté' })
    //     callback?.()
    //   } catch (err) {
    //     console.log(err)
    //   } finally {
    //     this.loading = false
    //   }

    //   //this.data.push({ ...data, type: data?.type?.frName, status: STATUS.PENDING })
    // },
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
        const q = query(
          collection(db, 'BIOMAS_ACTIVITIES'),
          where('reference', '==', data?.reference)
        )
        const querySnapshot = await getDocs(q)
        let count = 0
        querySnapshot.forEach((doc) => {
          count++
        })

        if (count === 0) {
          const docRef = doc(db, 'BIOMAS_ACTIVITIES/' + id)
          const statRef = doc(db, 'STATISTICS/STAT')
          batch.set(docRef, toSave, { merge: true })
          batch.set(
            statRef,
            {
              BIOMAS_ACTIVITIES: {
                [STATUS.PENDING]: increment(1),
                total: increment(1)
              }
            },
            { merge: true }
          )

          await batch.commit()
          this.data[id] = toSave
          this.ui.notifySuccess({ message: 'Activité  ajouté' })
          callback?.()
        } else {
          this.ui.notifyError("veuillez changer la référence de l' activité")
        }
      } catch (err) {
        console.log(err)
        this.ui.notifyError('erreur' + err)
      } finally {
        this.loading = false
      }
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

        await updateDoc(doc(db, 'BIOMAS_ACTIVITIES/' + id), toUpdate)
        this.data[id] = { ...this.data[id], ...toUpdate }
        this.ui.notifySuccess({ message: 'Mise à jour éffectué', position: 'bottom-center' })
        callback?.()
      } catch (err) {
        console.log(err)
        this.ui.notifyError('error' + err, 'bottom-center')
      } finally {
        this.loading = false
      }
    }
  }
})
export default store
