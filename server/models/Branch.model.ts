import mongoose from "mongoose";


// Branch schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    code: {
			type: Number,
			requied: true,
		},
		name: {
			type: String,
			requied: true,
		},
    district: {
			type: String,
			requied: true,
		},
    contactNumber: {
			type: String,
			requied: true,
		},
    
    //parentBranch: [{ code:Number,name: String, district: String }],
    parentBranch: { code:Number,name: String, district: String },

		status: {
			type: Number,
			required: true,
		},
	},
	{ timestamps: true }
);

//Branch model
export default mongoose.model("Branch", schema);
