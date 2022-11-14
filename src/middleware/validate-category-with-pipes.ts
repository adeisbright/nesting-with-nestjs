import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import * as Joi from "joi"

import { CategoryDTO } from "src/category/categroy.DTO";
 const categorySchema = Joi.object({
            name: Joi.string().min(8).required(),
            age: Joi.number().required(), 
            email : Joi.string()
        }).options({
            abortEarly : false
        })
// @Injectable()
export class CategoryValidationPipe implements PipeTransform {
    public transform(value: CategoryDTO) : CategoryDTO {
        
       

        const result = categorySchema.validate(value)
        if (result.error) {
            const errorMessages = result.error.details.map((d) => d.message).join();
            throw new BadRequestException(errorMessages);
        }
        
        return value as CategoryDTO
    }
}