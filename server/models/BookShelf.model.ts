import mongoose from "mongoose";

// book shelf schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    book_shelf_Id: {
			type: Number,
			requied: true,
		},
		shelf_name: {
			type: String,
			requied: true,
		},
		no_of_sections: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

// book shelf model
export default mongoose.model("BookShelf", schema);
