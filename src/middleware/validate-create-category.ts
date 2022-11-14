import { NestMiddleware , Body } from "@nestjs/common";
import { Request, Response, NextFunction } from "express"
import { BadRequestError } from "src/error/BadRequestError";

export class CategoryValidator implements NestMiddleware {
    use(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        try {
            let { name } = req.body 
            if (name == null || name.length < 10) {

                throw new BadRequestError({
                    message: "Hello",
                    time : new Date()
                })
            }
            next()
        } catch (error: any) {
            res.status(error.status).json({
                message: error.message,
                data: error,
                success: false,
                statusCode : error.status
            })
        }
    }
}