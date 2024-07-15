import UniqueIdModel from "~~/server/models/UniqueId.model";
import { UniqueIdSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = UniqueIdSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update unique Id
	try {
		await UniqueIdModel.findByIdAndUpdate(id, body);
		return { message: "Unique Id updated" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
