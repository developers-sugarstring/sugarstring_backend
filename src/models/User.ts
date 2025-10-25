import mongoose, { Schema } from "mongoose";
import { IUser } from "../types/User";
import { DiseaseSchema } from "./Disease";

const UserSchema: Schema<IUser> = new Schema(
  {
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    dob: { type: Date, required: true },

    orderId: { type: String},
    orderDate: { type: Date},

    mobile: {
      type: String,
      required: true,
      match: /^[0-9]{10}$/,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      match: /.+\@.+\..+/,
    },

    sampleReceived: { type: Date },
    sampleId: { type: String },
    testId: { type: String},
    disease: { type: DiseaseSchema, default: {} },
  },
  { timestamps: true }
);

const User =  mongoose.model<IUser>("User", UserSchema);

export default User;
