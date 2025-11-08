import PaymentModel from "../../models/payment/payment-model";
import {
  CreatePaymentProps,
  CreatePaymentResponseAfterSendInvoiceProps,
  CreatePaymentResponseApiProps,
  InvoiceCreateProps
} from "./payment.type";
import { BASE_PAYMENT_PAY_CURRENCY, BASE_PAYMENT_PRICE_CURRENCY } from "../../constants/payment";
import UserModel from "../../models/user/user-model";
import ApiError from "../../services/api-error";
import { AuthMessages } from "../../constants/response-messages";

type FetchResultTest<T> = {
  data?: T;
  error?: string;
};

async function customApi<T>(props: InvoiceCreateProps): Promise<FetchResultTest<T>> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const { amount, description, cancel_url, success_url, order_id } = props;

      resolve({
        data: {
          cancel_url: `${process.env.WEBSITE_API_URL}${cancel_url}`,
          collect_user_data: false,
          created_at: "2025-11-02T17:34:39.670Z",
          customer_email: null,
          id: "5485183418",
          invoice_url: "https://nowpayments.io/payment/?iid=5485183418",
          ipn_callback_url: `${process.env.WEBSITE_API_URL}/api/user/top-up-balance`,
          is_fee_paid_by_user: false,
          is_fixed_rate: false,
          order_description: description || "Order from NodeUA shop",
          order_id: order_id,
          partially_paid_url: null,
          pay_currency: BASE_PAYMENT_PAY_CURRENCY,
          payout_currency: null,
          price_amount: amount.toString(),
          price_currency: BASE_PAYMENT_PRICE_CURRENCY,
          source: null,
          success_url: `${process.env.WEBSITE_API_URL}${success_url}`,
          token_id: "5537379289",
          updated_at: "2025-11-02T17:34:39.670Z"
        } as T
      });
    }, 1000);
  });
}

export async function createPaymentService(props: CreatePaymentProps) {
  const { userId, amount, description, cancel_url, success_url, accessToken } = props;

  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  const response = await customApi<CreatePaymentResponseApiProps>({
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
