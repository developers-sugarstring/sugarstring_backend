import { z } from "zod";
export const UserZodSchema = z
  .object({
    firstName: z.string().min(2, "First name is too short"),
    lastName: z.string().min(2, "Last name is too short"),
    gender: z.enum(["Male", "Female", "Other"]),
    dob: z.coerce.date(),
    orderId: z.string().min(3, "Order ID must be at least 3 chars"),
    orderDate: z.coerce.date(),
    mobile: z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
    email: z.string().email("Invalid email"),
    sampleReceived: z.coerce.date(),
    sampleId: z.string().min(3, "Sample ID is required"),
    testId: z.string().min(2, "Test ID is required"),
  })
  .partial();

export type UserInput = z.infer<typeof UserZodSchema>;
