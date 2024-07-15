import CategoryModel from "~~/server/models/Category.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await CategoryModel.findByIdAndDelete(id);
		return { message: "Category removed" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
