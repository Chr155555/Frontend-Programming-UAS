"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./pembayaran.module.css";
import { BookingStepper } from "./components/BookingStepper";
import { CountdownBanner } from "./components/CountdownBanner";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentInstruction } from "./components/PaymentInstruction";
import { OrderSummarySidebar } from "./components/OrderSummarySidebar";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";
import { PAYMENT_METHODS } from "./data/paymentData";
import { PaymentMethodId, HotelOrderSummary } from "./types";
import { HOTELS_LIST } from "../data/hotels";

function HotelPembayaranContent() {
    const searchParams = useSearchParams();
    const hotelId = parseInt(searchParams.get("id") || "1", 10);
    const hasBreakfast = searchParams.get("breakfast") === "1";
    const totalParam = searchParams.get("total");

    const hotel = HOTELS_LIST.find((h) => h.id === hotelId) || HOTELS_LIST[0];
    const roomPrice = hotel.priceNum;
    const breakfastPrice = hasBreakfast ? 150000 : 0;
    const serviceFee = 25000;
    const calculatedTotal = totalParam
        ? parseInt(totalParam, 10)
        : roomPrice + breakfastPrice + serviceFee;

    const orderId = "HT-" + (829140 + hotel.id * 31);

    const summary: HotelOrderSummary = {
        orderId,
        hotelName: hotel.name,
        hotelLocation: hotel.location,
        roomBrief: `${hotel.specs[0]} • ${hotel.specs[1]} • 1 Malam`,
        roomPrice,
        breakfastPrice,
        serviceFee,
        totalPrice: calculatedTotal,
    };

    const [selectedMethodId, setSelectedMethodId] = useState<PaymentMethodId>("bca");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

    const activeMethod =
        PAYMENT_METHODS.find((m) => m.id === selectedMethodId) ||
        PAYMENT_METHODS[0];

    const handleConfirmPayment = async () => {
        try {
            await fetch("/api/hotels/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: summary.orderId,
                    hotelId: hotel.id,
                    hotelName: hotel.name,
                    hotelLocation: hotel.location,
                    roomBrief: summary.roomBrief,
                    guestName: "Budi Santoso (Tuan)",
                    hasBreakfast,
                    paymentMethod: activeMethod.name,
                    totalPrice: summary.totalPrice,
                }),
            });
        } catch (e) {
            console.error("Booking error:", e);
        }
        setIsSuccessModalOpen(true);
    };

    return (
        <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
            <main className={styles.pageWrapper}>
                <div style={{ marginBottom: "16px" }}>
                    <Link href={`/hotel/${hotel.id}`} className={styles.backBtn}>
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Kembali ke Detail Hotel</span>
                    </Link>
                </div>

                <BookingStepper hotelId={hotel.id} />

                <CountdownBanner orderId={summary.orderId} />

                <div className={styles.paymentLayoutGrid}>
                    <div className={styles.paymentMainContent}>
                        <PaymentMethodSelector
                            methods={PAYMENT_METHODS}
                            selectedMethodId={selectedMethodId}
                            onSelectMethod={setSelectedMethodId}
                        />

                        <PaymentInstruction method={activeMethod} />
                    </div>

                    <OrderSummarySidebar
                        summary={summary}
                        onConfirmPayment={handleConfirmPayment}
                    />
                </div>

                <PaymentSuccessModal
                    isOpen={isSuccessModalOpen}
                    onClose={() => setIsSuccessModalOpen(false)}
                    orderId={summary.orderId}
                />
            </main>
        </div>
    );
}

export default function HotelPembayaranPage() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Memuat halaman pembayaran...</div>}>
            <HotelPembayaranContent />
        </Suspense>
    );
}
