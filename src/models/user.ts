import { Schema, model, Types } from "mongoose";
import { ServiceNodeDBModelType } from "./node";

export type UserType = {
  _id: string;
  email: string;
  password: string;
  balance: number;
  buyed_nodes: Types.ObjectId[] | ServiceNodeDBModelType[];
};

export const UserSchema = new Schema<UserType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true },
  buyed_nodes: [{ type: Schema.Types.ObjectId, ref: "Node" }]
});

const User = model("User", UserSchema);

export default User;
