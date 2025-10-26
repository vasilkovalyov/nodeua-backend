import { Document } from "mongoose";
import { UserRole } from "../../types/user-role";

export type UserLoginParams = {
  email: string;
  password: string;
};

export type UserRegistrationParams = {
  email: string;
  password: string;
};

export type UserType = {
  _id: string;
  email: string;
  password: string;
  balance?: number;
  role: UserRole;
};

export type UserDBModelType = Document & UserType;
