import CategoryModel from "~~/server/models/Category.model";
import { CategorySchema } from "~~/server/validation";


import UniqueIdModel from "~~/server/models/UniqueId.model";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = CategorySchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create category
	try {

    const uniqueId :any = await UniqueIdModel.findOne().exec();
    const category_Id: number = uniqueId.category_Id + 1;

    body.category_Id = category_Id;
		await CategoryModel.create(body);

    uniqueId.category_Id = category_Id;
    await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId);

		return { message: "Category created" };


	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}

});
