"use client";

import React from "react";
import styles from "../tiket.module.css";
import { DateOption } from "../types";

interface DateStripProps {
  dates: DateOption[];
  selectedDate: string;
  onSelectDate: (date: string) => void;
}

export const DateStrip: React.FC<DateStripProps> = ({
  dates,
  selectedDate,
  onSelectDate,
}) => {
  return (
    <section className={styles.dateStripWrapper}>
      <div className={styles.dateStripHeader}>
        <div className={styles.dateTitle}>
          <span>Pilih Tanggal Keberangkatan</span>
        </div>
        <div className={styles.dateNote}>Tarif terendah per hari</div>
      </div>

      <div className={styles.dateCarousel}>
        {dates.map((item) => {
          const isActive = item.date === selectedDate;
          return (
            <div
              key={item.date}
              className={`${styles.dateCard} ${isActive ? styles.dateCardActive : ""}`}
              onClick={() => onSelectDate(item.date)}
            >
              {item.isCheapest && (
                <span className={styles.cheapestBadge}>Termurah</span>
              )}
              <span className={styles.dateDay}>{item.dayName}</span>
              <span className={styles.dateNum}>{item.displayDate}</span>
              <span className={styles.datePrice}>{item.priceFormatted}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};
