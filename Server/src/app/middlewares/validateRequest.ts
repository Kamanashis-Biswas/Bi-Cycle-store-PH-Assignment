import { AnyZodObject } from "zod";
import asyncFunc from "../utils/asyncFunc";
import { NextFunction, Request, Response } from "express";

const validateRequest = (schema: AnyZodObject) => {
    return asyncFunc(async (req: Request, res: Response, next: NextFunction) => {
        const validation = await schema.parseAsync({
            body: req.body,
            cookies: req.cookies
        })
        req.body = validation.body
        next()
    })
}
export default validateRequest