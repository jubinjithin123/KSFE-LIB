import UserLoginModel from "~~/server/models/UserLogin.model";
import { UserLoginSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
	//Get id from params
	const id = event.context.params.id;

	// validate
	let { value, error } = UserLoginSchema.validate(body, { abortEarly: true, allowUnknown: true });
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// Update Book Id
	try {
		await UserLoginModel.findByIdAndUpdate(id, body);
		return { message: "Employee updated" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
