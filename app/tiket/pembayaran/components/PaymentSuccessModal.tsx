"use client";

import React from "react";
import Link from "next/link";
import styles from "../pembayaran.module.css";

interface PaymentSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderId: string;
}

export const PaymentSuccessModal: React.FC<PaymentSuccessModalProps> = ({
  isOpen,
  onClose,
  orderId,
}) => {
  if (!isOpen) return null;

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
        <h3 className={styles.modalTitle}>Pembayaran Sedang Diverifikasi</h3>
        <p className={styles.modalDesc}>
          Terima kasih! Pembayaran untuk pesanan <strong>{orderId}</strong> sedang
          diverifikasi oleh sistem dan sudah tercatat di halaman Pesanan.
        </p>
        <Link href="/histori" className={styles.btnModalClose} onClick={onClose}>
          Lihat Pesanan Saya
        </Link>
        <Link href="/tiket" className={styles.btnModalSecondary} onClick={onClose}>
          Kembali ke Beranda Tiket
        </Link>
      </div>
    </div>
  );
};
