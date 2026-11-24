"use client";

import React from "react";
import Link from "next/link";
import styles from "../pembayaran.module.css";

interface BookingStepperProps {
    hotelId: number;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({ hotelId }) => {
    return (
        <nav className={styles.bookingStepper} aria-label="Alur Pemesanan Hotel">
            <Link
                href="/hotel"
                className={`${styles.stepItem} ${styles.stepItemClickable}`}
                title="Kembali ke Pilih Hotel"
            >
                <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 1</span>
                    <span className={styles.stepTitle}>Pilih Hotel</span>
                </div>
            </Link>

            <div className={`${styles.stepDivider} ${styles.stepDividerCompleted}`}></div>

            <Link
                href={`/hotel/${hotelId}`}
                className={`${styles.stepItem} ${styles.stepItemClickable}`}
                title="Kembali ke Detail Hotel"
            >
                <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 2</span>
                    <span className={styles.stepTitle}>Detail Hotel</span>
                </div>
            </Link>

            <div className={`${styles.stepDivider} ${styles.stepDividerCompleted}`}></div>

            <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>3</div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 3</span>
                    <span className={`${styles.stepTitle} ${styles.stepTitleActive}`}>
                        Pembayaran
                    </span>
                </div>
            </div>
        </nav>
    );
};
