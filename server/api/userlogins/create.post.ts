import UserLoginModel from "~~/server/models/UserLogin.model";
import { UserLoginSchema } from "~~/server/validation";



export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = UserLoginSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

  const employeeStatus :any = await UserLoginModel.findOne({ userName: body.userName }).exec();
  if(employeeStatus)
 {
  throw createError({
    message:"This User Already Exist !",
    statusCode: 400,
    fatal: false,
  });
 }
 
	// create Branch
	try { 

		await UserLoginModel.create(body);
		return { message: "Employee Created" };

	} catch (e :any) {
		throw createError({
			message: e.message,
		});
	}
});
