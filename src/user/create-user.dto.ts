import { UserRoles } from "./user.roles"

export class CreateUserDto {
    name: string 
    age: number
    email: string
    roles : UserRoles[]
}