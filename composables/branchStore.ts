import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  branches: IBranch[],
  branchesActual: IBranch | null
}

export const useBranchStore = defineStore("branches", {

  state: ():IState=>({
    branches: [],
    branchesActual: null
  }),

	actions: {
		// Get all Branch from DB
		async getAllBranch() {
			try {
				let data = await $fetch<IBranch[]>("/api/branches");
				this.branches = data;
				return data as IBranch[];
			} catch (e : any) {
			  //toast.error(e.message);
			}
		},
		// Create a new Branch
		async create(Branch: IBranch) {
			await $fetch("/api/branches/create", {
				method: "POST",
				body: Branch,
			})
      .catch((e) => {
        toast.error(e.data.message);
      })
      .then(async () => {
        await this.getAllBranch();
        toast.success("Branch created");
      });
  },

		// Update a Branch
		async update(id: string, Branch: IBranch) {
			await $fetch(`/api/branches/${id}`, {
				method: "PUT",
				body: Branch,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBranch();
					toast.success("Branch updated");
				});
		},
		// delete a Branch
		async remove(id: string) {
			await $fetch(`/api/branches/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBranch();
					toast.error("Branch removed");
				});
		},
	},
});
