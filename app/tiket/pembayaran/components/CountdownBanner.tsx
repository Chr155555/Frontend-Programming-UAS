"use client";

import React, { useState, useEffect } from "react";
import styles from "../pembayaran.module.css";

interface CountdownBannerProps {
  orderId: string;
}

export const CountdownBanner: React.FC<CountdownBannerProps> = ({ orderId }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(6320);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (totalSec: number) => {
    const h = String(Math.floor(totalSec / 3600)).padStart(2, "0");
    const m = String(Math.floor((totalSec % 3600) / 60)).padStart(2, "0");
    const s = String(totalSec % 60).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <div className={styles.countdownBanner}>
      <div className={styles.countdownText}>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <polyline points="12 6 12 12 16 14"></polyline>
        </svg>
        <span>Selesaikan Pembayaran Dalam:</span>
        <strong>{formatTime(secondsLeft)}</strong>
      </div>
      <div className={styles.orderIdBadge}>
        <span>
          No. Pesanan: <strong>{orderId}</strong>
        </span>
      </div>
    </div>
  );
};
