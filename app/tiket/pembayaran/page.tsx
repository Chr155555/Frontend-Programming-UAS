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

  const [orderSummary, setOrderSummary] = useState<OrderSummary>(ORDER_SUMMARY);
  const [selectedMethodId, setSelectedMethodId] = useState<PaymentMethodId>("bca");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!ticketId) return;

    fetch(`/api/tickets/${ticketId}`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.data) {
          const t: Ticket = res.data;
          const parsedTotal = totalParam ? parseInt(totalParam, 10) : t.price + 25000;
          const randomOrderCode = `TK-${t.origin.code}${t.destination.code}-${t.id.replace("t-", "")}`;

          setOrderSummary({
            orderId: randomOrderCode,
            routeText: `${t.origin.city} (${t.origin.code}) → ${t.destination.city} (${t.destination.code})`,
            flightBrief: `${t.airlineName} • 1 Penumpang, ${t.cabinClass}`,
            ticketPrice: t.price,
            systemFee: 25000,
            totalPrice: parsedTotal,
            ticketId: t.id,
            dateText: t.date,
          });
        }
      })
      .catch(() => {});
  }, [ticketId, totalParam]);

  const activeMethod =
    PAYMENT_METHODS.find((m) => m.id === selectedMethodId) ||
    PAYMENT_METHODS[0];

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
            onConfirmPayment={() => setIsSuccessModalOpen(true)}
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
