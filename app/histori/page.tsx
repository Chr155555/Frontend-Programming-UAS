"use client";

import React, { useEffect, useState } from "react";
import styles from "./histori.module.css";

interface HotelBookingRecord {
    id: number;
    orderId: string;
    hotelId: number;
    hotelName: string;
    hotelLocation: string;
    roomBrief: string;
    guestName: string;
    hasBreakfast: number;
    paymentMethod: string;
    totalPrice: number;
    status: string;
    createdAt: string;
}

interface HotelHistoryItem {
    key: string;
    image: string;
    name: string;
    location: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    rooms: string;
    orderId?: string;
    total: string;
    status: "Berhasil" | "Dibatalkan" | "Diverifikasi";
}

interface TicketBookingRecord {
    id: number;
    orderId: string;
    ticketId: string;
    airline: string;
    airlineName: string;
    airlineCode: string;
    flightCode: string;
    originCode: string;
    originCity: string;
    originTime: string;
    destinationCode: string;
    destinationCity: string;
    destinationTime: string;
    dateFormatted: string;
    passenger: string;
    cabinClass: string;
    passengerName: string;
    paymentMethod: string;
    totalPrice: number;
    status: string;
    createdAt: string;
}

interface FlightHistoryItem {
    key: string;
    badge: string;
    badgeClass: "garuda" | "singapore" | "batik" | "citilink" | "airasia";
    airline: string;
    codeInfo: string;
    depTime: string;
    depCode: string;
    depCity: string;
    arrTime: string;
    arrCode: string;
    arrCity: string;
    dateInfo: string;
    orderId?: string;
    paymentMethod?: string;
    total: string;
    status: "Berhasil" | "Diverifikasi" | "Dibatalkan";
}

interface PackageHistoryItem {
    key: string;
    image: string;
    title: string;
    location: string;
    departure: string;
    duration: string;
    participants: string;
    facilities: string;
    total: string;
    status: "Berhasil";
}

const STATIC_PACKAGE_HISTORY: PackageHistoryItem[] = [
    {
        key: "static-package-1",
        image: "/paket/destinasi/singapore.jpg",
        title: "Paket Wisata Singapura — Super Thrill Pack",
        location: "Singapura • The Standard Hotel Singapore",
        departure: "30 November 2026",
        duration: "3 Hari 2 Malam",
        participants: "2 Orang",
        facilities: "Hotel & Tiket PP",
        total: "IDR 24.599.998",
        status: "Berhasil",
    },
];

const STATIC_HOTEL_HISTORY: HotelHistoryItem[] = [
    {
        key: "static-hotel-1",
        image: "/hotel/1.png",
        name: "Grand Sahid Jaya Jakarta",
        location: "Tanah Abang, Jakarta Pusat, DKI Jakarta",
        checkIn: "12 Oktober 2026",
        checkOut: "14 Oktober 2026",
        guests: "2 Tamu",
        rooms: "1 Kamar",
        total: "IDR 3.515.922",
        status: "Berhasil",
    },
    {
        key: "static-hotel-2",
        image: "/hotel/2.png",
        name: "Jambuluwuk Mansion Pakubuwono",
        location: "Gelora, Jakarta Pusat, DKI Jakarta",
        checkIn: "20 November 2026",
        checkOut: "22 November 2026",
        guests: "2 Tamu",
        rooms: "1 Kamar",
        total: "IDR 444.500",
        status: "Berhasil",
    },
    {
        key: "static-hotel-3",
        image: "/hotel/3.png",
        name: "Eminence Golf & Resort Lembang Bandung",
        location: "Lembang, Bandung, Jawa Barat",
        checkIn: "5 Desember 2026",
        checkOut: "7 Desember 2026",
        guests: "4 Tamu",
        rooms: "2 Kamar",
        total: "IDR 3.001.000",
        status: "Dibatalkan",
    },
];

const STATIC_FLIGHT_HISTORY: FlightHistoryItem[] = [
    {
        key: "static-flight-1",
        badge: "GA",
        badgeClass: "garuda",
        airline: "Garuda Indonesia",
        codeInfo: "GA-820 - Boeing 737-800 - Full Service",
        depTime: "08:00",
        depCode: "CGK",
        depCity: "Jakarta",
        arrTime: "10:50",
        arrCode: "SIN",
        arrCity: "Singapura",
        dateInfo: "28 September 2026 - 1 Penumpang - Ekonomi Flexi",
        total: "Rp 1.485.000",
        status: "Berhasil",
    },
    {
        key: "static-flight-2",
        badge: "SQ",
        badgeClass: "singapore",
        airline: "Singapore Airlines",
        codeInfo: "SQ-951 - Airbus A350-900 - Full Service",
        depTime: "11:15",
        depCode: "CGK",
        depCity: "Jakarta",
        arrTime: "14:00",
        arrCode: "SIN",
        arrCity: "Singapura",
        dateInfo: "28 September 2026 - 1 Penumpang - Ekonomi",
        total: "Rp 2.150.000",
        status: "Berhasil",
    },
    {
        key: "static-flight-3",
        badge: "ID",
        badgeClass: "batik",
        airline: "Batik Air",
        codeInfo: "ID-7153 - Boeing 737-800NG - Standar Kabin",
        depTime: "13:40",
        depCode: "CGK",
        depCity: "Jakarta",
        arrTime: "16:35",
        arrCode: "SIN",
        arrCity: "Singapura",
        dateInfo: "28 September 2026 - 1 Penumpang - Ekonomi",
        total: "Rp 985.000",
        status: "Berhasil",
    },
];

export default function HistoriPage() {
    const [dbBookings, setDbBookings] = useState<HotelHistoryItem[]>([]);
    const [dbFlightBookings, setDbFlightBookings] = useState<FlightHistoryItem[]>([]);

    useEffect(() => {
        fetch("/api/hotels/booking")
            .then((res) => res.json())
            .then((data: HotelBookingRecord[]) => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped: HotelHistoryItem[] = data.map((item) => {
                        const hotelImgNum = item.hotelId >= 1 && item.hotelId <= 5 ? item.hotelId : 1;
                        return {
                            key: `db-hotel-${item.id}`,
                            image: `/hotel/${hotelImgNum}.png`,
                            name: item.hotelName,
                            location: item.hotelLocation || "Indonesia",
                            checkIn: item.roomBrief || "Sesuai Pesanan",
                            checkOut: item.paymentMethod || "-",
                            guests: item.guestName || "1 Tamu",
                            rooms: item.hasBreakfast ? "Termasuk Sarapan" : "Tanpa Sarapan",
                            orderId: item.orderId,
                            total: `IDR ${item.totalPrice.toLocaleString("id-ID")}`,
                            status: item.status === "berhasil" ? "Berhasil" : "Diverifikasi",
                        };
                    });
                    setDbBookings(mapped);
                }
            })
            .catch(() => {});

        fetch("/api/tickets/booking")
            .then((res) => res.json())
            .then((data: TicketBookingRecord[]) => {
                if (Array.isArray(data) && data.length > 0) {
                    const validBadges = ["garuda", "singapore", "batik", "citilink", "airasia"];
                    const mapped: FlightHistoryItem[] = data.map((item) => {
                        const badgeClass = (validBadges.includes(item.airline)
                            ? item.airline
                            : "garuda") as FlightHistoryItem["badgeClass"];
                        return {
                            key: `db-flight-${item.id}`,
                            badge: item.airlineCode,
                            badgeClass,
                            airline: item.airlineName,
                            codeInfo: item.flightCode,
                            depTime: item.originTime,
                            depCode: item.originCode,
                            depCity: item.originCity,
                            arrTime: item.destinationTime,
                            arrCode: item.destinationCode,
                            arrCity: item.destinationCity,
                            dateInfo: `${item.dateFormatted} - ${item.passenger} (${item.passengerName}) - ${item.cabinClass}`,
                            orderId: item.orderId,
                            paymentMethod: item.paymentMethod,
                            total: `Rp ${item.totalPrice.toLocaleString("id-ID")}`,
                            status:
                                item.status === "berhasil"
                                    ? "Berhasil"
                                    : item.status === "dibatalkan"
                                    ? "Dibatalkan"
                                    : "Diverifikasi",
                        };
                    });
                    setDbFlightBookings(mapped);
                }
            })
            .catch(() => {});
    }, []);

    const allHotelHistory = [...dbBookings, ...STATIC_HOTEL_HISTORY];
    const allFlightHistory = [...dbFlightBookings, ...STATIC_FLIGHT_HISTORY];

    const getStatusClass = (status: HotelHistoryItem["status"]) => {
        if (status === "Berhasil") return styles.berhasil;
        if (status === "Dibatalkan") return styles.dibatalkan;
        return styles.diverifikasi;
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.historyWrapper}>
                <section className={styles.historySection}>
                    <div className={styles.historyContainer}>
                        <div className={styles.historyHeader}>
                            <div>
                                <h1>Riwayat Pemesanan</h1>
                                <p>Semua pemesanan hotel yang kamu lakukan</p>
                            </div>
                        </div>
                        <div className={styles.historyList}>
                            {allHotelHistory.map((item) => {
                                const isFromDb = Boolean(item.orderId);
                                return (
                                    <div key={item.key} className={styles.historyCard}>
                                        <img
                                            src={item.image}
                                            alt={item.name}
                                            className={styles.historyImage}
                                        />
                                        <div className={styles.historyInfo}>
                                            <h2>{item.name}</h2>
                                            <p className={styles.historyLocation}>{item.location}</p>
                                            <div className={styles.historyDetail}>
                                                <div>
                                                    <p>{isFromDb ? "Kamar" : "Check in"}</p>
                                                    <strong>{item.checkIn}</strong>
                                                </div>
                                                <div>
                                                    <p>{isFromDb ? "Metode" : "Check out"}</p>
                                                    <strong>{item.checkOut}</strong>
                                                </div>
                                                <div>
                                                    <p>Tamu</p>
                                                    <strong>{item.guests}</strong>
                                                </div>
                                                <div>
                                                    <p>{isFromDb ? "Paket" : "Kamar"}</p>
                                                    <strong>{item.rooms}</strong>
                                                </div>
                                            </div>
                                            {item.orderId && (
                                                <p className={styles.historyId}>ID Pesanan: {item.orderId}</p>
                                            )}
                                        </div>
                                        <div className={styles.historyPrice}>
                                            <p>Total Pembayaran</p>
                                            <h3>{item.total}</h3>
                                            <span className={`${styles.historyStatus} ${getStatusClass(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className={styles.flightHistory}>
                    <div className={styles.flightHistoryHeader}>
                        <h2>Riwayat Tiket Pesawat</h2>
                        <p>Semua pemesanan tiket pesawat yang kamu lakukan</p>
                    </div>
                    <div className={styles.flightHistoryList}>
                        {allFlightHistory.map((flight) => (
                            <div key={flight.key} className={styles.flightHistoryCard}>
                                <div className={`${styles.airlineBadge} ${styles[flight.badgeClass]}`}>
                                    {flight.badge}
                                </div>
                                <div className={styles.flightHistoryInfo}>
                                    <h3>{flight.airline}</h3>
                                    <p className={styles.flightCodeHistory}>{flight.codeInfo}</p>
                                    <div className={styles.flightRouteHistory}>
                                        <div>
                                            <strong>{flight.depTime}</strong>
                                            <span>{flight.depCode}</span>
                                            <small>{flight.depCity}</small>
                                        </div>
                                        <div className={styles.flightLineHistory}>
                                            ----------
                                        </div>
                                        <div>
                                            <strong>{flight.arrTime}</strong>
                                            <span>{flight.arrCode}</span>
                                            <small>{flight.arrCity}</small>
                                        </div>
                                    </div>
                                    <p className={styles.flightDateHistory}>{flight.dateInfo}</p>
                                    {flight.orderId && (
                                        <p className={styles.historyId}>
                                            ID Pesanan: {flight.orderId}
                                            {flight.paymentMethod ? ` • ${flight.paymentMethod}` : ""}
                                        </p>
                                    )}
                                </div>
                                <div className={styles.flightHistoryPrice}>
                                    <p>Total Pembayaran</p>
                                    <h3>{flight.total}</h3>
                                    <span className={`${styles.flightStatus} ${getStatusClass(flight.status)}`}>
                                        {flight.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.flightHistory}>
                    <div className={styles.flightHistoryHeader}>
                        <h2>Riwayat Paket Wisata</h2>
                        <p>Semua pemesanan paket liburan yang kamu lakukan</p>
                    </div>
                    <div className={styles.historyList}>
                        {STATIC_PACKAGE_HISTORY.map((pkg) => (
                            <div key={pkg.key} className={styles.historyCard}>
                                <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className={styles.historyImage}
                                />
                                <div className={styles.historyInfo}>
                                    <h2>{pkg.title}</h2>
                                    <p className={styles.historyLocation}>{pkg.location}</p>
                                    <div className={styles.historyDetail}>
                                        <div>
                                            <p>Keberangkatan</p>
                                            <strong>{pkg.departure}</strong>
                                        </div>
                                        <div>
                                            <p>Durasi</p>
                                            <strong>{pkg.duration}</strong>
                                        </div>
                                        <div>
                                            <p>Peserta</p>
                                            <strong>{pkg.participants}</strong>
                                        </div>
                                        <div>
                                            <p>Fasilitas</p>
                                            <strong>{pkg.facilities}</strong>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.historyPrice}>
                                    <p>Total Pembayaran</p>
                                    <h3>{pkg.total}</h3>
                                    <span className={`${styles.historyStatus} ${styles.berhasil}`}>
                                        {pkg.status}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </main>
    );
}
