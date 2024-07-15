import UniqueIdModel from "~~/server/models/UniqueId.model";
import { UniqueIdSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = UniqueIdSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Author
	try {
		await UniqueIdModel.create(body);
		return { message: "Unique Id created" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
