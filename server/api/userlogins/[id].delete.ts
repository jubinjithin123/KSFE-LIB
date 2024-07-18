import UserLoginModel from "~~/server/models/UserLogin.model";

export default defineEventHandler(async (event) => {
	// Get id from params
	const id = event.context.params.id;

	// Remove author
	try {
		await UserLoginModel.findByIdAndDelete(id);
		return { message: "Employee removed" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
