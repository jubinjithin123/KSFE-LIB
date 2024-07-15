import Category from "../../../server/models/Category.model";

export default defineEventHandler(async (event) => {
	// return all Categories
	return await Category.find().sort({_id:-1});

});
