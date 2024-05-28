import { Response } from "express"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const responseHandler = (res: Response, statusCode:number, success:boolean,  message:string, data: any) =>{
  res.status(statusCode).json({
    success,
    message,
    data
  })
}