import PublisherModel from "~~/server/models/Publisher.model";
import { PublisherSchema } from "~~/server/validation";

import UniqueIdModel from "~~/server/models/UniqueId.model";


export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);

	// validate
	let { value, error } = PublisherSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Author
	try {

    const uniqueId :any = await UniqueIdModel.findOne().exec();
    const publisher_Id: number = uniqueId.publisher_Id + 1;

    body.publisher_Id = publisher_Id;
		await PublisherModel.create(body);

    uniqueId.publisher_Id = publisher_Id;
   await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId);

		return { message: "Publisher Created" };
	} catch (e:any) {
		throw createError({
			message: e.message,
		});
	}
});
