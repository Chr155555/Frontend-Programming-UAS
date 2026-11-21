"use client";

import React from "react";
import Link from "next/link";
import styles from "../detail.module.css";

interface FlightSummaryBannerProps {
  originCode: string;
  originCity: string;
  destCode: string;
  destCity: string;
  dateRangeText: string;
  passengerInfoText: string;
}

export const FlightSummaryBanner: React.FC<FlightSummaryBannerProps> = ({
  originCode,
  originCity,
  destCode,
  destCity,
  dateRangeText,
  passengerInfoText,
}) => {
  return (
    <section className={styles.flightSummaryBanner}>
      <div className={styles.summaryRouteGroup}>
        <div className={styles.summaryRouteTitle}>
          <span>
            {originCity} ({originCode})
          </span>
          <span className={styles.summaryRouteArrow}>
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
            </svg>
          </span>
          <span>
            {destCity} ({destCode})
          </span>
        </div>
        <div className={styles.summaryBadges}>
          <span className={styles.summaryPill}>Pulang-Pergi (PP)</span>
          <span className={styles.summaryPill}>{dateRangeText}</span>
          <span className={styles.summaryPill}>{passengerInfoText}</span>
        </div>
      </div>

      <div>
        <Link href="/tiket" className={styles.btnChangeFlight}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          <span>Ubah Penerbangan</span>
        </Link>
      </div>
    </section>
  );
};
