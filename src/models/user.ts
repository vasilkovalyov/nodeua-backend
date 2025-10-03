import { Schema, model } from "mongoose";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  balance: number;
};

export const UserSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true }
});

const User = model("User", UserSchema);

export default User;
