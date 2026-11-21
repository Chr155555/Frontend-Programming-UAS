"use client";

import React, { useState, use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HOTELS_LIST } from "../data/hotels";
import styles from "../detail.module.css";

export default function HotelDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = use(params);
    const hotelId = parseInt(id, 10);
    const hotel = HOTELS_LIST.find((h) => h.id === hotelId);

    if (!hotel) {
        notFound();
    }

    const [addBreakfast, setAddBreakfast] = useState(false);
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

                    <button type="button" className={styles.btnSelectRoom}>
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
        </main>
    );
}
