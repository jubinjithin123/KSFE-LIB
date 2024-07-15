import mongoose from "mongoose";


// UserLogin schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
		userName: {
			type: String,
			requied: true,
		},
    Employee_Name: {
			type: String,
			requied: true,
		},
    password: {
			type: String,
			requied: true,
		},
    brCode: {        //Branch Code
			type: Number,
			requied: true,
		},
    NAME: {         //Branch Name
			type: String,
			requied: true,
		},
    designationCode: {
			type: Number,
			requied: true,
		},
    designationName: {
			type: String,
			requied: true,
		},
		status: {
			type: Number,
		},
	},
	{ timestamps: true }
);

//UserLogin model
export default mongoose.model("UserLogin", schema);
