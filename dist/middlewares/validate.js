"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
        const zodError = result.error;
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
exports.validate = validate;
