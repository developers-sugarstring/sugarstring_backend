"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserZodSchema = void 0;
const zod_1 = require("zod");
exports.UserZodSchema = zod_1.z
    .object({
    firstName: zod_1.z.string().min(2, "First name is too short"),
    lastName: zod_1.z.string().min(2, "Last name is too short"),
    gender: zod_1.z.enum(["Male", "Female", "Other"]),
    dob: zod_1.z.coerce.date(),
    orderId: zod_1.z.string().min(3, "Order ID must be at least 3 chars"),
    orderDate: zod_1.z.coerce.date(),
    mobile: zod_1.z.string().regex(/^[0-9]{10}$/, "Mobile must be 10 digits"),
    email: zod_1.z.string().email("Invalid email"),
    sampleReceived: zod_1.z.coerce.date(),
    sampleId: zod_1.z.string().min(3, "Sample ID is required"),
    testId: zod_1.z.string().min(2, "Test ID is required"),
})
    .partial();
