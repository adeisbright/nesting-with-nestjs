import { Injectable, NestInterceptor ,ExecutionContext,CallHandler } from "@nestjs/common";
import { Observable , tap } from "rxjs";
@Injectable() 

export class LoggingInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>)
        : Observable<any> | Promise<Observable<any>> {
        
        const request = context.switchToHttp().getRequest()

        console.log(`Request to ${request.url} at ${new Date()}`)
        
        return next.handle().pipe(
            tap(() => console.log(`Responded back at ${new Date}`))
        )
    }
}