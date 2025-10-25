import { Request, Response } from "express";
import User from "../models/User";
import { IDisease } from "../types/IDisease";

// CREATE
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json({
      success: true,
      message: "User created successfully.",
      data: user,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// READ - All Users
export const getUsers = async (_: Request, res: Response) => {
  try {
    const users = await User.find();
    res.json({
      success: true,
      message: "Users fetched successfully.",
      data: users,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch users. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// READ - Single User by ID
export const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.params.id);
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// UPDATE
export const updateUser = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update user. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// DELETE
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to delete user. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// UPDATE USER DISEASE DETAILS
export const updateUserDisease = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { header, drugResponse, geneticMutation, reportGenerated } = req.body;

    const user = await User.findById(id);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    if (!user.disease) user.disease = {} as IDisease;

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
    } else {
      user.disease.reportGenerated = new Date();
    }

    const updatedUser = await user.save();

    res.json({
      success: true,
      message: "Disease details updated successfully",
      data: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to update disease details",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};

// READ - Single User by Sample ID
export const getUserBySampleId = async (req: Request, res: Response) => {
  try {
    const { sampleId } = req.params;
    const user = await User.findOne({ sampleId });

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
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch user by sample ID. Please try again later.",
      error: err instanceof Error ? err.message : "Server Error",
    });
  }
};
