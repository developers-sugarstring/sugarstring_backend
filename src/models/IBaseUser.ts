import mongoose, { Schema } from "mongoose";
import bcrypt from "bcryptjs";
import { IBaseUser } from "../types/IBaseUser";

const baseUserSchema = new Schema<IBaseUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
  },
  { timestamps: true, discriminatorKey: "role" }
);

baseUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

baseUserSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const BaseUser = mongoose.model<IBaseUser>("BaseUser", baseUserSchema);

// Different role models
export const SuperAdmin = BaseUser.discriminator(
  "SuperAdmin",
  new Schema({})
);

export const OperationsUser = BaseUser.discriminator(
  "OperationsUser",
  new Schema({})
);

export const ReportingUser = BaseUser.discriminator(
  "ReportingUser",
  new Schema({})
);

export const GeneticCounsellor = BaseUser.discriminator(
  "GeneticCounsellor",
  new Schema({})
);
