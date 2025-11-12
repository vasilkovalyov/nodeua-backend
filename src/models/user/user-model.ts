import { Schema, model } from "mongoose";
import { UserDBModelType } from "./user-model-type";
import { DB_MODEL_NAME } from "../../constants/model-names";

export const UserSchema = new Schema<UserDBModelType>({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  balance: {
    type: Number,
    required: function (this: UserDBModelType) {
      return this.role === "user";
    },
    validate: {
      validator: function (this: UserDBModelType, v: number) {
        if (this.role === "admin" && v !== undefined) {
          return false;
        }
        return true;
      },
      message: "Admins cannot have a balance"
    }
  }
});

export default model<UserDBModelType>(DB_MODEL_NAME.user, UserSchema);
