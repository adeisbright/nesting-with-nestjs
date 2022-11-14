import { HydratedDocument } from "mongoose"; 
import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose"; 

export type CatDocument = HydratedDocument<Cat> 

@Schema()
export class Cat {
    @Prop()
    name: string; 

    @Prop()
    age: number; 

    @Prop({default : true}) 
    isActive: boolean 
    
    @Prop([String])
    offspring: string[] 
    
    @Prop(raw({
        location: String, 
        country : String
    }))

    address : Record<string,any>
}

export const CatSchema = SchemaFactory.createForClass(Cat)