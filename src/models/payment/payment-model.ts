import { Schema, model, Types } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { PaymentDBModelType } from "./payment-model-type";

export const PaymentSchema = new Schema<PaymentDBModelType>({
  count: { type: Number, required: true },
  expiration_date: { type: Date, required: true },
  purchase_date: { type: Date, required: true },
  node: { type: Types.ObjectId, ref: DB_MODEL_NAME.node, required: true },
  user: { type: Types.ObjectId, ref: DB_MODEL_NAME.user, required: true }
});

export default model<PaymentDBModelType>(DB_MODEL_NAME.payment, PaymentSchema);
