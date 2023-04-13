import { defineStore } from 'pinia'

import Api from '@/api/fetchWrapper'
import STATUS from '@/dataType'
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from 'firebase/firestore'
import db from '@/firebaseConfig'
import useUiStore from '../ui'

const initialState: any[] = []

const fixeEqStore = defineStore('fixeEq', {
  state: () => {
    return {
      data: initialState,
      loading: false,
      ui: useUiStore()
    }
  },
  getters: {
    getFormatted: (state) => {
      return state.data
    }
  },
  actions: {
    getData() {
      this.loading = true
      Api.get({
        url: '/selectableField/all',
        onSuccess: (data: any) => {
          this.data = data.data
          console.log(data)
          this.loading = false
        },
        onError: (err: any) => {
          console.log('error', err)
          this.loading = false
        }
      })
    },
    async addData(data: any, callback?: Function) {
      try {
        this.loading = true
        const id = uuidv4()
        await setDoc(doc(db, 'FIXE_EQUIPMENT/' + id), { ...data, id, status: STATUS.PENDING })
        this.data.push({ ...data, status: STATUS.PENDING })
        this.ui.notifySuccess({ message: 'équipement ajouté' })
        callback?.()
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }

      //this.data.push({ ...data, type: data?.type?.frName, status: STATUS.PENDING })
    }
  }
})
export default fixeEqStore
