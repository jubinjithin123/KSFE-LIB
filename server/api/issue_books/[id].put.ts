import BookModel from "~~/server/models/Book.model";
import IssueBookModel from "~~/server/models/IssueBook.model";
import { IssueBookSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = IssueBookSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Book Id
	try {


    const bookStatus :any = await BookModel.findOne({ book_Id: body.book_Id }).exec();
    bookStatus.no_of_copies = bookStatus.no_of_copies + 1;
    bookStatus.status = "Available";  
    await BookModel.findByIdAndUpdate(bookStatus._id,bookStatus); //Book table Update

    body.status = "Returned";
		await IssueBookModel.findByIdAndUpdate(id, body);
		return { message: "Returned Succesfully" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
