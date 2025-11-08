import { Schema, model, Types } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { PaymentDBModelType } from "./payment-model.type";
import { BASE_PAYMENT_PRICE_CURRENCY } from "../../constants/payment";

export const PaymentSchema = new Schema<PaymentDBModelType>(
  {
    user: { type: Types.ObjectId, ref: DB_MODEL_NAME.user, required: true },
    status: {
      type: String,
      enum: ["waiting", "confirming", "confirmed", "sending", "partially_paid", "finished", "failed", "expired"],
      default: "waiting"
    },
    payment_id: String,
    amount: Number,
    payment_url: String,
    currency: {
      type: String,
      default: BASE_PAYMENT_PRICE_CURRENCY
    },
    description: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);

export default model<PaymentDBModelType>(DB_MODEL_NAME.payment, PaymentSchema);
