"use client";

import React from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

interface FlightFavorite {
    id: string;
    airlineName: string;
    airlineCode: string;
    badgeStyle: string;
    flightCode: string;
    date: string;
    origin: {
        time: string;
        timezone: string;
        code: string;
        city: string;
        airport: string;
    };
    destination: {
        time: string;
        timezone: string;
        code: string;
        city: string;
        airport: string;
    };
    duration: string;
    flightType: string;
    passenger: string;
    seatNumber: string;
    cabinClass: string;
    baggage: string;
    facilities: string[];
    tagText: string;
    tagStyle: string;
    quotaText: string;
    quotaStyle: string;
    oldPrice: string;
    currentPrice: string;
    taxNote: string;
    note: string;
    link: string;
}

const FAVORITE_FLIGHTS: FlightFavorite[] = [
    {
        id: "t-1",
        airlineName: "Garuda Indonesia",
        airlineCode: "GA",
        badgeStyle: styles.badgeGaruda,
        flightCode: "GA-820 - Boeing 737-800 - Full Service",
        date: "Senin, 28 Sep 2026",
        origin: {
            time: "08:00",
            timezone: "WIB",
            code: "CGK",
            city: "Jakarta",
            airport: "Soekarno-Hatta (T3)",
        },
        destination: {
            time: "10:50",
            timezone: "SGT",
            code: "SIN",
            city: "Singapura",
            airport: "Changi Airport (T3)",
        },
        duration: "1j 50m",
        flightType: "Langsung",
        passenger: "1 Dewasa",
        seatNumber: "14A (Window)",
        cabinClass: "Ekonomi Flexi",
        baggage: "20 Kg + Kabin 7 Kg",
        facilities: [
            "Bagasi 20 kg",
            "Makanan Termasuk",
            "Port USB",
            "Bisa Reschedule",
        ],
        tagText: "Pilihan Favorit",
        tagStyle: styles.stubPopular,
        quotaText: "Tersisa 3 kursi",
        quotaStyle: styles.quotaDanger,
        oldPrice: "Rp 1.750.000",
        currentPrice: "Rp 1.485.000",
        taxNote: "Termasuk pajak & biaya bandara",
        note: "E-tiket langsung terbit",
        link: "/tiket/detail",
    },
    {
        id: "t-2",
        airlineName: "Singapore Airlines",
        airlineCode: "SQ",
        badgeStyle: styles.badgeSingapore,
        flightCode: "SQ-951 - Airbus A350-900 - Full Service",
        date: "Senin, 28 Sep 2026",
        origin: {
            time: "11:15",
            timezone: "WIB",
            code: "CGK",
            city: "Jakarta",
            airport: "Soekarno-Hatta (T3)",
        },
        destination: {
            time: "14:00",
            timezone: "SGT",
            code: "SIN",
            city: "Singapura",
            airport: "Changi Airport (T2)",
        },
        duration: "1j 45m",
        flightType: "Langsung",
        passenger: "1 Dewasa",
        seatNumber: "18C (Aisle)",
        cabinClass: "Ekonomi Standard",
        baggage: "30 Kg + Kabin 7 Kg",
        facilities: [
            "Bagasi 30 kg",
            "Makan & Minum",
            "Free Wi-Fi",
            "Hiburan Kursi",
        ],
        tagText: "Fasilitas Lengkap",
        tagStyle: styles.stubBest,
        quotaText: "Tersisa 5 kursi",
        quotaStyle: styles.quotaSafe,
        oldPrice: "Rp 2.450.000",
        currentPrice: "Rp 2.150.000",
        taxNote: "Termasuk bagasi 30kg & pajak",
        note: "Maskapai Bintang 5",
        link: "/tiket/detail",
    },
];

export default function FavoriteTiket() {
    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Tiket Pesawat Favorit</span>
            </div>

            {FAVORITE_FLIGHTS.map((flight) => (
                <article className={styles.cardTicket} key={flight.id}>
                    <div className={styles.contentTicket}>
                        <div className={styles.airlineHeader}>
                            <div className={styles.airlineInfo}>
                                <div
                                    className={`${styles.airlineCodeBadge} ${flight.badgeStyle}`}
                                >
                                    {flight.airlineCode}
                                </div>
                                <div>
                                    <div className={styles.airlineName}>
                                        {flight.airlineName}
                                    </div>
                                    <div className={styles.flightCode}>
                                        {flight.flightCode}
                                    </div>
                                </div>
                            </div>
                            <div className={styles.ticketDateBadge}>
                                <span>
                                    Tanggal: <strong>{flight.date}</strong>
                                </span>
                            </div>
                        </div>

                        <div className={styles.contentData}>
                            <div className={styles.destination}>
                                <div
                                    className={`${styles.dest} ${styles.destOrigin}`}
                                >
                                    <div className={styles.hour}>
                                        {flight.origin.time}{" "}
                                        <span className={styles.timezone}>
                                            {flight.origin.timezone}
                                        </span>
                                    </div>
                                    <div className={styles.acronym}>
                                        {flight.origin.code}
                                    </div>
                                    <div className={styles.country}>
                                        {flight.origin.city}
                                    </div>
                                    <div className={styles.airportDetail}>
                                        {flight.origin.airport}
                                    </div>
                                </div>

                                <div className={styles.flightDurationCenter}>
                                    <span className={styles.durationText}>
                                        {flight.duration}
                                    </span>
                                    <div className={styles.flightLineTrack}>
                                        <span
                                            className={styles.flightLineDot}
                                        ></span>
                                        <div className={styles.flightPlaneIcon}>
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                style={{
                                                    transform: "rotate(90deg)",
                                                }}
                                            >
                                                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
                                            </svg>
                                        </div>
                                        <span
                                            className={styles.flightLineDot}
                                        ></span>
                                    </div>
                                    <span className={styles.flightTypeBadge}>
                                        {flight.flightType}
                                    </span>
                                </div>

                                <div
                                    className={`${styles.dest} ${styles.destPoint}`}
                                >
                                    <div className={styles.hour}>
                                        {flight.destination.time}{" "}
                                        <span className={styles.timezone}>
                                            {flight.destination.timezone}
                                        </span>
                                    </div>
                                    <div className={styles.acronym}>
                                        {flight.destination.code}
                                    </div>
                                    <div className={styles.country}>
                                        {flight.destination.city}
                                    </div>
                                    <div className={styles.airportDetail}>
                                        {flight.destination.airport}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.dataFlex}>
                                <div className={styles.dataItem}>
                                    <div className={styles.dataTitle}>
                                        Penumpang
                                    </div>
                                    <div className={styles.dataSubtitle}>
                                        {flight.passenger}
                                    </div>
                                </div>
                                <div className={styles.dataItem}>
                                    <div className={styles.dataTitle}>
                                        No. Kursi
                                    </div>
                                    <div className={styles.dataSubtitle}>
                                        {flight.seatNumber}
                                    </div>
                                </div>
                                <div className={styles.dataItem}>
                                    <div className={styles.dataTitle}>
                                        Kelas
                                    </div>
                                    <div className={styles.dataSubtitle}>
                                        {flight.cabinClass}
                                    </div>
                                </div>
                                <div className={styles.dataItem}>
                                    <div className={styles.dataTitle}>
                                        Bagasi
                                    </div>
                                    <div className={styles.dataSubtitle}>
                                        {flight.baggage}
                                    </div>
                                </div>
                            </div>

                            <div className={styles.facilitiesBadges}>
                                {flight.facilities.map((fac, idx) => (
                                    <span
                                        key={idx}
                                        className={styles.badgeItem}
                                    >
                                        {fac}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.ticketStub}>
                        <div className={styles.stubTopTags}>
                            <span
                                className={`${styles.stubTag} ${flight.tagStyle}`}
                            >
                                {flight.tagText}
                            </span>
                            <div
                                className={`${styles.seatQuota} ${flight.quotaStyle}`}
                            >
                                {flight.quotaText}
                            </div>
                        </div>

                        <div className={styles.priceContainer}>
                            <div className={styles.priceLabel}>
                                Tarif per orang
                            </div>
                            <div className={styles.priceOld}>
                                {flight.oldPrice}
                            </div>
                            <div className={styles.priceCurrent}>
                                {flight.currentPrice}{" "}
                                <span className={styles.priceUnit}>/org</span>
                            </div>
                            <div className={styles.priceTax}>
                                {flight.taxNote}
                            </div>
                        </div>

                        <Link
                            href={flight.link}
                            className={styles.btnDetailTicket}
                        >
                            Lihat Tiket
                        </Link>

                        <div className={styles.ticketExtraNote}>
                            {flight.note}
                        </div>
                    </div>
                </article>
            ))}
        </div>
    );
}
