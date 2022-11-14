import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectSchema } from "joi";

@Injectable()
export class ValidationPipe implements PipeTransform{
    constructor(private schema: ObjectSchema) { }
    
    transform(value: any) {
        const { error } = this.schema.validate(value) 
        console.log(error)
        if (error) {
            throw new BadRequestException("Validation Failed")
        }
        return true
    }
}