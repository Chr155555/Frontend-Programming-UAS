export type PaymentMethodId = "bca" | "mandiri" | "qris" | "card";

export interface PaymentMethod {
    id: PaymentMethodId;
    name: string;
    badge: string;
    description: string;
    accountNumber?: string;
    instructions: string[];
}

export interface HotelOrderSummary {
    orderId: string;
    hotelName: string;
    hotelLocation: string;
    roomBrief: string;
    roomPrice: number;
    breakfastPrice: number;
    serviceFee: number;
    totalPrice: number;
}
