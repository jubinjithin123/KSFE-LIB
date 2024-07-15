import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  author: IAuthor[],
  authorActual: IAuthor | null
}

export const useAuthorStore = defineStore("author", {

  state: ():IState=>({
    author: [],
    authorActual: null
  }),

	actions: {
		// Get all author from DB
		async getAllAuthor() {
			try {
				let data = await $fetch<IAuthor[]>("/api/author");
				this.author = data;
				return data as IAuthor[];
			} catch (e : any) {
			 // toast.error(e.message);
			}
		},
		// Create a new author shelf
		async create(author: IAuthor) {
			await $fetch("/api/author/create", {
				method: "POST",
				body: author,
			})
      .catch((e) => {
        toast.error(e.data.message);
      })
      .then(async () => {
        await this.getAllAuthor();
        toast.success("author created");
      });
  },

		// Update a author shelf
		async update(id: string, author: IAuthor) {
			await $fetch(`/api/author/${id}`, {
				method: "PUT",
				body: author,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllAuthor();
					toast.success("author updated");
				});
		},
		// delete a author
		async remove(id: string) {
			await $fetch(`/api/author/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllAuthor();
					toast.error("author removed");
				});
		},
	},
});
