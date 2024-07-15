
import mongoose from "mongoose";
//User schema
const schema: mongoose.Schema = new mongoose.Schema(
	{
    id: {
			type: Number,
			requied: true,
		},
    fullName: {
			type: String,
			required: true,
		},
    username: {
			type: String,
			required: true,
		},
    password: {
			type: String,
			required: true,
		},
    avatar: {
			type: String,
			required: true,
		},
    email: {
			type: String,
			required: true,
		},
    role: {
			type: String,
			required: true,
		},

    abilityRules:{ 
          action: String, 
          subject: String
      },


	},
	{ timestamps: true }
);

//Issue Book model
export default mongoose.model("User", schema);
