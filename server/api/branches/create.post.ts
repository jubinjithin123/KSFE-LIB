import BranchModel from "~~/server/models/Branch.model";
import { BranchSchema } from "~~/server/validation";



export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = BranchSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Branch
	try { 

		await BranchModel.create(body);
		return { message: "Branch Created" };

	} catch (e :any) {
		throw createError({
			message: e.message,
		});
	}
});
