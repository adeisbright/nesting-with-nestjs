import {  MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common"; 
import { CategoryController } from "./category.controller"; 
import { CategoryManager } from "./category.manager";
import { CategoryService } from "./category.service";
import { CategoryValidator } from "src/middleware/validate-create-category";
import { Cat , CatSchema } from "./cat.schema";
import { MongooseModule } from "@nestjs/mongoose";

@Module({
    imports: [
        MongooseModule.forFeatureAsync([
            {
                name: Cat.name,
                useFactory: () => {
                    const schema = CatSchema;
                    schema.pre('save', function () {
                        console.log('Hello from pre save');
                    });
                    return schema;
                }
            }])
    ],
    exports:[CategoryManager],
    controllers: [CategoryController],
    providers : [CategoryService , CategoryManager]
})

export class CategoryModule{}
// export class CategoryModule implements NestModule{
//     configure(consumer: MiddlewareConsumer) {
//         consumer.
//             apply(CategoryValidator)
//             .forRoutes({
//                 path: "categories",
//                 method :RequestMethod.POST
//             })
//     }
// }