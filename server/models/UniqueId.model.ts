import mongoose from "mongoose";

// UniqueId schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    book_shelf_Id: {
			type: Number,
			requied: true,
		},
    author_Id: {
			type: Number,
			requied: true,
		},
		category_Id: {
			type: Number,
			requied: true,
		},
    publisher_Id: {
			type: Number,
			requied: true,
		},
    book_Id: {
			type: Number,
			requied: true,
		},
    issue_Id: {
			type: Number,
			requied: true,
		},
	},
	{ timestamps: true }
);

// UniqueId model
export default mongoose.model("UniqueId", schema);
