import {ExceptionFilter, ArgumentsHost , Catch , HttpException,HttpStatus } from "@nestjs/common";
import { Response, Request } from "express"
import { HttpAdapterHost } from "@nestjs/core";

@Catch()
export class AllErrorFilter implements ExceptionFilter{
    constructor(private HttpAdapterHost: HttpAdapterHost) { }
    
    catch(exception: unknown, host: ArgumentsHost) {
        const { httpAdapter } = this.HttpAdapterHost
        
        const httpStatus = exception instanceof HttpException ? 
            exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
        
        const ctx = host.switchToHttp() 
      
        const responseBody = {
            time: new Date().toISOString(), 
            status: httpStatus, 
            path : httpAdapter.getRequestUrl(ctx.getRequest())
        }
        
        httpAdapter.reply(ctx.getRequest() ,  responseBody , httpStatus)
    }
}