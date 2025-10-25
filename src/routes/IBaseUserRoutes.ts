import { Router } from "express";
import { signup, login } from "../controllers/IBaseController";
import { BaseUserZodSchema, loginUserZodSchema} from './../schemas/IBaseUserSchema';
import { validate } from "../middlewares/validate";

const router = Router();

// Signup for any role
router.post("/signup", validate(BaseUserZodSchema), signup);

// Login with role
router.post("/login", validate(loginUserZodSchema),  login);

export default router;
