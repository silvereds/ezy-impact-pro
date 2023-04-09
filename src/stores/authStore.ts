import { defineStore } from "pinia";
import { useRouter } from "vue-router";

const useAuthStore = defineStore("authStore",{
    state:()=>{
        const auth = sessionStorage.getItem('isAuth')
        return {
            isAuth:!!auth,
            router:useRouter()
        }
    },
    actions:{
        login(data:{email:string,password:string}):void{
            this.isAuth = true ;
            sessionStorage.setItem("isAuth","auth-key")
            this.router.push({name:"dashboard"})
            console.log(data.password,data.email)
        },
        logout():void{
            this.isAuth = false,
            sessionStorage.removeItem('isAuth')
            this.router.push({name:"Login"})
        }
    }
}
)
export default useAuthStore