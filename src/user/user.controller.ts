import {
    Controller,
    Get,
    Res,
    Req,
    Post,
    Param,
    Body,
    UseFilters,
    BadRequestException
} from "@nestjs/common" 
import { Request  , Response} from "express"
import { HttpExceptionFilter } from "src/CustomExceptionFilter"
import { CreateUserDto } from "./create-user.dto"
import { UserService } from "./user.service"

@Controller("users") 
@UseFilters(new HttpExceptionFilter()) //Class Scoped Filter
export default class UserController {

    constructor(private userService: UserService) { }
    
    @Get("current") 
    async findAll(
        @Req() req: Request,
        @Res({
            passthrough: true
        }) response
    ) {
        const users = this.userService.findAll()
        response.status(200).json({
            message: "Welcome Adeleke", 
            data : users
        })
    }

   
    @Post() 
    //@UseFilters(new HttpExceptionFilter()) //Method scoped
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
}