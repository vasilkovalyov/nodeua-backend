import { Schema, model, Types } from "mongoose";
import { DB_MODEL_NAME } from "../../constants/model-names";
import { PaymentDBModelType } from "./payment-model.type";
import { BASE_PAYMENT_PAY_CURRENCY, BASE_PAYMENT_PRICE_CURRENCY } from "../../constants/payment";

export const PaymentSchema = new Schema<PaymentDBModelType>(
  {
    user: { type: Types.ObjectId, ref: DB_MODEL_NAME.user, required: true },
    status: {
      type: String,
      enum: ["waiting", "confirming", "confirmed", "sending", "partially_paid", "finished", "failed", "expired"],
      default: "waiting"
    },
    payment_id: {
      type: String
    },
    price_currency: {
      type: String,
      default: BASE_PAYMENT_PRICE_CURRENCY
    },
    pay_currency: {
      type: String,
      default: BASE_PAYMENT_PAY_CURRENCY
    },
    price_amount: {
      type: Number
    },
    invoice_url: {
      type: String
    },
    order_description: {
      type: String,
      default: ""
    },
    customer_email: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

export default model<PaymentDBModelType>(DB_MODEL_NAME.payment, PaymentSchema);
