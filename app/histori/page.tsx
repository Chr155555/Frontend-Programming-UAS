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

interface PaketBookingRecord {
    id: number;
    orderId: string;
    destinationLink: string;
    packageId: string;
    packageTitle: string;
    destinationName: string;
    duration: string;
    hotelBrief: string;
    coverImage: string;
    guestName: string;
    paymentMethod: string;
    totalPrice: number;
    status: string;
    createdAt: string;
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
    orderId?: string;
    total: string;
    status: "Berhasil" | "Diverifikasi" | "Dibatalkan";
}

export default function HistoriPage() {
    const [dbBookings, setDbBookings] = useState<HotelHistoryItem[]>([]);
    const [dbFlightBookings, setDbFlightBookings] = useState<FlightHistoryItem[]>([]);
    const [dbPackageBookings, setDbPackageBookings] = useState<PackageHistoryItem[]>([]);

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
                            status: item.status === "dibatalkan" ? "Dibatalkan" : "Berhasil",
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
                            status: item.status === "dibatalkan" ? "Dibatalkan" : "Berhasil",
                        };
                    });
                    setDbFlightBookings(mapped);
                }
            })
            .catch(() => {});

        fetch("/api/pakets/booking")
            .then((res) => res.json())
            .then((data: PaketBookingRecord[]) => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped: PackageHistoryItem[] = data.map((item) => {
                        return {
                            key: `db-package-${item.id}`,
                            image: item.coverImage || "/paket/destinasi/singapore.jpg",
                            title: `Paket Wisata ${item.destinationName} — ${item.packageTitle}`,
                            location: `${item.destinationName} • ${item.hotelBrief}`,
                            departure: item.createdAt ? new Date(item.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }) : "30 November 2026",
                            duration: item.duration,
                            participants: item.guestName,
                            facilities: item.paymentMethod,
                            orderId: item.orderId,
                            total: `IDR ${item.totalPrice.toLocaleString("id-ID")}`,
                            status: item.status === "dibatalkan" ? "Dibatalkan" : "Berhasil",
                        };
                    });
                    setDbPackageBookings(mapped);
                }
            })
            .catch(() => {});
    }, []);

    const allHotelHistory = dbBookings;
    const allFlightHistory = dbFlightBookings;
    const allPackageHistory = dbPackageBookings;

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
                            {allHotelHistory.length === 0 ? (
                                <div className={styles.emptyState}>
                                    Belum ada riwayat pemesanan hotel.
                                </div>
                            ) : (
                                allHotelHistory.map((item) => {
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
                                })
                            )}
                        </div>
                    </div>
                </section>

                <section className={styles.flightHistory}>
                    <div className={styles.flightHistoryHeader}>
                        <h2>Riwayat Tiket Pesawat</h2>
                        <p>Semua pemesanan tiket pesawat yang kamu lakukan</p>
                    </div>
                    <div className={styles.flightHistoryList}>
                        {allFlightHistory.length === 0 ? (
                            <div className={styles.emptyState}>
                                Belum ada riwayat pembelian tiket pesawat.
                            </div>
                        ) : (
                            allFlightHistory.map((flight) => (
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
                            ))
                        )}
                    </div>
                </section>

                <section className={styles.flightHistory}>
                    <div className={styles.flightHistoryHeader}>
                        <h2>Riwayat Paket Wisata</h2>
                        <p>Semua pemesanan paket liburan yang kamu lakukan</p>
                    </div>
                    <div className={styles.historyList}>
                        {allPackageHistory.length === 0 ? (
                            <div className={styles.emptyState}>
                                Belum ada riwayat pembelian paket wisata.
                            </div>
                        ) : (
                            allPackageHistory.map((pkg) => (
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
                                                <p>Metode Pembayaran</p>
                                                <strong>{pkg.facilities}</strong>
                                            </div>
                                        </div>
                                        {pkg.orderId && (
                                            <p className={styles.historyId}>ID Pesanan: {pkg.orderId}</p>
                                        )}
                                    </div>
                                    <div className={styles.historyPrice}>
                                        <p>Total Pembayaran</p>
                                        <h3>{pkg.total}</h3>
                                        <span className={`${styles.historyStatus} ${getStatusClass(pkg.status)}`}>
                                            {pkg.status}
                                        </span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>
            </div>
        </main>
    );
}