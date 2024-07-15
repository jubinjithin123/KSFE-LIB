import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  books: IBook[],
  booksActual: IBook | null
}

export const useBookStore = defineStore("books", {

  state: ():IState=>({
    books: [],
    booksActual: null
  }),

	actions: {
		// Get all Books from DB
		async getAllBook() {
			try {
				let data = await $fetch<IBook[]>("/api/books");
				this.books = data;
				return data as IBook[];
			} catch (e : any) {
			 // toast.error(e.message);
			}
		},
		// Create a new Book
		async create(publisher: IBook) {
			await $fetch("/api/books/create", {
				method: "POST",
				body: publisher,
			})
      .catch((e) => {
        toast.error(e.data.message);
      })
      .then(async () => {
        await this.getAllBook();
        toast.success("Book created");
      });
  },

		// Update a Book
		async update(id: string, publisher: IBook) {
			await $fetch(`/api/books/${id}`, {
				method: "PUT",
				body: publisher,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBook();
					toast.success("Book updated");
				});
		},
		// delete a Book
		async remove(id: string) {
			await $fetch(`/api/books/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBook();
					toast.error("Book removed");
				});
		},
	},
});
