import axios, { AxiosResponse } from "axios";
import crypto from "crypto";

import { BASE_PAYMENT_PAY_CURRENCY, BASE_PAYMENT_PRICE_CURRENCY } from "../../constants/payment";
import { FetchResult, InvoiceCreateProps } from "./payment.type";
import { PAYMENT_FEE_PERCENT } from "./payment.constant";

function withPaymentFee(amount: number): string {
  const fee = PAYMENT_FEE_PERCENT / 100;
  return (amount / (1 - fee)).toFixed(2);
}

export async function createNowPaymentInvoice<T>(props: InvoiceCreateProps): Promise<FetchResult<T>> {
  try {
    const { amount, description, order_id } = props;

    const apiObject = {
      order_id: order_id,
      price_amount: withPaymentFee(amount),
      order_description: description || "Order from NodeUA shop",
      ipn_callback_url: `${process.env.BACKEND_API_URL}/api/ipn-payment`,
      pay_currency: BASE_PAYMENT_PAY_CURRENCY,
      price_currency: BASE_PAYMENT_PRICE_CURRENCY,
      success_url: `${process.env.WEBSITE_API_URL}/`,
      cancel_url: `${process.env.WEBSITE_API_URL}/`
    } as const;

    const response: AxiosResponse<T> = await axios.post("https://api.nowpayments.io/v1/invoice", apiObject, {
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      }
    });

    return response;
  } catch (e) {
    const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
    return { error: errorMessage };
  }
}

export function verifyNowpaymentsSignature(signature: string, body: object) {
  if (!signature) return false;

  const secret = process.env.NOWPAYMENTS_IPN_SECRET;

  if (!secret) {
    return false;
  }

  const generated = crypto
    .createHmac("sha512", process.env.NOWPAYMENTS_IPN_SECRET!)
    .update(JSON.stringify(body))
    .digest("hex");

  return signature === generated;
}
