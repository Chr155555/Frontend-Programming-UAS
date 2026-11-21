"use client";

import React from "react";
import Link from "next/link";
import styles from "../detail.module.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  routeText: string;
  passengerName: string;
  totalPrice: number;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  routeText,
  passengerName,
  totalPrice,
}) => {
  if (!isOpen) return null;

  const formattedTotal = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(totalPrice);

  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalBox}>
        <div className={styles.modalIconSuccess}>
          <svg
            width="26"
            height="26"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className={styles.modalTitle}>Konfirmasi Pemesanan</h3>
        <p className={styles.modalDesc}>
          Pastikan rute dan data penumpang Anda sudah sesuai sebelum melanjutkan
          ke halaman pembayaran.
        </p>
        <div className={styles.modalSummaryBox}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Rute:</span>
            <strong>{routeText}</strong>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#64748b" }}>Penumpang:</span>
            <strong>{passengerName}</strong>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: "1px dashed #e2e8f0",
              paddingTop: "8px",
            }}
          >
            <span style={{ color: "#0f172a", fontWeight: 700 }}>Total Biaya:</span>
            <strong style={{ color: "#0284c7", fontSize: "15px" }}>
              {formattedTotal}
            </strong>
          </div>
        </div>
        <div className={styles.modalActions}>
          <button
            type="button"
            className={styles.btnModalCancel}
            onClick={onClose}
          >
            Kembali
          </button>
          <Link
            href="/booking"
            className={styles.btnModalConfirm}
            onClick={onClose}
          >
            Bayar Sekarang
          </Link>
        </div>
      </div>
    </div>
  );
};
