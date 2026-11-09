"use client";

import React from "react";
import styles from "../tiket.module.css";

export const InfoBanner: React.FC = () => {
  return (
    <section className={styles.infoBanner}>
      <div className={styles.infoTitle}>
        <span>Ketentuan & Informasi Penting Perjalanan</span>
      </div>

      <div className={styles.infoGrid}>
        <div className={styles.infoItem}>
          <h4>Masa Berlaku Paspor</h4>
          <p>
            Untuk rute internasional, pastikan masa berlaku paspor minimal 6
            bulan sebelum tanggal kepulangan.
          </p>
        </div>

        <div className={styles.infoItem}>
          <h4>Waktu Check-In</h4>
          <p>
            Konter bandara dibuka 2-3 jam sebelum keberangkatan dan ditutup
            45-60 menit sebelum jadwal terbang.
          </p>
        </div>

        <div className={styles.infoItem}>
          <h4>Ketentuan Bagasi Kabin</h4>
          <p>
            Setiap penumpang diperbolehkan membawa 1 koper kabin (maksimal 7 kg)
            serta 1 tas kecil pribadi.
          </p>
        </div>

        <div className={styles.infoItem}>
          <h4>Penerbitan E-Tiket</h4>
          <p>
            E-tiket dan voucher akan diterbitkan secara otomatis dan dikirim ke
            email Anda segera setelah pembayaran berhasil.
          </p>
        </div>
      </div>
    </section>
  );
};
