import { Request, Response, NextFunction } from "express"; 

export const GlobalLoggerMiddleware = async(
    req: Request, 
    res: Response, 
    next : NextFunction
) => {
    try {
        console.log(`This is a request from ${req.url}`)
        next()
    } catch (error: any) {
        res.status(400).json({
            message: error.message,
            data : {}
        })
    }
}