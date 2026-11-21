"use client";

import React, { useState } from "react";
import styles from "./pembayaran.module.css";
import { BookingStepper } from "./components/BookingStepper";
import { CountdownBanner } from "./components/CountdownBanner";
import { PaymentMethodSelector } from "./components/PaymentMethodSelector";
import { PaymentInstruction } from "./components/PaymentInstruction";
import { OrderSummarySidebar } from "./components/OrderSummarySidebar";
import { PaymentSuccessModal } from "./components/PaymentSuccessModal";
import { PAYMENT_METHODS, ORDER_SUMMARY } from "./data/paymentData";
import { PaymentMethodId } from "./types";

export default function PembayaranPage() {
  const [selectedMethodId, setSelectedMethodId] =
    useState<PaymentMethodId>("bca");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState<boolean>(false);

  const activeMethod =
    PAYMENT_METHODS.find((m) => m.id === selectedMethodId) ||
    PAYMENT_METHODS[0];

  return (
    <div style={{ backgroundColor: "#f1f5f9", minHeight: "calc(100vh - 60px)" }}>
      <main className={styles.pageWrapper}>
        <BookingStepper />

        <CountdownBanner orderId={ORDER_SUMMARY.orderId} />

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
            summary={ORDER_SUMMARY}
            onConfirmPayment={() => setIsSuccessModalOpen(true)}
          />
        </div>

        <PaymentSuccessModal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          orderId={ORDER_SUMMARY.orderId}
        />
      </main>
    </div>
  );
}
