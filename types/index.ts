
export { };

declare global{

  export interface IBookShelf {
    book_shelf_Id?: number;
    shelf_name: string;
    no_of_sections: number;
    _id?: string;
  }

  export interface IAuthor {
    author_Id?: number;
    author_name: string;
    _id?: string;
  }

  export interface ICategory {
    category_Id?: number;
    category_name: string;
    _id?: string;
  }

  export interface IPublisher {
    publisher_Id?: number;
    publisher_name: string;
    _id?: string;
  }

  export interface IBook {
    book_Id?: number;
    shelf_name: string;
    section_no: number;
    book_name: string;
    category_name: string;
    author_name: string;
    publisher_name: string;
    ISBN: string;
    amount: number;
    no_of_copies: number;
    status : string;
    description?: string;
    _id?: string;
  }

  
  export interface IBranch {
    code?: number;
    name?: string;
    district?: string;
    contactNumber?: string;
    parentBranch: { code:Number,name: String, district: String },
    //parentBranch: [{ code:Number,name: String, district: String }],
    status?: number;
    _id?: string;
  }

  export interface IUserLogin{
    userName: string;
    Employee_Name: string;
    password: string;
    brCode: number; //Branch Code
    NAME: string; //Branch Name
    designationCode: number;
    designationName: string;
    status?: number;
    _id?: string;
  }

  export interface IIssueBook {
    issue_Id?: number;
    book_Id: number;
    book_name?: string;
    issue_Date?: Date;
    due_Date: Date;
    return_Date?: Date;
    employee_Id: string;
    employee_Name?: string;
    br_code?: number;
    fine?: number;
    Branch?:{ 
           code:Number,name: String, district: String, contactNumber?: string, status?: number
           parentBranch: { code:Number,name: String, district: String },
           };
    status?: string;
    return_Remarks?: string;
    _id?: string;
  }



  export interface IUser {
  id : number;
  fullName: string;
  username: string;
  password: string;
  avatar: string;
  email : string;
  role : string;

  abilityRules:{
        action: string;
        subject: string;
  }
}

  
}




