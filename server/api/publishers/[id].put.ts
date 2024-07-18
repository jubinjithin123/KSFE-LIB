import PublisherModel from "~~/server/models/Publisher.model";
import { PublisherSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = PublisherSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Book Id
	try {
		await PublisherModel.findByIdAndUpdate(id, body);
		return { message: "Book Shelf Updated" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
