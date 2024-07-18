import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  userlogins: IUserLogin[],
  userloginsActual: IUserLogin | null
}

export const useUserLoginStore = defineStore("userlogins", {

  state: ():IState=>({
    userlogins: [],
    userloginsActual: null
  }),

	actions: {
		// Get all Employee from DB
		async getAllEmplolyee() {
			try {
				let data = await $fetch<IUserLogin[]>("/api/userlogins");
				this.userlogins = data;
				return data as IUserLogin[];
			} catch (e : any) {
			  //toast.error(e.message);
			}
		},
		// Create a new Employee
		async create(Employee: IUserLogin) {
			await $fetch("/api/userlogins/create", {
				method: "POST",
				body: Employee,
			})
      .then(async () => {
        await this.getAllEmplolyee();
        toast.success("Employee created");
      })
      .catch((e: any) => {
        toast.error(e.data.message);
      });
  },

		// Update a Employee
		async update(id: string, Employee: IUserLogin) {
			await $fetch(`/api/userlogins/${id}`, {
				method: "PUT",
				body: Employee,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllEmplolyee();
					toast.success("Employee updated");
				});
		},
		// delete a Employee
		async remove(id: string) {
			await $fetch(`/api/userlogins/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllEmplolyee();
					toast.error("Employee removed");
				});
		},
	},
});
