import { z } from "zod";

export const BaseUserZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  role: z.enum(["Super Admin", "Operations", "Reporting", "Genetic Counsellor"]),
}).partial();

export const loginUserZodSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
}).partial();