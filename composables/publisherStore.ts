import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  publishers: IPublisher[],
  publisherActual: IPublisher | null
}

export const usePublisherStore = defineStore("publishers", {

  state: ():IState=>({
    publishers: [],
    publisherActual: null
  }),

	actions: {
		// Get all publisher from DB
		async getAllPublisher() {
			try {
				let data = await $fetch<IPublisher[]>("/api/publishers");
				this.publishers = data;
				return data as IPublisher[];
			} catch (e : any) {
			 // toast.error(e.message);
			}
		},
		// Create a new publisher shelf
		async create(publisher: IPublisher) {
			await $fetch("/api/publishers/create", {
				method: "POST",
				body: publisher,
			})
      .catch((e) => {
        toast.error(e.data.message);
      })
      .then(async () => {
        await this.getAllPublisher();
        toast.success("publisher created");
      });
  },

		// Update a publisher shelf
		async update(id: string, publisher: IPublisher) {
			await $fetch(`/api/publishers/${id}`, {
				method: "PUT",
				body: publisher,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllPublisher();
					toast.success("publisher updated");
				});
		},
		// delete a publisher
		async remove(id: string) {
			await $fetch(`/api/publishers/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllPublisher();
					toast.error("publisher removed");
				});
		},
	},
});
