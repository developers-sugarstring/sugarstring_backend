"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserZodSchema = exports.BaseUserZodSchema = void 0;
const zod_1 = require("zod");
exports.BaseUserZodSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
    role: zod_1.z.enum(["Super Admin", "Operations", "Reporting", "Genetic Counsellor"]),
}).partial();
exports.loginUserZodSchema = zod_1.z.object({
    email: zod_1.z.string().email("Invalid email address"),
    password: zod_1.z.string().min(6, "Password must be at least 6 characters long"),
}).partial();
