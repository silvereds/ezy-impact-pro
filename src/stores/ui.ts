import { defineStore } from 'pinia'
import Api from '../api/fetchWrapper'
import { useToast } from 'vue-toastification'

const innerOption = {
  position: 'bottom-right',
  timeout: 2000,
  closeOnClick: true,
  pauseOnFocusLoss: true,
  pauseOnHover: true,
  draggable: true,
  draggablePercent: 0.6,
  showCloseButtonOnHover: false,
  hideProgressBar: false,
  closeButton: 'button',
  icon: true,
  rtl: false
}

const toast = useToast()

const useUiStore = defineStore('uiStore', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      show: false,
      severity: 'info',
      message: '',
      summary: '',
      time: '',
      loader: true,
      selectable: null,
      units: [{ frName: 'km' }, { frName: 'h' }, { frName: 's' }],
      type: [{ frName: 'type1' }, { frName: 'type2' }, { frName: 'type3' }],
      fuelUsed: [{ frName: 'comb1' }, { frName: 'comb2' }, { frName: 'comb3' }],
      building: [{ frName: 'building1' }, { frName: 'building2' }, { frName: 'building3' }],
      owner: [{ frName: 'propriétaire' }, { frName: 'locataire' }],
      declarer: [{ frName: 'user1' }, { frName: 'user2' }],
      buildings: []
    }
  },
  getters: {
    getSelectable: (state) => (category: string) => {
      return (state.selectable as any)?.filter((el: any) => el?.type?.includes(category))
    }
  },
  actions: {
    async getSelectableFields() {
      this.loader = true
      Api.get({
        url: '/selectableField/all',
        onSuccess: (data: any) => {
          this.selectable = data.data
          console.log(data)
          this.loader = false
        },
        onError: (err: any) => {
          console.log('error', err)
          this.loader = false
        }
      })
    },
    notifySuccess({ message = '' }: { message: string }) {
      toast.success(message, innerOption as any)
    },
    notifyError(message: string | '') {
      toast.error(message, innerOption as any)
    }
  }
})
export default useUiStore
