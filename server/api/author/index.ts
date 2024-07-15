import AuthorModel from "~~/server/models/Author.model";

export default defineEventHandler(async (event) => {
	// get all authors
	return await AuthorModel.find().sort({_id:-1});
});
