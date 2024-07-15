import BookModel from "~~/server/models/Branch.model";

export default defineEventHandler(async (event) => {
	// get all Branches
	return await BookModel.find().sort({_id:-1});
});
