import BookModel from "~~/server/models/Book.model";

export default defineEventHandler(async (event) => {
	// get all Publishers
	return await BookModel.find().sort({_id:-1});
});
