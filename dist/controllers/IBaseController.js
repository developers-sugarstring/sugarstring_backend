"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const IBaseUser_1 = require("../models/IBaseUser");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signup = async (req, res) => {
    try {
        const { email, password, role } = req.body;
        let userModel;
        if (role === "Super Admin")
            userModel = IBaseUser_1.SuperAdmin;
        else if (role === "Operations")
            userModel = IBaseUser_1.OperationsUser;
        else if (role === "Reporting")
            userModel = IBaseUser_1.ReportingUser;
        else if (role === "Genetic Counsellor")
            userModel = IBaseUser_1.GeneticCounsellor;
        else
            return res.status(400).json({ success: false, message: "Invalid role" });
        const existing = await userModel.findOne({ email });
        if (existing) {
            return res.status(400).json({ success: false, message: "Email already exists" });
        }
        const newUser = new userModel({ email, password });
        await newUser.save();
        res.status(201).json({ success: true, message: `${role} registered successfully` });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Signup failed", error: err });
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await IBaseUser_1.BaseUser.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ success: false, message: "Invalid credentials" });
        }
        const role = user.role;
        const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email, role }, process.env.JWT_SECRET, { expiresIn: "7d" });
        res.json({
            success: true,
            message: `${role} logged in successfully`,
            token,
        });
    }
    catch (err) {
        res.status(500).json({ success: false, message: "Login failed", error: err });
    }
};
exports.login = login;
