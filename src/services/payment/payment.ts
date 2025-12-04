import PaymentModel from "../../models/payment/payment-model";
import {
  CreatePaymentProps,
  CreatePaymentResponseAfterSendInvoiceProps,
  CreatePaymentResponseApiProps,
  IPNPaymentInvoiceProps
} from "./payment.type";
import UserModel from "../../models/user/user-model";
import ApiError from "../../services/api-error";
import { AuthMessages } from "../../constants/response-messages";
import { createNowPaymentInvoice, getRoundedAmount } from "./payment.utils";

export async function createPaymentService(props: CreatePaymentProps) {
  const { accessToken, userId, amount } = props;

  const userModel = await UserModel.findById(userId);
  if (!userModel) throw ApiError.BadRequestError(AuthMessages.userNotFound);

  const response = await createNowPaymentInvoice<CreatePaymentResponseApiProps>({
    accessToken: accessToken,
    order_id: userId, // contains userId
    amount: amount
  });

  const data = response.data;

  if (response.error) {
    throw ApiError.BadRequestError(response.error);
  }

  await PaymentModel.create({
    user: data?.order_id,
    status: "waiting",
    payment_id: data?.id,
    price_currency: data?.price_currency,
    price_amount: data ? getRoundedAmount(+data.price_amount) : 0,
    pay_currency: data?.pay_currency,
    invoice_url: data?.invoice_url,
    order_description: data?.order_description || "",
    customer_email: data?.customer_email
  });

  return data;
}

export async function ipnPaymentInvoiceService(props: IPNPaymentInvoiceProps) {
  const {
    invoice_id,
    payment_status,
    order_id: userId,
    outcome_amount,
    fee,
    outcome_currency,
    pay_address,
    pay_amount,
    purchase_id
  } = props;

  const payment = await PaymentModel.findOne({ payment_id: invoice_id });

  if (!payment) {
    throw ApiError.BadRequestError("Payment record not found");
  }

  payment.status = payment_status;
  await payment.save();

  if (payment_status === "finished" && !payment.is_balance_credited) {
    const user = await UserModel.findById(userId);

    if (user) {
      await UserModel.findByIdAndUpdate(userId, {
        $inc: { balance: getRoundedAmount(outcome_amount) }
      });

      payment.is_balance_credited = true;
      payment.outcome_amount = +getRoundedAmount(outcome_amount);

      payment.fee_currency = fee.currency;
      payment.fee_deposit = fee.depositFee;
      payment.fee_service = fee.serviceFee;
      payment.fee_withdrawal = fee.withdrawalFee;
      payment.outcome_currency = outcome_currency;
      payment.pay_address = pay_address;
      payment.pay_amount = +getRoundedAmount(pay_amount);
      payment.purchase_id = purchase_id;

      await payment.save();
      return "IPN received successfully";
    } else {
      throw ApiError.BadRequestError(`User with ID ${userId} not found.`);
    }
  }

  return "IPN successfully processed";
}

export async function topUpBalanceAfterInvoiceService(props: CreatePaymentResponseAfterSendInvoiceProps) {
  const { order_id, payment_status } = props;

  if (payment_status === "confirmed") {
    await PaymentModel.findOneAndUpdate({ user: order_id }, { $set: { status: "confirmed" } }, { new: true });
  }
}
