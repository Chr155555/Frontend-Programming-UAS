export type PaymentMethodId = "bca" | "mandiri" | "qris" | "card";

export interface PaymentMethod {
    id: PaymentMethodId;
    name: string;
    description: string;
    badge: string;
    accountNumber?: string;
    instructions: string[];
}

export interface PaketOrderSummary {
    orderId: string;
    destinationName: string;
    packageTitle: string;
    duration: string;
    hotelBrief: string;
    packagePrice: number;
    serviceFee: number;
    totalPrice: number;
}