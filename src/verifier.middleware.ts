import { BadRequestException } from "@nestjs/common";
import { Request, Response, NextFunction } from "express"; 
import { CustomException } from "./CustomException";

export const verifyRequestBody = async(
    req: Request, 
    res: Response, 
    next : NextFunction
) => {
    try {
        const { name } = req.body 
        if (name == undefined || name == "") {
            throw new Error("Name is required")
        }
        next()
    } catch (error: any) {
        //throw new CustomException(error.message) 
        throw new BadRequestException(error.message , "Na Bad Request")
    }
}