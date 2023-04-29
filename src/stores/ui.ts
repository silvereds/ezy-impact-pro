import { defineStore } from 'pinia'
import Api from '../api/fetchWrapper'
import { useToast } from 'vue-toastification'

const innerOption = {
  position: 'top-center',
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
      loader: true,
      selectable: null,
      frequence:null,
      owner: [{ frName: 'propriétaire',value:"OWNER" }, { frName: 'locataire', value:"TENANT" }],
      declarer: [{ frName: 'user1',id:'1' }, { frName: 'user2',id:'2' }],
      selectableLoaded:false,
      stat: {},
    }
  },
  getters: {
    getSelectable: (state) => (category: string,fields:string[]=[]) => {
      const list = (state.selectable as any)?.filter((el: any) => el?.type?.includes(category))
      //console.log("list here", list)
      const selectable:any = {}
      fields.forEach((el:string)=>{
        selectable[el] = list?.filter((data:any)=>data.type?.toLowerCase().includes(el?.toLowerCase()))
      })
      return selectable
    },
  },
  actions: {
    async getSelectableFields() {
        if(!this.selectableLoaded){
          try{
            
            await Api.get({
              url: '/selectableField/all',
              onSuccess: async (data: any) => {
                this.selectable = data
                // to get frequence declaration list
                
                if(!this.frequence){
                  
                  try{
                    await Api.get({
                      url: '/reportingFrequency/all',
                      onSuccess: (data: any) => {
                        this.frequence = data
                        // console.log("frequence", data)
                      },
                      onError: (err: any) => {
                        console.log('error', err)
                      }
                    })
                  }catch(err){
                    console.log("error when fetching frequence fields", err)
                  }
                }
                // end get frequence declaration
              },
              onError: (err: any) => {
                console.log('error', err)
              }
            })
          }catch(err){
            console.log("error when fetching selectable fields", err)
          }finally{
            this.loader = false
          }
        }
    },
    async getUiData() {},
    notifySuccess({
      message = '',
      position = 'top-center'
    }: {
      message: string
      position?: string
    }) {
      toast.success(message, { ...innerOption, position } as any)
    },
    notifyError(message: string | '', position = 'top-center') {
      toast.error(message, { ...innerOption, position } as any)
    }
  }
})
export default useUiStore
