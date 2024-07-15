import BookShelfModel from "~~/server/models/BookShelf.model";
import { BookShelfSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = BookShelfSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Book Id
	try {
		await BookShelfModel.findByIdAndUpdate(id, body);
		return { message: "Book Shelf Updated" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
