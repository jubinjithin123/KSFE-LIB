import Joi from "joi";

// book_shelf validation
export const BookShelfSchema = Joi.object({
	shelf_name: Joi.string().min(3).required(),
	no_of_sections: Joi.number().required(),
});

// author validation
export const AuthorSchema = Joi.object({
	author_name: Joi.string().min(3).required(),
});


// category validation
export const CategorySchema = Joi.object({
	category_name : Joi.string().min(3).required(),
});

// publisher validation
export const PublisherSchema = Joi.object({
	publisher_name : Joi.string().min(3).required(),
});

// UniqueId validation
export const UniqueIdSchema = Joi.object({
	book_shelf_Id: Joi.number(),
  author_Id: Joi.number(),
  category_Id: Joi.number(),
  publisher_Id: Joi.number(),
  book_Id: Joi.number(),
});


// Book validation
export const BookSchema = Joi.object({
  book_Id: Joi.number(),
  shelf_name: Joi.string().min(3).required(),
  section_no: Joi.number().required(),
  book_name: Joi.string().min(3).required(),
  category_name: Joi.string().min(3).required(),
  author_name: Joi.string().min(3).required(),
  publisher_name: Joi.string().min(3).required(),
  ISBN: Joi.string().min(3).required(),
	amount: Joi.number(),
  no_of_copies: Joi.number(),
  status : Joi.string().required(),
  description: Joi.string().allow('').optional()
});


// Branch validation
export const BranchSchema = Joi.object({
	code: Joi.number().required(),
  name: Joi.string().required(),
  district: Joi.string().required(),
  contactNumber: Joi.string().required(),
  parentBranch: Joi.object({
                  code: Joi.number().required(),
                  name: Joi.string().required(),
                  district: Joi.string().required(),
                }),
  status: Joi.number(),
});


// UserLogin validation
export const UserLoginSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  Employee_Name: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  brCode: Joi.number().required(),  //Branch Code
  NAME: Joi.string().min(3).required(), //Branch Name
  designationCode: Joi.number().required(), 
  designationName: Joi.string().min(3).required(), 
  status: Joi.number().allow(null).optional()
});


// IssueBook validation
export const IssueBookSchema = Joi.object({
  issue_Id: Joi.number(),
  book_Id: Joi.number(),
  book_name: Joi.string().min(3).required(),
  issue_Date: Joi.date(),
  return_Date: Joi.date(),
  employee_Id: Joi.string().min(3).required(),
  employee_Name: Joi.string().min(3).required(),
  status : Joi.string().required(),
  br_code: Joi.number(),

  Branch:Joi.object({
        code: Joi.number().required(),
        name: Joi.string().required(),
        district: Joi.string().required(),
        contactNumber: Joi.string().required(),
              parentBranch: Joi.object({
                code: Joi.number().required(),
                name: Joi.string().required(),
                district: Joi.string().required(),
              }),
        status: Joi.number(),
  }),

  return_Remarks: Joi.string().allow('').optional()
});


// User validation

export const UserSchema = Joi.object({
  id : Joi.number(),
  fullName: Joi.string().min(3).required(),
  username: Joi.string().min(3).required(),
  password: Joi.string().min(3).required(),
  avatar: Joi.string().allow('').optional(),
  email : Joi.string().required(),
  role : Joi.string().required(),

  abilityRules:Joi.object({
        action: Joi.string().required(),
        subject: Joi.string().required(),
  }),
});

