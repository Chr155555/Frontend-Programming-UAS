export type PaymentMethodId = "bca" | "mandiri" | "qris" | "card";

export interface PaymentMethod {
  id: PaymentMethodId;
  name: string;
  badge: string;
  description: string;
  accountNumber?: string;
  instructions: string[];
}

export interface OrderSummary {
  orderId: string;
  routeText: string;
  flightBrief: string;
  ticketPrice: number;
  systemFee: number;
  totalPrice: number;
  ticketId?: string;
  dateText?: string;
}
