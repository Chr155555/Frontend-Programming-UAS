"use client";

import React from "react";
import styles from "../detail.module.css";
import { AddonItem } from "../types";

interface PriceSidebarProps {
    departurePrice: number;
    returnPrice?: number;
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
    flightCode?: string;
    routeText?: string;
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
    flightCode,
    routeText,
}) => {
    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    const selectedAddonsList = addons.filter((a) =>
        selectedAddonIds.includes(a.id)
    );

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
                        <span className={styles.routeTags}>
                            {routeText || "Penerbangan (Sekali Jalan)"}
                        </span>
                        <span className={styles.passengerTag}>1 Penumpang (Dewasa)</span>
                    </div>

                    <div className={styles.priceBreakdownList}>
                        <div className={styles.priceRow}>
                            <span className={styles.rowLabel}>
                                {flightCode ? `Tiket Pergi (${flightCode})` : "Tiket Pergi"}
                            </span>
                            <span className={styles.rowVal}>{formatRupiah(departurePrice)}</span>
                        </div>

                        {returnPrice ? (
                            <div className={styles.priceRow}>
                                <span className={styles.rowLabel}>Tiket Pulang</span>
                                <span className={styles.rowVal}>{formatRupiah(returnPrice)}</span>
                            </div>
                        ) : null}

                        <div className={styles.priceRow}>
                            <span className={styles.rowLabel}>Pajak & Biaya Bandara</span>
                            <span className={styles.rowValFree}>Termasuk</span>
                        </div>

                        <div className={styles.priceRow}>
                            <span className={styles.rowLabel}>Biaya Layanan Sistem</span>
                            <span className={styles.rowVal}>{formatRupiah(systemFee)}</span>
                        </div>

                        {selectedAddonsList.map((addon) => (
                            <div key={addon.id} className={styles.priceRow}>
                                <span className={styles.rowLabel}>{addon.title}</span>
                                <span className={styles.rowVal}>+{formatRupiah(addon.price)}</span>
                            </div>
                        ))}

                        {discount > 0 && (
                            <div className={styles.priceRow}>
                                <span className={styles.rowLabelPromo}>Potongan Promo</span>
                                <span className={styles.rowValPromo}>-{formatRupiah(discount)}</span>
                            </div>
                        )}
                    </div>

                    <div className={styles.promoFormArea}>
                        <div className={styles.promoInputWrapper}>
                            <input
                                type="text"
                                placeholder="Kode Promo (TIKETHEMAT)"
                                value={promoInput}
                                onChange={(e) => onPromoInputChange(e.target.value)}
                                className={styles.promoInputField}
                            />
                            <button
                                type="button"
                                onClick={onApplyPromo}
                                className={styles.btnApplyPromo}
                            >
                                Gunakan
                            </button>
                        </div>
                        {promoMessage && (
                            <div
                                className={
                                    discount > 0 ? styles.promoSuccessText : styles.promoErrorText
                                }
                            >
                                {promoMessage}
                            </div>
                        )}
                    </div>

                    <div className={styles.priceTotalBox}>
                        <div className={styles.totalLeft}>
                            <span className={styles.totalLabel}>Total Pembayaran</span>
                            <span className={styles.totalTaxNote}>Termasuk PPN & Surcharge</span>
                        </div>
                        <div className={styles.totalAmount}>{formatRupiah(totalPrice)}</div>
                    </div>

                    <button
                        type="button"
                        className={styles.btnProceedPayment}
                        onClick={onProceedPayment}
                    >
                        <span>Lanjut ke Pembayaran</span>
                        <svg
                            width="18"
                            height="18"
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
            </div>
        </aside>
    );
};
