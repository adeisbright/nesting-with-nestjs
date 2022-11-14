import { Module } from "@nestjs/common";
import { CategoryManager } from "src/category/category.manager";
import UserController from "./user.controller";
import { UserService } from "./user.service";
import { User } from "./user.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserSubscriber } from "./user.subscriber";

@Module({
    providers: [UserService,CategoryManager , UserSubscriber],
    controllers: [UserController],
    imports: [
        TypeOrmModule.forFeature([User])
    ]
})

export class UserModule { }