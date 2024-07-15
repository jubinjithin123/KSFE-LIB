import mongoose from "mongoose";

// category schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    category_Id: {
			type: Number,
			requied: true,
		},
		category_name: {
			type: String,
			requied: true,
		},
	},
	{ timestamps: true }
);

// category model
export default mongoose.model("Category", schema);


