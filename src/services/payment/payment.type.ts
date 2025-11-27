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
  amount: string;
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

export type IPNPaymentInvoiceProps = {
  actually_paid: number;
  actually_paid_at_fiat: number;
  fee: {
    currency: string;
    depositFee: number;
    serviceFee: number;
    withdrawalFee: number;
  };
  invoice_id: number;
  order_description: string;
  order_id: string;
  outcome_amount: number;
  outcome_currency: string;
  parent_payment_id: null;
  pay_address: string;
  pay_amount: number;
  pay_currency: string;
  payin_extra_id: number | null;
  payment_extra_ids: number | null;
  payment_id: number;
  payment_status: PaymentStatusType;
  price_amount: number;
  price_currency: string;
  purchase_id: string;
  updated_at: number;
};

export type FetchResult<T> = {
  data?: T;
  error?: string;
};
