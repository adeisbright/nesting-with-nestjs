import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    Post,
    Put,
    Req,
    Res,
    ParseIntPipe,
    UsePipes,
    UseGuards,
    SetMetadata
} from "@nestjs/common"
import { Request, Response } from "express"
import { AuthGuard } from "src/auth.guard"
import { CategoryValidationPipe } from "src/middleware/validate-category-with-pipes"
import { Roles } from "src/roles.decorator"
import { categorySchema } from "./category.schema"
import { CategoryService } from "./category.service"
import { CategoryDTO } from "./categroy.DTO"
import { ValidationPipe } from "./validation.pipe"

@Controller("categories")
//@UseGuards(AuthGuard)    
export class CategoryController {

    constructor(private categoryService : CategoryService){}
    @Get()
    //@SetMetadata("role"  , ["admin"])
    @Roles("admin")
    async getAll() {
        const categories = this.categoryService.getCategories()

        // res.status(HttpStatus.OK).json({
        //     message : "Categories retrieved successfully",
        //     data : categories,
        //     statusCode: 200,
        //     success  :true
        // })
        return {
            message : "Categories retrieved successfully",
            data : categories,
            statusCode: 200,
            success  :true
        }
    }

    @Get("names")
    async getCategeriesByName(
        @Req() req: Request,
        @Res({
            passthrough  :true
        }) response: Response
    ) {
        console.log(req.url)
        response.status(200).json({
            message: `This page is the name route`,
            statusCode: 200,
            data: {},
            success  :true
        })
    }

    @Post()
    @UsePipes(new ValidationPipe(categorySchema))
    async addCategory(
        // @Body(new CategoryValidationPipe()) body: CategoryDTO,
        @Body() body: CategoryDTO,
        @Res() res  :Response
    ) {
        const cat = await this.categoryService.addCat({
            name: "Small Pussy",
            age: 2, 
            offspring: ["Tomola"],
            address: {
                location: "Bayo",
                country : "Nigeria"
            }, 
            isActive : true
        })

        res.status(201).json({
            message: "I just added another category",
            statusCode: 200,
            data: {
                body,
                cat
            },
            success :true
        })
    }

    @Delete(":id")
    async deleteCategory(
        @Res({
            passthrough  :true
        }) response: Response, 
        @Param("id", ParseIntPipe) param :  number
    ) {
        response.status(200).json({
            message: `This id ${param} was deleted `,
            statusCode: 200,
            data: {},
            success  :true
        })
    }

    @Put(":id")
    async updateCategory(
        @Body() body : Record<string,any>,
        @Res({
            passthrough  :true
        }) response: Response, 
        @Param("id") param :  string
    ) {
        let person = {
            name: "Stephen Curry",
            email: "stephens.3@stephens.curry.com",
            maritalStatus  :"Married"
        }
        for (let elem of Object.keys(person)) {
            if (body.hasOwnProperty(elem)) {
                person[elem] = body[elem]
            }
        }

        response.status(200).json({
            message: `This id ${param} was updated`,
            statusCode: 200,
            data: person,
            success  :true
        })
    }
}