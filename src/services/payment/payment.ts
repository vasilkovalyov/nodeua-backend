import PaymentModel from "../../models/payment/payment-model";
import {
  CreatePaymentProps,
  CreatePaymentResponseAfterSendInvoiceProps,
  CreatePaymentResponseApiProps
} from "./payment.type";
import UserModel from "../../models/user/user-model";
import ApiError from "../../services/api-error";
import { AuthMessages } from "../../constants/response-messages";
import { createNowPaymentInvoice } from "./payment.utils";

export async function createPaymentService(props: CreatePaymentProps) {
  const { accessToken, userId, amount } = props;

  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  const response = await createNowPaymentInvoice<CreatePaymentResponseApiProps>({
    accessToken: accessToken,
    order_id: userId, // contains userId
    amount: parseFloat(amount)
  });

  const data = response.data;

  if (response.error) {
    throw ApiError.BadRequestError(response.error);
  }

  await PaymentModel.create({
    user: userId,
    status: "waiting",
    payment_id: data?.id,
    price_amount: data?.price_amount,
    invoice_url: data?.invoice_url,
    order_description: data?.order_description || "",
    price_currency: data?.price_currency,
    pay_currency: data?.pay_currency,
    customer_email: data?.customer_email
  });

  return data;
}

export async function topUpBalanceAfterInvoiceService(props: CreatePaymentResponseAfterSendInvoiceProps) {
  const { order_id, payment_status } = props;

  if (payment_status === "confirmed") {
    await PaymentModel.findOneAndUpdate({ user: order_id }, { $set: { status: "confirmed" } }, { new: true });
  }
}
