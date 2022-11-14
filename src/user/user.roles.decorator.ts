import { SetMetadata } from "@nestjs/common"; 
import { UserRoles } from "./user.roles";

export const AuthRoles = (... roles : UserRoles []) => SetMetadata("roles" , roles)