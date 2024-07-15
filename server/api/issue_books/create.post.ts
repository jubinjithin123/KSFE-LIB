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

	// validate
	let { value, error } = IssueBookSchema.validate(body);
	if (error) {
		throw createError({
			message: error.message.replace(/"/g, ""),
			statusCode: 400,
			fatal: false,
		});
	}

	// create Book Issue
	try {
    const bookStatus :any = await BookModel.findOne({ book_Id: body.book_Id }).exec();

    if(!bookStatus)
      return { message: "There is No Such Book Exist !" };

    if(bookStatus.no_of_copies <= 0)
       return { message: "Book Is Not Available !" };

    const uniqueId :any = await UniqueIdModel.findOne().exec();
    const issue_Id: number = uniqueId.issue_Id + 1;

  body.issue_Date = useDayjs(new Date()).format('YYYY-MM-DD');
	body.return_Date = useDayjs(new Date(body.return_Date)).format('YYYY-MM-DD');

	if(body.issue_Date === body.return_Date)
	  return { message: "Book Issue Date and Return Date should not me Same !" };

          // Add 15 days to the date
        const date =useDayjs(new Date());
        const newDate = date.add(15, 'days');

        if(useDayjs(body.return_Date) > newDate)
         return { message: "Book Issue Date and Return Date Not More Than 15 Days !" };

  const bookIssueStatus :any = await IssueBookModel.findOne({ employee_Id: body.employee_Id }).exec();
  if(bookIssueStatus)
  return { message: "This User Already taken a Book !" };

  const userStatus :any = await UserLoginModel.findOne({ userName: body.employee_Id }).exec();
  if(!userStatus)
  return { message: "This User doesn't Exist ! Please create..." };

  const branchStatus :any = await BranchModel.findOne({ code: body.br_code }).exec();
  if(!branchStatus)
  return { message: "Branch Doesn't Exist !" };

  if(branchStatus)
  body.Branch = branchStatus;

    body.issue_Id = issue_Id;
		await IssueBookModel.create(body);

    uniqueId.issue_Id = issue_Id;
    await UniqueIdModel.findByIdAndUpdate(uniqueId._id,uniqueId); //Unique table Update

    bookStatus.no_of_copies = bookStatus.no_of_copies - 1;
   await BookModel.findByIdAndUpdate(bookStatus._id,bookStatus); //Book table Update

		return { message: "Book Issued" };
	} catch (e :any) {
		throw createError({
			message: e.message,
		});
	}
});






