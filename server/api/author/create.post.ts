import AuthorModel from "~~/server/models/Author.model";
import { AuthorSchema } from "~~/server/validation";

import UniqueIdModel from "~~/server/models/UniqueId.model";


export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = AuthorSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Author
	try {

    const uniqueId :any = await UniqueIdModel.findOne().exec();
    const author_Id: number = uniqueId.author_Id + 1;

    body.author_Id = author_Id;
		await AuthorModel.create(body);

    uniqueId.author_Id = author_Id;
   await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId);

		return { message: "Book Author created" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
