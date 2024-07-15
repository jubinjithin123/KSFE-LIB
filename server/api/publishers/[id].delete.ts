import PublisherModel from "~~/server/models/Publisher.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await PublisherModel.findByIdAndDelete(id);
		return { message: "Publisher removed" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
