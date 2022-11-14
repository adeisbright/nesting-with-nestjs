import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./create-user.dto"
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
    
export class UserService {
    constructor(
        @InjectRepository(User) 
        private userRepository : Repository<User>
    ){}
    private readonly users: CreateUserDto[] = [] 
    
    create(user: CreateUserDto) {
        this.users.push(user)
    }

    findAll(): CreateUserDto[] {
        return this.users
    }

    async findUsers()  :Promise<User[]> {
        return await this.userRepository.find()
    }

    async findOne(id: number): Promise<User>{
        return await this.userRepository.findOneBy({id})
    } 

    async remove(id: number): Promise<void>{
        await this.userRepository.delete({id})
    } 

    async add(data: User): Promise<User>{
        return  this.userRepository.save(data)
    } 
}