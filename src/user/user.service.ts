import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto"

@Injectable()
    
export class UserService {
    private readonly users: CreateUserDto[] = [] 
    
    create(user: CreateUserDto) {
        this.users.push(user)
    }

    findAll(): CreateUserDto[] {
        return this.users
    }
}