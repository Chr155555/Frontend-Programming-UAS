"use client";

import React from "react";
import Link from "next/link";
import styles from "../detail.module.css";

interface HotelCheckoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    hotelName: string;
    roomDetails: string;
    breakfastText: string;
    guestName: string;
    totalPriceText: string;
    paymentUrl: string;
}

export const HotelCheckoutModal: React.FC<HotelCheckoutModalProps> = ({
    isOpen,
    onClose,
    hotelName,
    roomDetails,
    breakfastText,
    guestName,
    totalPriceText,
    paymentUrl,
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
                <h3 className={styles.modalTitle}>Konfirmasi Pemesanan</h3>
                <p className={styles.modalDesc}>
                    Pastikan pilihan akomodasi dan data tamu Anda sudah sesuai sebelum melanjutkan ke halaman pembayaran.
                </p>
                <div className={styles.modalSummaryBox}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ color: "#64748b" }}>Hotel:</span>
                        <strong style={{ textAlign: "right" }}>{hotelName}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ color: "#64748b" }}>Kamar:</span>
                        <strong style={{ textAlign: "right" }}>{roomDetails}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ color: "#64748b" }}>Sarapan:</span>
                        <strong style={{ textAlign: "right" }}>{breakfastText}</strong>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                        <span style={{ color: "#64748b" }}>Tamu:</span>
                        <strong style={{ textAlign: "right" }}>{guestName}</strong>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            borderTop: "1px dashed #e2e8f0",
                            paddingTop: "8px",
                            marginTop: "4px",
                        }}
                    >
                        <span style={{ color: "#0f172a", fontWeight: 700 }}>Total Biaya:</span>
                        <strong style={{ color: "#0284c7", fontSize: "15px" }}>
                            {totalPriceText}
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
                        href={paymentUrl}
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
