import { CanActivate , ExecutionContext, Injectable } from "@nestjs/common"
import { Observable } from "rxjs" 
import { Reflector } from "@nestjs/core"

const matchRoles = (a: string[], b: string) => a.includes(b) 

@Injectable() 
export class AuthGuard implements CanActivate{
    constructor(private reflector: Reflector) { }
    
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.get<string[]>("roles", context.getHandler())
        if (!roles) {
            return true
        }
        const request = context.switchToHttp().getRequest()
        const user = request.user 
        // return validateRequest(ctx)
        return matchRoles(roles, user.roles)
    }
}