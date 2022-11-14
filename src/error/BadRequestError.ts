import { HttpException, HttpStatus } from "@nestjs/common";

export class BadRequestError extends HttpException{
    constructor(message: string | Record<string,any>) {
        super(message , HttpStatus.BAD_REQUEST)
    }
   
}