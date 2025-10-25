
export interface IBaseUser extends Document {
  email: string;
  password: string;
  role: "SuperAdmin" | "OperationsUser" | "ReportingUser" | "GeneticCounsellor"; 
  comparePassword(password: string): Promise<boolean>;
}