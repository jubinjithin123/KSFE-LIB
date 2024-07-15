import mongoose from "mongoose";

// publisher schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    publisher_Id: {
			type: Number,
			requied: true,
		},
		publisher_name: {
			type: String,
			requied: true,
		},
	},
	{ timestamps: true }
);

// publisher model
export default mongoose.model("Publisher", schema);
