import BookShelfModel from "~~/server/models/BookShelf.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await BookShelfModel.findByIdAndDelete(id);
		return { message: "Book Shelf removed" };
	} catch (e) {
		throw createError({
			message: e.message,
		});
	}
});
