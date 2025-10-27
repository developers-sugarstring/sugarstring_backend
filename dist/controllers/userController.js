"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserBySampleId = exports.updateUserDisease = exports.deleteUser = exports.updateUser = exports.getUserById = exports.getUsers = exports.createUser = void 0;
const User_1 = __importDefault(require("../models/User"));
// CREATE
const createUser = async (req, res) => {
    try {
        const user = new User_1.default(req.body);
        await user.save();
        res.status(201).json({
            success: true,
            message: "User created successfully.",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.createUser = createUser;
// READ - All Users
const getUsers = async (_, res) => {
    try {
        const users = await User_1.default.find();
        res.json({
            success: true,
            message: "Users fetched successfully.",
            data: users,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch users. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.getUsers = getUsers;
// READ - Single User by ID
const getUserById = async (req, res) => {
    try {
        const user = await User_1.default.findById(req.params.id);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        res.json({
            success: true,
            message: "User fetched successfully.",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.getUserById = getUserById;
// UPDATE
const updateUser = async (req, res) => {
    try {
        const updatedUser = await User_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        res.json({
            success: true,
            message: "User updated successfully.",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update user. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.updateUser = updateUser;
// DELETE
const deleteUser = async (req, res) => {
    try {
        const deletedUser = await User_1.default.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found.",
            });
        }
        res.json({
            success: true,
            message: "User deleted successfully.",
            data: deletedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete user. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.deleteUser = deleteUser;
// UPDATE USER DISEASE DETAILS
const updateUserDisease = async (req, res) => {
    try {
        const { id } = req.params;
        const { header, drugResponse, geneticMutation, reportGenerated } = req.body;
        const user = await User_1.default.findById(id);
        if (!user)
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        if (!user.disease)
            user.disease = {};
        // Merge only what is provided
        if (header)
            user.disease.header = [...(user.disease.header ?? []), ...header];
        if (drugResponse) {
            user.disease.drugResponse = {
                drugsToAvoid: [
                    ...(user.disease.drugResponse?.drugsToAvoid ?? []),
                    ...(drugResponse.drugsToAvoid ?? []),
                ],
                drugsWithCaution: [
                    ...(user.disease.drugResponse?.drugsWithCaution ?? []),
                    ...(drugResponse.drugsWithCaution ?? []),
                ],
            };
        }
        if (geneticMutation) {
            user.disease.geneticMutation = [
                ...(user.disease.geneticMutation ?? []),
                ...geneticMutation,
            ];
        }
        if (reportGenerated) {
            user.disease.reportGenerated = new Date(reportGenerated);
        }
        else {
            user.disease.reportGenerated = new Date();
        }
        const updatedUser = await user.save();
        res.json({
            success: true,
            message: "Disease details updated successfully",
            data: updatedUser,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update disease details",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.updateUserDisease = updateUserDisease;
// READ - Single User by Sample ID
const getUserBySampleId = async (req, res) => {
    try {
        const { sampleId } = req.params;
        const user = await User_1.default.findOne({ sampleId });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User with this sample ID not found.",
            });
        }
        res.json({
            success: true,
            message: "User fetched successfully.",
            data: user,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch user by sample ID. Please try again later.",
            error: err instanceof Error ? err.message : "Server Error",
        });
    }
};
exports.getUserBySampleId = getUserBySampleId;
