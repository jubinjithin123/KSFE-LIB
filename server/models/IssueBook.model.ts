import mongoose from "mongoose";
// Issue Book schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    issue_Id: {
			type: Number,
		},
    book_Id: {
			type: Number,
			requied: true,
		},
    book_name: {
			type: String,
		},
    issue_Date: {
			type: Date,
		},
    due_Date: {
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

    fine:{
      type: Number,
    },

	},
	{ timestamps: true }
);

//Issue Book model
export default mongoose.model("IssueBook", schema);
