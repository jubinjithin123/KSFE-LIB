import UniqueIdModel from "~~/server/models/UniqueId.model";

export default defineEventHandler(async (event) => {
	// get all UniqueIdModel
	return await UniqueIdModel.find().sort({_id:-1});
});
