import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
    auths: IAuth[],
    authsActual: IAuth | null
  }
const { signIn ,data} = useAuth();
const route = useRoute()

export const useAuthStore = defineStore('auths', {

    state: ():IState=>({
      auths: [],
      authsActual: null
      }),
    
  actions: {

    async handleLogin(auth: IAuth) {
      await signIn('credentials', {
        callbackUrl: '/',
        auth,
      })
      .catch((e) => {
        console.log("data pinia: ",e.data)
        toast.error(e.data.message);
      })
      .then(async () => {      
        navigateTo(route.query.to ? String(route.query.to) : '/', { replace: true }) 
        toast.success("Login Successfully");
      });
  },
    

    async create(auth: IAuth) {
			await $fetch("/api/user/login", {
				method: "POST",
				body: auth,
			})
      .catch((e) => {
        console.log("data pinia: ",e.data)
        toast.error(e.data.message);
      })
      .then(async () => {       
        toast.success("Login Successfully");
      });
  },



  },

});
