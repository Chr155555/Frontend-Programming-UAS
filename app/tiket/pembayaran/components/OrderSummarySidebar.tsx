"use client";

import React from "react";
import styles from "../pembayaran.module.css";
import { OrderSummary } from "../types";

interface OrderSummarySidebarProps {
  summary: OrderSummary;
  onConfirmPayment: () => void;
}

export const OrderSummarySidebar: React.FC<OrderSummarySidebarProps> = ({
  summary,
  onConfirmPayment,
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <aside className={styles.paymentSidebar}>
      <div className={styles.summaryCard}>
        <div className={styles.summaryHeader}>
          <h3>Ringkasan Tagihan</h3>
          <span className={styles.currencyTag}>IDR</span>
        </div>

        <div className={styles.summaryFlightBrief}>
          <span className={styles.flightRouteText}>{summary.routeText}</span>
          <span className={styles.flightClassText}>{summary.flightBrief}</span>
          {summary.dateText && (
            <span style={{ fontSize: "12px", color: "#64748b", marginTop: "2px", display: "block" }}>
              {summary.dateText}
            </span>
          )}
        </div>

        <div className={styles.summaryList}>
          <div className={styles.summaryRow}>
            <span>Tiket Pesawat (Sekali Jalan)</span>
            <span>{formatRupiah(summary.ticketPrice)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Pajak & Biaya Bandara</span>
            <span className={styles.freeText}>Termasuk</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Biaya Layanan Sistem</span>
            <span>{formatRupiah(summary.systemFee)}</span>
          </div>
        </div>

        <div className={styles.summaryDivider}></div>

        <div className={styles.summaryTotalGroup}>
          <div>
            <span className={styles.totalTitle}>Total Pembayaran</span>
            <span className={styles.totalNote}>Sesuai nominal transfer</span>
          </div>
          <div className={styles.totalPriceLarge}>
            {formatRupiah(summary.totalPrice)}
          </div>
        </div>

        <button
          type="button"
          className={styles.btnCheckPayment}
          onClick={onConfirmPayment}
        >
          Saya Sudah Bayar
        </button>
      </div>

      <div className={styles.securityCard}>
        <div className={styles.secItem}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
          </svg>
          <span>Transaksi Terproteksi Enkripsi SSL 256-bit</span>
        </div>
        <div className={styles.secItem}>
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#0284c7"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>Jaminan Tiket Asli & Konfirmasi Otomatis</span>
        </div>
      </div>
    </aside>
  );
};
