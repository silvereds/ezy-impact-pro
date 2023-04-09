import { defineStore } from 'pinia'
import Api from '@/api/fetchWrapper'

const biomassActStore = defineStore('biomassAct', {
  state: () => {
    return {
      data: null,
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
    }
  }
})
export default biomassActStore
