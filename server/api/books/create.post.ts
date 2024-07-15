import BookModel from "~~/server/models/Book.model";
import { BookSchema } from "~~/server/validation";

import UniqueIdModel from "~~/server/models/UniqueId.model";


export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = BookSchema.validate(body);
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
    const book_Id: number = uniqueId.book_Id + 1;

    body.book_Id = book_Id;
		await BookModel.create(body);

    uniqueId.book_Id = book_Id;
   await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId);

		return { message: "Book Created" };
	} catch (e :any) {
		throw createError({
			message: e.message,
		});
	}
});
