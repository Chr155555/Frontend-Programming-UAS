"use client";

import React, { useState } from "react";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { HOTELS_LIST } from "../data/hotels";
import styles from "../detail.module.css";

export default function HotelDetailPage() {
    const params = useParams();
    const id = params?.id as string;
    const hotelId = parseInt(id, 10);
    const hotel = HOTELS_LIST.find((h) => h.id === hotelId);

    if (!hotel) {
        notFound();
    }

    const [addBreakfast, setAddBreakfast] = useState(false);
    const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);

    const currentPrice = addBreakfast
        ? hotel.priceNum + 150000
        : hotel.priceNum;
    const formattedPrice = "IDR " + currentPrice.toLocaleString("id-ID");

    return (
        <main className={styles.pageWrapper}>
            <Link href="/hotel" className={styles.backBtn}>
                Kembali ke Daftar Hotel
            </Link>

            <section className={styles.galleryContainer}>
                <div className={styles.galleryMain}>
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className={styles.galleryMainImg}
                    />
                </div>
                <div className={styles.gallerySubgrid}>
                    {hotel.subImages.map((imgSrc, idx) => (
                        <div className={styles.galleryItem} key={idx}>
                            <img
                                src={imgSrc}
                                alt={`${hotel.name} foto ${idx + 1}`}
                                className={styles.gallerySubImg}
                            />
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.hotelMainHeader}>
                <div className={styles.hotelHeadlineLeft}>
                    <h1 className={styles.hotelHeadlineTitle}>{hotel.name}</h1>

                    <div className={styles.hotelHeadlineRating}>
                        <span className={styles.ratingScore}>
                            {hotel.rating}/5
                        </span>
                        <span>({hotel.reviewsCount} ulasan)</span>
                        <span>-</span>
                        <span>{hotel.location}</span>
                    </div>

                    <div className={styles.hotelSpecsStrip}>
                        {hotel.specs.map((spec, idx) => (
                            <span className={styles.specPill} key={idx}>
                                {spec}
                            </span>
                        ))}
                    </div>
                </div>

                <aside className={styles.hotelPriceCard}>
                    <div className={styles.priceTopMeta}>
                        <span className={styles.flashSaleBadge}>07:34:29</span>
                        <span className={styles.discountPill}>
                            {hotel.discount}
                        </span>
                    </div>

                    <div className={styles.priceCalculation}>
                        <span className={styles.oldPrice}>
                            {hotel.oldPrice}
                        </span>
                        <div className={styles.mainPriceVal}>
                            <span>{formattedPrice}</span>
                            <span>{hotel.pricePer}</span>
                        </div>
                        <span className={styles.priceTaxNote}>
                            Termasuk pajak & seluruh biaya layanan
                        </span>
                    </div>

                    <label className={styles.addonLabel}>
                        <input
                            type="checkbox"
                            className={styles.addonCheckbox}
                            checked={addBreakfast}
                            onChange={(e) => setAddBreakfast(e.target.checked)}
                        />
                        <span>Tambah Sarapan Buffet (+IDR 150.000)</span>
                    </label>

                    <button
                        type="button"
                        className={styles.btnSelectRoom}
                        onClick={() => setIsCheckoutModalOpen(true)}
                    >
                        Pesan Sekarang
                    </button>
                </aside>
            </section>

            <section className={styles.highlightsSection}>
                <h2 className={styles.sectionTitle}>Serunya Nginep di Sini</h2>
                <div className={styles.highlightsGrid}>
                    {hotel.highlights.map((item, idx) => (
                        <div className={styles.highlightCard} key={idx}>
                            <h4>{item.title}</h4>
                            <p>{item.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className={styles.policySection}>
                <h2 className={styles.sectionTitle}>Kebijakan Akomodasi</h2>
                <div className={styles.policyGrid}>
                    <div className={styles.policyItem}>
                        <h4>Waktu Check-in & Check-out</h4>
                        <p>
                            Check-in dimulai pukul 14:00 WIB dan check-out
                            maksimal pukul 12:00 WIB.
                        </p>
                    </div>
                    <div className={styles.policyItem}>
                        <h4>Kebijakan Pembatalan</h4>
                        <p>
                            Pembatalan gratis hingga 24 jam sebelum tanggal
                            kedatangan.
                        </p>
                    </div>
                    <div className={styles.policyItem}>
                        <h4>Dokumen & Deposit</h4>
                        <p>
                            Wajib menunjukkan KTP/Paspor resmi saat proses
                            check-in.
                        </p>
                    </div>
                </div>
            </section>

            {isCheckoutModalOpen && (
                <div className={styles.modalBackdrop}>
                    <div className={styles.modalBox}>
                        <div className={styles.modalIconSuccess}>
                            <svg
                                width="26"
                                height="26"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12"></polyline>
                            </svg>
                        </div>
                        <h3 className={styles.modalTitle}>Konfirmasi Pemesanan</h3>
                        <p className={styles.modalDesc}>
                            Pastikan pilihan akomodasi dan data tamu Anda sudah sesuai sebelum melanjutkan ke halaman pembayaran.
                        </p>
                        <div className={styles.modalSummaryBox}>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <span style={{ color: "#64748b" }}>Hotel:</span>
                                <strong style={{ textAlign: "right" }}>{hotel.name}</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <span style={{ color: "#64748b" }}>Kamar:</span>
                                <strong style={{ textAlign: "right" }}>{hotel.specs[0]} ({hotel.specs[1]})</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <span style={{ color: "#64748b" }}>Sarapan:</span>
                                <strong style={{ textAlign: "right" }}>{addBreakfast ? "Termasuk Buffet (+IDR 150.000)" : "Tidak Termasuk"}</strong>
                            </div>
                            <div style={{ display: "flex", justifyContent: "space-between", gap: "10px" }}>
                                <span style={{ color: "#64748b" }}>Tamu:</span>
                                <strong style={{ textAlign: "right" }}>Budi Santoso (Tuan)</strong>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderTop: "1px dashed #e2e8f0",
                                    paddingTop: "8px",
                                    marginTop: "4px",
                                }}
                            >
                                <span style={{ color: "#0f172a", fontWeight: 700 }}>Total Biaya:</span>
                                <strong style={{ color: "#0284c7", fontSize: "15px" }}>
                                    {formattedPrice}
                                </strong>
                            </div>
                        </div>
                        <div className={styles.modalActions}>
                            <button
                                type="button"
                                className={styles.btnModalCancel}
                                onClick={() => setIsCheckoutModalOpen(false)}
                            >
                                Kembali
                            </button>
                            <Link
                                href={`/hotel/pembayaran?id=${hotel.id}&breakfast=${addBreakfast ? 1 : 0}&total=${currentPrice}`}
                                className={styles.btnModalConfirm}
                                onClick={() => setIsCheckoutModalOpen(false)}
                            >
                                Bayar Sekarang
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
