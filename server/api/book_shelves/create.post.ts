import BookShelfModel from "~~/server/models/BookShelf.model";
import { BookShelfSchema } from "~~/server/validation";

import UniqueIdModel from "~~/server/models/UniqueId.model";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = BookShelfSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Book_shelf
	try {

    const uniqueId :any = await UniqueIdModel.findOne().exec();
    const book_shelf_Id: number = uniqueId.book_shelf_Id + 1;


    body.book_shelf_Id = book_shelf_Id;
		await BookShelfModel.create(body);

    uniqueId.book_shelf_Id = book_shelf_Id;
    await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId);

		return { message: "Book Shelf created" };


	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
