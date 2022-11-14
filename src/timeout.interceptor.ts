import { NestInterceptor , CallHandler , ExecutionContext, Injectable, RequestTimeoutException } from "@nestjs/common";
import { catchError, Observable, throwError, TimeoutError , timeout } from "rxjs";

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>)
        : Observable<any> | Promise<Observable<any>> {
        
        return next.handle().pipe(
            timeout(100),
            catchError(err => {
                if (err instanceof TimeoutError) {
                    return throwError(() => new RequestTimeoutException())
                }
                return throwError(() => new Error())
            })
        )
    }
}