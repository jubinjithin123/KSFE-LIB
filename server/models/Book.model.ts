import mongoose from "mongoose";

// Book schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    book_Id: {
			type: Number,
			requied: true,
		},
		shelf_name: {
			type: String,
			requied: true,
		},
		section_no: {
			type: Number,
			required: true,
		},
    book_name: {
			type: String,
			required: true,
		},
    category_name: {
			type: String,
			required: true,
		},
    author_name: {
			type: String,
			required: true,
		},
    publisher_name: {
			type: String,
			required: true,
		},
    ISBN: {
			type: String,
			required: true,
		},
    amount: {
			type: Number,
		},
    description: {
			type: String,
		},
    no_of_copies: {
			type: Number,
		},
    status: {
			type: String,
		},


	},
	{ timestamps: true }
);

// Book model
export default mongoose.model("Book", schema);
