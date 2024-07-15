import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  book_shelves: IBookShelf[],
  categoriesActual: IBookShelf | null
}

export const useBookShelfStore = defineStore("book_shelves", {

  state: ():IState=>({
    book_shelves: [],
    categoriesActual: null
  }),

	actions: {
		// Get all book shelves from DB
		async getAllBookShelf() {
			try {
				let data = await $fetch<IBookShelf[]>("/api/book_shelves");
				this.book_shelves = data;
				return data as IBookShelf[];
			} catch (e : any) {
			  //toast.error(e.message);
			}
		},
		// Create a new book shelf
		async create(book: IBookShelf) {
			await $fetch("/api/book_shelves/create", {
				method: "POST",
				body: book,
			})
      .catch((e) => {
        toast.error(e.data.message);
      })
      .then(async () => {
        await this.getAllBookShelf();
        toast.success("Book Shelf created");
      });
  },

		// Update a book shelf
		async update(id: string, book: IBookShelf) {
			await $fetch(`/api/book_shelves/${id}`, {
				method: "PUT",
				body: book,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBookShelf();
					toast.success("Book Shelf updated");
				});
		},
		// delete a book
		async remove(id: string) {
			await $fetch(`/api/book_shelves/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllBookShelf();
					toast.error("Book Shelf removed");
				});
		},
	},
});
