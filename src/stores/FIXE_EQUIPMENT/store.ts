import { defineStore } from 'pinia'
import Api from '@/api/fetchWrapper'
import STATUS from '@/index'
const initialState: any[] = []

const fixeEqStore = defineStore('fixeEq', {
  state: () => {
    return {
      data: initialState,
      loading: false
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
    addData(data: any) {
      this.data.push({ ...data, type: data?.type?.frName, status: STATUS.PENDING })
    }
  }
})
export default fixeEqStore
