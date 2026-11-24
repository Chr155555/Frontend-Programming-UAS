"use client";

import React from "react";
import Link from "next/link";
import styles from "../pembayaran_paket.module.css";

interface BookingStepperProps {
    destinationLink: string;
    packageId: string;
    destinationName: string;
}

export const BookingStepper: React.FC<BookingStepperProps> = ({ 
    destinationLink, 
    packageId, 
    destinationName,
}) => {
    return (
        <nav className={styles.bookingStepper} aria-label="Alur Pemesanan Paket">
            <Link
                href="/paket"
                className={`${styles.stepItem} ${styles.stepItemClickable}`}
                title="Kembali ke Pilih Destinasi"
            >
                <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 1</span>
                    <span className={styles.stepTitle}>Pilih Destinasi</span>
                </div>
            </Link>

            <div className={`${styles.stepDivider} ${styles.stepDividerCompleted}`}></div>

            <Link
                href={`/paket/${destinationLink}`}
                className={`${styles.stepItem} ${styles.stepItemClickable}`}
                title={`Kembali ke Daftar Paket ${destinationName}`}
            >
                <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 2</span>
                    <span className={styles.stepTitle}>Daftar Paket</span>
                </div>
            </Link>

            <div className={`${styles.stepDivider} ${styles.stepDividerCompleted}`}></div>

            <Link
                href={`/paket/${destinationLink}/${packageId}`}
                className={`${styles.stepItem} ${styles.stepItemClickable}`}
                title="Kembali ke Detail Paket"
            >
                <div className={`${styles.stepCircle} ${styles.stepCircleCompleted}`}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 3</span>
                    <span className={styles.stepTitle}>Detail Paket</span>
                </div>
            </Link>

            <div className={`${styles.stepDivider} ${styles.stepDividerCompleted}`}></div>

            <div className={styles.stepItem}>
                <div className={`${styles.stepCircle} ${styles.stepCircleActive}`}>4</div>
                <div className={styles.stepInfo}>
                    <span className={styles.stepNumber}>Langkah 4</span>
                    <span className={`${styles.stepTitle} ${styles.stepTitleActive}`}>
                        Pembayaran
                    </span>
                </div>
            </div>
        </nav>
    );
};