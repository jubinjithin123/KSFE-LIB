import IssueBookModel from "~~/server/models/IssueBook.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await IssueBookModel.findByIdAndDelete(id);
		return { message: "Removed" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
