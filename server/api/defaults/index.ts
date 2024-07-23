import useDayjs from 'dayjs';
import IssueBookModel from "~~/server/models/IssueBook.model";

export default defineEventHandler(async (event) => {

  const today =useDayjs(new Date());

  const defaultStatus :any = await IssueBookModel.find( 
    { $and: [  { due_Date: {$lte: today }} , { status: "Issued" } ] }
    ).sort({_id:-1}).exec();


return defaultStatus;




});


/***
 *  , { status: "Issued" }
 * 
 * 
 * 
 *     if(!defaultStatus){
      throw createError({
        message:"No Defaulters Found !",
        statusCode: 400,
        fatal: false,
      });
    }
 */
