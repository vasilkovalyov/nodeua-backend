import axios, { AxiosResponse } from "axios";
import crypto from "crypto";

import { BASE_PAYMENT_PAY_CURRENCY, BASE_PAYMENT_PRICE_CURRENCY } from "../../constants/payment";
import { FetchResult, InvoiceCreateProps } from "./payment.type";

export async function createNowPaymentInvoice<T>(props: InvoiceCreateProps): Promise<FetchResult<T>> {
  try {
    const { amount, description, cancel_url, success_url, order_id } = props;

    const apiObject = {
      order_id: order_id,
      price_amount: amount,
      order_description: description || "Order from NodeUA shop",
      ipn_callback_url: `${process.env.WEBSITE_API_URL}/api/top-up-balance`,
      pay_currency: BASE_PAYMENT_PAY_CURRENCY,
      price_currency: BASE_PAYMENT_PRICE_CURRENCY,
      success_url: `${process.env.WEBSITE_API_URL}${success_url}`,
      cancel_url: `${process.env.WEBSITE_API_URL}${cancel_url}`
    } as const;

    const response: AxiosResponse<T> = await axios.post("https://api.nowpayments.io/v1/payment", apiObject, {
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
