"use client";

import React from "react";
import styles from "../detail.module.css";
import { AddonItem } from "../types";

interface PriceSidebarProps {
  departurePrice: number;
  returnPrice: number;
  systemFee: number;
  addons: AddonItem[];
  selectedAddonIds: string[];
  promoInput: string;
  onPromoInputChange: (val: string) => void;
  onApplyPromo: () => void;
  promoMessage: string;
  discount: number;
  totalPrice: number;
  onProceedPayment: () => void;
}

export const PriceSidebar: React.FC<PriceSidebarProps> = ({
  departurePrice,
  returnPrice,
  systemFee,
  addons,
  selectedAddonIds,
  promoInput,
  onPromoInputChange,
  onApplyPromo,
  promoMessage,
  discount,
  totalPrice,
  onProceedPayment,
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <aside className={styles.detailSidebar}>
      <div className={styles.pricePathCard}>
        <div className={styles.pricePathHeader}>
          <div className={styles.pricePathTitle}>
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
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
            <span>Rincian Harga</span>
          </div>
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              background: "#f1f5f9",
              color: "#0284c7",
              padding: "2px 8px",
              borderRadius: "4px",
            }}
          >
            IDR
          </span>
        </div>

        <div className={styles.pricePathBody}>
          <div className={styles.priceRouteSummary}>
            <span className={styles.routeTags}>CGK ⇄ SIN (PP)</span>
            <span className={styles.passengerTag}>1 Penumpang (Dewasa)</span>
          </div>

          <div className={styles.priceBreakdownList}>
            <div className={styles.priceRow}>
              <span className={styles.rowLabel}>Tiket Pergi (GA-820)</span>
              <span className={styles.rowVal}>{formatRupiah(departurePrice)}</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.rowLabel}>Tiket Pulang (GA-821)</span>
              <span className={styles.rowVal}>{formatRupiah(returnPrice)}</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.rowLabel}>Pajak & Biaya Bandara</span>
              <span className={styles.rowValFree}>Termasuk</span>
            </div>

            <div className={styles.priceRow}>
              <span className={styles.rowLabel}>Biaya Layanan Sistem</span>
              <span className={styles.rowVal}>{formatRupiah(systemFee)}</span>
            </div>

            {addons
              .filter((a) => selectedAddonIds.includes(a.id))
              .map((addon) => (
                <div key={addon.id} className={styles.priceRow}>
                  <span className={styles.rowLabel}>{addon.title}</span>
                  <span className={styles.rowVal}>
                    {formatRupiah(addon.price)}
                  </span>
                </div>
              ))}

            {discount > 0 && (
              <div className={styles.priceRow}>
                <span className={styles.rowLabel}>Diskon Promo</span>
                <span className={styles.rowValDiscount}>
                  -{formatRupiah(discount)}
                </span>
              </div>
            )}
          </div>

          <div className={styles.promoBox}>
            <div className={styles.promoForm}>
              <input
                type="text"
                className={styles.promoInput}
                placeholder="KODE PROMO (MISAL: TIKETHEMAT)"
                value={promoInput}
                onChange={(e) => onPromoInputChange(e.target.value)}
              />
              <button
                type="button"
                className={styles.btnApplyPromo}
                onClick={onApplyPromo}
              >
                Terapkan
              </button>
            </div>
            {promoMessage && (
              <div className={styles.promoMessage}>{promoMessage}</div>
            )}
          </div>

          <div className={styles.priceDivider}></div>

          <div className={styles.totalPaymentBox}>
            <div>
              <div className={styles.totalLabel}>Total Pembayaran</div>
              <div className={styles.totalSublabel}>
                Termasuk seluruh pajak & biaya
              </div>
            </div>
            <div className={styles.totalAmount}>{formatRupiah(totalPrice)}</div>
          </div>

          <button
            type="button"
            className={styles.btnProceedPayment}
            onClick={onProceedPayment}
          >
            <span>Lanjutkan ke Pembayaran</span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        <div className={styles.priceTrustNotes}>
          <div className={styles.trustItem}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <span>Transaksi Aman & Terenkripsi SSL</span>
          </div>
          <div className={styles.trustItem}>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#0284c7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>E-Tiket Resmi Langsung Terbit ke Email</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
