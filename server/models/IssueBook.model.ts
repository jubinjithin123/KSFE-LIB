import mongoose from "mongoose";
// Issue Book schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    issue_Id: {
			type: Number,
			requied: true,
		},
    book_Id: {
			type: Number,
			requied: true,
		},
    book_name: {
			type: String,
			required: true,
		},
    issue_Date: {
			type: Date,
			requied: true,
		},
    return_Date: {
			type: Date,
			requied: true,
		},
    employee_Id: {
			type: String,
			required: true,
		},
    employee_Name: {
			type: String,
			required: true,
		},
    br_code:{
      type: Number,
    },
    Branch:{ 
      code:Number,name: String, district: String, contactNumber: String, status: Number,
      parentBranch: { code:Number,name: String, district: String },
      },

    status: {
			type: String,
		},

    return_Remarks: {
			type: String,
		},

	},
	{ timestamps: true }
);

//Issue Book model
export default mongoose.model("IssueBook", schema);
