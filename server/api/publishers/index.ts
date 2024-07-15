import PublisherModel from "~~/server/models/Publisher.model";

export default defineEventHandler(async (event) => {
	// get all Publishers
	return await PublisherModel.find().sort({_id:-1});
});
