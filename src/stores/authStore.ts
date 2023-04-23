import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

const useAuthStore = defineStore('authStore', {
  state: () => {
    const auth = sessionStorage.getItem('isAuth')
    return {
      isAuth: !!auth,
      current:null,
      userList:[{"id":"1",name:"utilisateur 1"},{"id":"2",name:"utilisateur 2"}],
      router: useRouter()
    }
  },
  actions: {
    login(data: { email: string; password: string }): void {
      this.isAuth = true
      sessionStorage.setItem('isAuth', 'auth-key')
      this.router.push('/dashboard')
      console.log(data.password, data.email)
    },
    logout(): void {
      ;(this.isAuth = false), sessionStorage.removeItem('isAuth')
      this.router.push({ name: 'Login' })
    },
    setCurrent(current:any):void {this.current = current }
  }
})
export default useAuthStore
