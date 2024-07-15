import IssueBookModel from "~~/server/models/IssueBook.model";

export default defineEventHandler(async (event) => {
	// get all Publishers
	return await IssueBookModel.find().sort({_id:-1});
});
