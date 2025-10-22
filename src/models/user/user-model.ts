import { Schema, model } from "mongoose";
import { UserDBModelType } from "./user-model-type";
import { DB_MODEL_NAME } from "../../constants/model-names";

export const UserSchema = new Schema<UserDBModelType>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  balance: { type: Number, required: true }
});

export default model<UserDBModelType>(DB_MODEL_NAME.user, UserSchema);
