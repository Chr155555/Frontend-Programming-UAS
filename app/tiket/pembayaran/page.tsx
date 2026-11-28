"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./pembayaran.module.css";
import { BookingStepper } from "./components/BookingStepper";
import { CountdownBanner } from "./components/CountdownBanner";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentInstruction } from "./components/PaymentInstruction";
import { OrderSummarySidebar } from "./components/OrderSummarySidebar";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";
import { PAYMENT_METHODS, ORDER_SUMMARY } from "./data/paymentData";
import { PaymentMethodId, OrderSummary } from "./types";
import { Ticket } from "../types";

function PembayaranContent() {
    const searchParams = useSearchParams();
    const ticketId = searchParams.get("id");
    const totalParam = searchParams.get("total");
    const addonsParam = searchParams.get("addons");
    const discountParam = searchParams.get("discount");

    const [ticketData, setTicketData] = useState<Ticket | null>(null);
    const [orderSummary, setOrderSummary] = useState<OrderSummary>(ORDER_SUMMARY);
    const [selectedMethodId, setSelectedMethodId] = useState<PaymentMethodId>("bca");
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (!ticketId) return;

        fetch(`/api/tickets/${ticketId}`)
            .then((res) => res.json())
            .then((res) => {
                if (res.success && res.data) {
                    const t: Ticket = res.data;
                    setTicketData(t);
                    const addonsTotal = addonsParam ? parseInt(addonsParam, 10) || 0 : 0;
                    const discount = discountParam ? parseInt(discountParam, 10) || 0 : 0;
                    const parsedTotal = totalParam
                        ? parseInt(totalParam, 10)
                        : Math.max(0, t.price + 25000 + addonsTotal - discount);
                    const uniqueSuffix = String(Date.now()).slice(-4);
                    const orderCode = `TK-${t.origin.code}${t.destination.code}-${t.id.replace("t-", "")}-${uniqueSuffix}`;

                    setOrderSummary({
                        orderId: orderCode,
                        routeText: `${t.origin.city} (${t.origin.code}) → ${t.destination.city} (${t.destination.code})`,
                        flightBrief: `${t.airlineName} • 1 Penumpang, ${t.cabinClass}`,
                        ticketPrice: t.price,
                        systemFee: 25000,
                        addonsTotal,
                        discount,
                        totalPrice: parsedTotal,
                        ticketId: t.id,
                        dateText: t.date,
                    });
                }
            })
            .catch(() => {});
    }, [ticketId, totalParam, addonsParam, discountParam]);

    const activeMethod =
        PAYMENT_METHODS.find((m) => m.id === selectedMethodId) ||
        PAYMENT_METHODS[0];

    const handleConfirmPayment = async () => {
        if (isSubmitting) return;
        setIsSubmitting(true);

        let passengerName = "Budi Santoso (Tuan)";
        try {
            const storedUser = localStorage.getItem("tiketku_user");
            if (storedUser) {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser?.nama) {
                    passengerName = parsedUser.nama;
                }
            }
        } catch {}

        try {
            await fetch("/api/tickets/booking", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderId: orderSummary.orderId,
                    ticketId: ticketData?.id || ticketId || "t-1",
                    airline: ticketData?.airline || "garuda",
                    airlineName: ticketData?.airlineName || "Garuda Indonesia",
                    airlineCode: ticketData?.airlineCode || "GA",
                    flightCode: ticketData?.flightCode || "GA-820 - Boeing 737-800 - Full Service",
                    originCode: ticketData?.origin.code || "CGK",
                    originCity: ticketData?.origin.city || "Jakarta",
                    originTime: ticketData?.origin.time || "08:00",
                    destinationCode: ticketData?.destination.code || "SIN",
                    destinationCity: ticketData?.destination.city || "Singapura",
                    destinationTime: ticketData?.destination.time || "10:50",
                    dateFormatted: ticketData?.date || "Senin, 28 Sep 2026",
                    passenger: ticketData?.passenger || "1 Dewasa",
                    cabinClass: ticketData?.cabinClass || "Ekonomi",
                    passengerName,
                    paymentMethod: activeMethod.name,
                    totalPrice: orderSummary.totalPrice,
                }),
            });
        } catch {}

        setIsSubmitting(false);
        setIsSuccessModalOpen(true);
    };

    return (
        <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
            <main className={styles.pageWrapper}>
                <BookingStepper ticketId={orderSummary.ticketId || ticketId || undefined} />

                <CountdownBanner orderId={orderSummary.orderId} />

                <div className={styles.paymentLayoutGrid}>
                    <div className={styles.paymentMainContent}>
                        <PaymentMethodSelector
                            methods={PAYMENT_METHODS}
                            selectedMethodId={selectedMethodId}
                            onSelectMethod={setSelectedMethodId}
                        />

                        <PaymentInstruction
                            method={activeMethod}
                            totalPrice={orderSummary.totalPrice}
                        />
                    </div>

                    <OrderSummarySidebar
                        summary={orderSummary}
                        onConfirmPayment={handleConfirmPayment}
                        isSubmitting={isSubmitting}
                    />
                </div>

                <PaymentSuccessModal
                    isOpen={isSuccessModalOpen}
                    onClose={() => setIsSuccessModalOpen(false)}
                    orderId={orderSummary.orderId}
                />
            </main>
        </div>
    );
}

export default function PembayaranPage() {
    return (
        <Suspense
            fallback={
                <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ color: "#0284c7", fontWeight: 600 }}>Memuat halaman pembayaran...</div>
                </div>
            }
        >
            <PembayaranContent />
        </Suspense>
    );
}
