import { Request, Response } from "express";
import { BaseUser, SuperAdmin, OperationsUser, ReportingUser, GeneticCounsellor } from "../models/IBaseUser";
import jwt from "jsonwebtoken";

export const signup = async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body;

    let userModel;
    if (role === "Super Admin") userModel = SuperAdmin;
    else if (role === "Operations") userModel = OperationsUser;
    else if (role === "Reporting") userModel = ReportingUser;
    else if (role === "Genetic Counsellor") userModel = GeneticCounsellor;
    else return res.status(400).json({ success: false, message: "Invalid role" });

    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Email already exists" });
    }

    const newUser = new userModel({ email, password });
    await newUser.save();

    res.status(201).json({ success: true, message: `${role} registered successfully` });
  } catch (err) {
    res.status(500).json({ success: false, message: "Signup failed", error: err });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await BaseUser.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid credentials" });
    }

    const role = user.role;

    const token = jwt.sign(
      { id: user._id, email: user.email, role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      success: true,
      message: `${role} logged in successfully`,
      token,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Login failed", error: err });
  }
};
