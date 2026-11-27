"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import styles from "./pembayaran_paket.module.css";
import { BookingStepper } from "./components/BookingStepper";
import { CountdownBanner } from "./components/CountdownBanner";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentInstruction } from "./components/PaymentInstruction";
import { OrderSummarySidebar } from "./components/OrderSummarySidebar";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";
import { PAYMENT_METHODS } from "./data/paymentData";
import { PaymentMethodId, PaketOrderSummary } from "./types";
import { PAKET_DATA } from "../../../data/paket";

function PaketPembayaranContent() {
    const params = useParams();
    const searchParams = useSearchParams();
    
    const destinationLink = (params?.destinationLink as string) || "";
    const packageId = (params?.id as string) || "";
    const totalParam = searchParams.get("total");

    const destination = PAKET_DATA.find(
        (d) => d.destinationLink.toLowerCase() === destinationLink.toLowerCase()
    ) || PAKET_DATA[0];

    const pkg = destination.packages.find(
        (p) => p.id.toLowerCase() === packageId.toLowerCase()
    ) || destination.packages[0];

    const parsePrice = (priceStr: string) => {
        const numbers = priceStr.replace(/[^0-9]/g, "");
        return parseInt(numbers, 10) || 5499000;
    };

    const packagePrice = parsePrice(pkg.price);
    const serviceFee = 25000;
    
    const calculatedTotal = totalParam
        ? parseInt(totalParam, 10)
        : packagePrice + serviceFee;

    const [orderId] = useState(() => {
        const numericHash = pkg.id.split("").reduce((acc, char) => acc + char.charCodeAt(0), 1000);
        const uniqueSuffix = String(Date.now()).slice(-4);
        return `PKT-${numericHash + 42}-${uniqueSuffix}`;
    });

    const summary: PaketOrderSummary = {
        orderId,
        destinationName: destination.name,
        packageTitle: pkg.title,
        duration: pkg.duration,
        hotelBrief: `${pkg.hotelName} (${pkg.roomType})`,
        packagePrice,
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
            await fetch("/api/pakets/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: summary.orderId,
                    destinationLink: destination.destinationLink,
                    packageId: pkg.id,
                    packageTitle: pkg.title,
                    destinationName: destination.name,
                    duration: pkg.duration,
                    hotelBrief: `${pkg.hotelName} (${pkg.roomType})`,
                    coverImage: pkg.coverImage,
                    guestName: "Budi Santoso (Tuan)",
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
                    <Link href={`/paket/${destination.destinationLink}/${pkg.id}`} className={styles.backBtn}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        <span>Kembali ke Detail Paket</span>
                    </Link>
                </div>

                <BookingStepper destinationLink={destination.destinationLink} packageId={pkg.id} destinationName={destination.name} />

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

export default function PaketPembayaranPage() {
    return (
        <Suspense fallback={<div style={{ padding: "40px", textAlign: "center" }}>Memuat halaman pembayaran...</div>}>
            <PaketPembayaranContent />
        </Suspense>
    );
}