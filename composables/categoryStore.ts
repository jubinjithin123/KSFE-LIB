import { defineStore } from "pinia";
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

interface IState{
  categories: ICategory[],
  categoriesActual: ICategory | null
}

export const useCategoryStore = defineStore("categories", {

  state: ():IState=>({
    categories: [],
    categoriesActual: null
  }),

	actions: {

		// Get all categories from DB
		async getAllCategory() {
			try {
      const data = await $fetch<ICategory[]>('/api/categories');
        this.categories = data;
       return data as ICategory[];
			} catch (e :any) {
       // toast.error(e.message);
			}
		},


		// Create a new Category

		async create(category_name: string) {
			await $fetch("/api/categories/create", {
				method: "POST",
				body: { category_name },
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllCategory();
					toast.success("Category created");
				});
		},


		// Update an Category
		async update(id: string, category: ICategory) {
			await $fetch(`/api/categories/${id}`, {
				method: "PUT",
				body:category,
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllCategory();
					toast.success("Category updated");
				});
		},
    

		// delete an Category
		async remove(id: string) {
			await $fetch(`/api/categories/${id}`, {
				method: "DELETE",
			})
				.catch((e) => {
					toast.error(e.data.message);
				})
				.then(async () => {
					await this.getAllCategory();
					toast.error("Category removed");
          
				});
		},

	},
  
  
});
