import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
    auths: IAuth[],
    authsActual: IAuth | null
  }

export const useAuthStore = defineStore('auths', {

    state: ():IState=>({
      auths: [],
      authsActual: null
      }),
    
  actions: {
    

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
