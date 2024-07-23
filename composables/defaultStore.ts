import { defineStore } from "pinia";
import "vue3-toastify/dist/index.css";

interface IState{
  defaultIssueBooks: IIssueBook[],
  defaultIssueBooksActual: IIssueBook | null
}


export const useDefaultIssueBookStore = defineStore("defaultIssueBooks", {

  state: ():IState=>({
    defaultIssueBooks: [],
    defaultIssueBooksActual: null
  }),

	actions: {

		// Get all Defaulters on  Issue Books 
		async getAllDefaultIssueBook() {
			try {
				let data = await $fetch<IIssueBook[]>("/api/defaults");
				this.defaultIssueBooks = data;
				return data as IIssueBook[];
			} catch (e : any) {
			  //toast.error(e.message);
			}
		},

	},
});
