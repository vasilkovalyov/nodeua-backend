import { PaymentStatusType } from "../../models/payment/payment-model.type";

export type CreatePaymentProps = {
  userId: string;
  amount: string;
  success_url?: string;
  cancel_url?: string;
  description?: string;
  accessToken: string;
};

export type InvoiceCreateProps = Pick<CreatePaymentProps, "description" | "accessToken"> & {
  order_id: string;
  amount: number;
};

export type CreatePaymentResponseApiProps = {
  id: string;
  token_id: string;
  order_id: string;
  order_description: string;
  price_amount: string;
  price_currency: string;
  pay_currency: string;
  ipn_callback_url: string;
  invoice_url: string;
  success_url: string;
  cancel_url: string;
  customer_email: string | null;
  partially_paid_url: string | null;
  payout_currency: string | null;
  created_at: string;
  updated_at: string;
  is_fixed_rate: boolean;
  is_fee_paid_by_user: boolean;
  source: string | null;
  collect_user_data: boolean;
};

export type CreatePaymentResponseAfterSendInvoiceProps = {
  payment_status: PaymentStatusType;
  order_id: string;
  actually_paid: string;
  payment_fee: string;
  payin_hash: string;
  pay_address: string;
  token_id: string;
};

export type FetchResult<T> = {
  data?: T;
  error?: string;
};
