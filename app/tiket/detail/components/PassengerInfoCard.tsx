"use client";

import React from "react";
import styles from "../detail.module.css";
import { PassengerInfo } from "../types";

interface PassengerInfoCardProps {
  passenger: PassengerInfo;
}

export const PassengerInfoCard: React.FC<PassengerInfoCardProps> = ({
  passenger,
}) => {
  return (
    <section className={styles.passengerInfoCard}>
      <div className={styles.cardInnerHeader}>
        <div className={styles.cardInnerTitle}>
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
          <span>Data Pemesan & Penumpang</span>
        </div>
      </div>

      <div className={styles.passengerDataGrid}>
        <div className={styles.passengerDataBox}>
          <span className={styles.dataLabel}>Nama Pemesan</span>
          <span className={styles.dataVal}>{passenger.name}</span>
        </div>
        <div className={styles.passengerDataBox}>
          <span className={styles.dataLabel}>Email Konfirmasi</span>
          <span className={styles.dataVal}>{passenger.email}</span>
        </div>
        <div className={styles.passengerDataBox}>
          <span className={styles.dataLabel}>Nomor Telepon</span>
          <span className={styles.dataVal}>{passenger.phone}</span>
        </div>
        <div className={styles.passengerDataBox}>
          <span className={styles.dataLabel}>Nomor Identitas</span>
          <span className={styles.dataVal}>{passenger.idNumber}</span>
        </div>
      </div>
    </section>
  );
};
