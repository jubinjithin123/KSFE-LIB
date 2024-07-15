import UserLoginModel from "~~/server/models/UserLogin.model";

export default defineEventHandler(async (event) => {
	// get all UserLogins
	return await UserLoginModel.find().sort({_id:-1});
});
