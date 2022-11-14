import {
    Controller,
    Get,
    Res,
    Req,
    Post,
    Param,
    Body,
    UseFilters,
    BadRequestException,
    UnauthorizedException,
    HttpStatus,
    UseGuards,
    UseInterceptors
} from "@nestjs/common" 
import { Request  , Response} from "express"
import { CategoryManager } from "src/category/category.manager"
import { HttpExceptionFilter } from "src/CustomExceptionFilter"
import { LoggingInterceptor } from "src/logging.interceptor"
import { TimeoutInterceptor } from "src/timeout.interceptor"
import { CreateUserDto } from "./create-user.dto"
import { UserRoles } from "./user.roles"
import { AuthRoles } from "./user.roles.decorator"
import { UserGuard } from "./user.roles.guard"
import { UserService } from "./user.service"
import { User } from "./user.entity"

@Controller("users") 
@UseFilters(new HttpExceptionFilter()) //Class Scoped Filter


export default class UserController {

    constructor(
        private userService: UserService,
        private manager: CategoryManager, 
    ){ }
    
    @Get()
    async getUsers() {
        const users = await this.userService.findUsers()
        return {
            data: {
                users
            },
            message: "Users returned successfully",
            status: HttpStatus.OK, 
            success  :true
        }
    }

    @Post("sign-up")
    async addUser(
        @Body() body : User
    ) {
        const user = await this.userService.add(body) 
        console.log(user)
        return {
            data: user, 
            message :"User added successfully"
        }
    }

    @UseInterceptors(LoggingInterceptor)
    @UseInterceptors(TimeoutInterceptor)
    @Get("current") 
    async findAll(
        @Req() req: Request,
        @Res({
            passthrough: true
        }) response
    ) {
        this.manager.logName()
        const users = this.userService.findAll()
        // response.status(200).json({
        //     message: "Welcome Adeleke",
        //     data : users
        // })
        await new Promise(r => setTimeout(r, 2000));
    }

   
    @Post() 
    //@UseFilters(new HttpExceptionFilter()) //Method scoped
    @UseGuards(UserGuard)
    @AuthRoles(UserRoles.Admin)
    create(
        @Body() body: CreateUserDto,
        @Res() res : Response
    ) {
        console.log(body)
        if (body.age > 30) {
            throw new BadRequestException()
        }
        res.status(200).json({
            message : "Thank you "
        })
    }

    @Get(":id") 
    getUser(@Param() params) {
        return `Your id is ${params.id}`
    }

    @Post("auth") 
    async handleLogin(
        @Body() body : Record<string,any> 
    ) {
        const { email} = body 
        if (email !== "ade@gmail.com") {
            throw new UnauthorizedException({
                message: "Invalid Credentials provided", 
                success: false, 
                data : {}
            })
        }
        return {
            status: HttpStatus.OK,
            data: {
                token: 2344, 
            }, 
            success: true,
            message:"Login was successful"
        }
    }
}