import PaymentModel from "../../models/payment/payment-model";
import {
  CreatePaymentProps,
  CreatePaymentResponseAfterSendInvoiceProps,
  CreatePaymentResponseApiProps
} from "./payment.type";
import UserModel from "../../models/user/user-model";
import ApiError from "../../services/api-error";
import { AuthMessages } from "../../constants/response-messages";
import { createNowPaymentInvoice } from "./payments.utils";

export async function createPaymentService(props: CreatePaymentProps) {
  const { userId, amount, description, cancel_url, success_url, accessToken } = props;

  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  const response = await createNowPaymentInvoice<CreatePaymentResponseApiProps>({
    accessToken: accessToken,
    order_id: userId, // contains userId
    amount: parseFloat(amount),
    cancel_url,
    success_url
  });

  if (response.error && response.data === undefined) {
    throw ApiError.BadRequestError(response.error);
  }

  const data = response.data;

  await PaymentModel.create({
    user: userId,
    status: "waiting",
    payment_id: data?.id,
    amount: amount,
    paymentUrl: data?.invoice_url,
    description: description || ""
  });

  if (userModel.balance !== undefined) {
    userModel.balance += parseFloat(amount);
  }

  return data;
}

export async function topUpBalanceAfterInvoiceService(props: CreatePaymentResponseAfterSendInvoiceProps) {
  const { order_id, actually_paid, payment_status } = props;
  const userModel = await UserModel.findById(order_id);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  if (payment_status === "confirmed" && userModel.balance !== undefined) {
    userModel.balance += parseFloat(actually_paid);
    await userModel.save();
  }

  return {
    balance: userModel?.balance
  };
}
