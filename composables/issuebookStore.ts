import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  issueBooks: IIssueBook[],
  issueBooksActual: IIssueBook | null
}


export const useIssueBookStore = defineStore("issueBooks", {

  state: ():IState=>({
    issueBooks: [],
    issueBooksActual: null
  }),

	actions: {
		// Get all Issue Books from DB
		async getAllIssueBook() {
			try {
				let data = await $fetch<IIssueBook[]>("/api/issue_books");
				this.issueBooks = data;
				return data as IIssueBook[];
			} catch (e : any) {
			  //toast.error(e.message);
			}
		},
		// Issue a new Book
		async create(IssueBook: IIssueBook) {
			await $fetch("/api/issue_books/create", {
				method: "POST",
				body: IssueBook,
			})
      .then(async () => {
        await this.getAllIssueBook();
        toast.success("This Book Issued Successfully  !");
      })
      .catch((e: any) => {
        toast.error(e.data.message);
      });
  },

		// Update  Issue Book
		async update(id: string, IssueBook: IIssueBook) {
			await $fetch(`/api/issue_books/${id}`, {
				method: "PUT",
				body: IssueBook,
			})
				.then(async () => {
					await this.getAllIssueBook();
					toast.success("Updated Successfully");
				})
        .catch((e) => {
					toast.error(e.data.message);
				});
		},
		// delete a IssueBook
		async remove(id: string) {
			await $fetch(`/api/issue_books/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllIssueBook();
					toast.error("Removed Successfully");
				});
		},
	},
});
