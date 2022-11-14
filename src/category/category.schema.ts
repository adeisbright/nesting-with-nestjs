import * as joi from "joi" 

export const categorySchema = joi.object({
    name: joi.string().min(10).required(),
    email: joi.string(), 
    age: joi.number().min(18).required(), 
    password : joi.string()  
}).options({
    abortEarly : false
})