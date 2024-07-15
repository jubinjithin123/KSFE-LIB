import CategoryModel from "~~/server/models/Category.model";
import { CategorySchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = CategorySchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Category
	try {
		await CategoryModel.findByIdAndUpdate(id, body);
		return { message: "Category updated" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
