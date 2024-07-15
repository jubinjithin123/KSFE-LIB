import BookShelfModel from "~~/server/models/BookShelf.model";

export default defineEventHandler(async (event) => {
	// get all books & populate the authors
	return await BookShelfModel.find().sort({_id:-1});
});
