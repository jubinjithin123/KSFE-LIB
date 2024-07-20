import BookModel from "~~/server/models/Book.model";
import IssueBookModel from "~~/server/models/IssueBook.model";

export default defineEventHandler(async (event) => {

  	// Get data form body
	const body = await readBody(event);
	// Get id from params
	const id = event.context.params.id;


	// Remove Issue Book
	try {

  if(body.status == "Issued"){
    const bookStatus :any = await BookModel.findOne({ book_Id: body.book_Id }).exec();
    bookStatus.no_of_copies = bookStatus.no_of_copies + 1;
    bookStatus.status = "Available";
    await BookModel.findByIdAndUpdate(bookStatus._id,bookStatus); //Book table Update
  }

		await IssueBookModel.findByIdAndDelete(id);
		return { message: "Removed" };

	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}

});
