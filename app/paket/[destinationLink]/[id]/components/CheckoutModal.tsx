"use client";

import { useRouter } from "next/navigation";
import styles from "../detail_paket.module.css";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  pkgTitle: string;
  hotelName: string;
  price: string;
  destinationName: string;
  outboundDate: string;
  returnDate: string;
  airline: string;
  destinationLink: string;
  packageId: string;
}

export default function CheckoutModal({
  isOpen,
  onClose,
  pkgTitle,
  hotelName,
  price,
  outboundDate,
  returnDate,
  airline,
  destinationLink,
  packageId,
}: CheckoutModalProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleProceedToPayment = () => {
    const numericPrice = price.replace(/[^0-9]/g, "");
    
    router.push(`/paket/${destinationLink}/${packageId}/pembayaran?total=${numericPrice}`);
  };

  return (
    <div className={`${styles["modal-backdrop"]} ${styles.active}`} aria-hidden="false">
      <div className={styles["modal-box"]}>
        <div className={styles["modal-icon-success"]}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 className={styles["modal-title"]}>Konfirmasi Pemesanan</h3>
        <p className={styles["modal-desc"]}>Pastikan rincian paket perjalanan Anda sudah sesuai sebelum lanjut ke halaman pembayaran.</p>
        
        <div className={styles["modal-summary-box"]}>
          <div className={styles["modal-summary-row"]}>
            <span>Paket:</span>
            <strong>{pkgTitle}</strong>
          </div>
          <div className={styles["modal-summary-row"]}>
            <span>Perjalanan:</span>
            <strong>{outboundDate} - {returnDate}</strong>
          </div>
          <div className={styles["modal-summary-row"]}>
            <span>Hotel:</span>
            <strong>{hotelName}</strong>
          </div>
          <div className={styles["modal-summary-row"]}>
            <span>Pesawat:</span>
            <strong>{airline}</strong>
          </div>
          <div className={styles["modal-summary-row"]}>
            <span>Wisatawan:</span>
            <strong>Budi Santoso (Tuan)</strong>
          </div>
          <div className={`${styles["modal-summary-row"]} ${styles.total}`}>
            <span>Total Biaya:</span>
            <strong>{price}</strong>
          </div>
        </div>

        <div className={styles["modal-actions"]}>
          <button type="button" className={styles["btn-modal-cancel"]} onClick={onClose}>
            Kembali
          </button>
          <button 
            type="button" 
            className={styles["btn-modal-confirm"]} 
            onClick={handleProceedToPayment}
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}