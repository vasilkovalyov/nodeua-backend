import { Document } from "mongoose";

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
  balance: number;
};

export type UserDBModelType = Document & UserType;
