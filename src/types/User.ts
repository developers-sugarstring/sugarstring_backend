import { IDisease } from "./IDisease";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  dob: Date;
  orderId: string;
  orderDate: Date;
  mobile: string;
  email: string;
  sampleReceived: Date;
  sampleId: string;
  testId: string;
  createdAt?: Date;
  updatedAt?: Date;
  disease: IDisease;
}
