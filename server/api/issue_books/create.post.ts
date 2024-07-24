import IssueBookModel from "~~/server/models/IssueBook.model";
import { IssueBookSchema } from "~~/server/validation";

import BookModel from "~~/server/models/Book.model";
import UniqueIdModel from "~~/server/models/UniqueId.model";

import BranchModel from "~~/server/models/Branch.model";
import UserLoginModel from "~~/server/models/UserLogin.model";

import useDayjs from 'dayjs';

export default defineEventHandler(async (event) => {
	// Get data form body
	const body = await readBody(event);
  //console.log("body : ",body)
     	// validate
	let { value, error } = IssueBookSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}   

  const bookStatus :any = await BookModel.findOne({ book_Id: body.book_Id }).exec();
      if(!bookStatus) {
          throw createError({
            message:"There is No Such Book Exist !",
            statusCode: 400,
            fatal: false,
          });
        }

      if(bookStatus.no_of_copies <= 0){
          throw createError({
            message:"Book Is Not Available !",
            statusCode: 400,
            fatal: false,
          });
      }

  const uniqueId :any = await UniqueIdModel.findOne().exec();
  const issue_Id: number = uniqueId.issue_Id + 1;

      body.issue_Date = useDayjs(new Date()).format('YYYY-MM-DD');
      body.due_Date = useDayjs(new Date(body.due_Date)).format('YYYY-MM-DD');

if(body.issue_Date === body.due_Date){
      throw createError({
        message:"Book Issue Date and Due Date should not be Same !",
        statusCode: 400,
        fatal: false,
      });
}
          // Add 15 days to the date
        const date =useDayjs(new Date());
        const newDate = date.add(15, 'days');

      if(useDayjs(body.due_Date) > newDate){
        throw createError({
          message:"Book Issue Date and Due Date Not More Than 15 Days !",
          statusCode: 400,
          fatal: false,
        });
      }

       if(useDayjs(body.due_Date) < date){
          throw createError({
            message:"Due Date Must be greater than Current Day !",
            statusCode: 400,
            fatal: false,
          });
       }

const bookIssueStatus :any = await IssueBookModel.findOne( { $and: [  { userName: body.employee_Id }, { status: "Returned" } ]}).exec();
    if(bookIssueStatus){
      throw createError({
        message:"This User Already taken a Book !",
        statusCode: 400,
        fatal: false,
      });
    }

const userStatus :any = await UserLoginModel.findOne({ userName: body.employee_Id }).exec();
      if(!userStatus){
        throw createError({
          message:"This User doesn't Exist ! Please create...",
          statusCode: 400,
          fatal: false,
        });
      }
      if(!userStatus.mobileNo){
        throw createError({
          message:"Mobile Number Required ! Please Update Employee's Mobile Number",
          statusCode: 400,
          fatal: false,
        });
      }

const branchStatus :any = await BranchModel.findOne({ code: userStatus.brCode }).exec();
      if(!branchStatus){
        throw createError({
          message:"Branch Doesn't Exist !",
          statusCode: 400,
          fatal: false,
        });
      }
      

//********************************* */

    if(bookStatus){
      body.book_Id = bookStatus.book_Id;
      body.book_name = bookStatus.book_name;
    }

    if(branchStatus)
    body.Branch = branchStatus;

    if(userStatus){
      body.employee_Id = userStatus.userName;
      body.employee_Name = userStatus.Employee_Name;
      body.br_code = userStatus.brCode;
      body.mobileNo = userStatus.mobileNo;
    }

  body.status = "Issued";
  body.issue_Id = issue_Id;


	// create Book Issue
	try {

		await IssueBookModel.create(body);

    uniqueId.issue_Id = issue_Id;
    await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId); //Unique table Update

    bookStatus.no_of_copies = bookStatus.no_of_copies - 1;

    if(bookStatus.no_of_copies == 0)
       bookStatus.status = "UnAvailable";

   await BookModel.findByIdAndUpdate(bookStatus._id,bookStatus); //Book table Update

		return { message: "Book Issued" };
	} catch (e :any) {
		throw createError({
			message: e.message,
		});
	}
});


