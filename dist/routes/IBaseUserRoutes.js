"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const IBaseController_1 = require("../controllers/IBaseController");
const IBaseUserSchema_1 = require("./../schemas/IBaseUserSchema");
const validate_1 = require("../middlewares/validate");
const router = (0, express_1.Router)();
// Signup for any role
router.post("/signup", (0, validate_1.validate)(IBaseUserSchema_1.BaseUserZodSchema), IBaseController_1.signup);
// Login with role
router.post("/login", (0, validate_1.validate)(IBaseUserSchema_1.loginUserZodSchema), IBaseController_1.login);
exports.default = router;
