import { ZodSchema, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schema: ZodSchema<any>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const zodError: ZodError = result.error; 
      const errors = zodError.issues.map((err) => ({
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors,
      });
    }

    req.body = result.data;
    next();
  };
