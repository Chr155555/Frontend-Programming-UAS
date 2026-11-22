"use client";

import React from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

interface HotelFavorite {
    id: number;
    name: string;
    image: string;
    location: string;
    rating: string;
    reviewsCount: string;
    facilities: string[];
    priceLabel: string;
    price: string;
    taxNote: string;
    link: string;
}

const FAVORITE_HOTELS: HotelFavorite[] = [
    {
        id: 3,
        name: "Eminence Golf & Resort Lembang Bandung",
        image: "/hotel/3/3.png",
        location: "Lembang, Bandung, Jawa Barat",
        rating: "4.3/5",
        reviewsCount: "(999 ulasan)",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
        priceLabel: "Mulai dari",
        price: "IDR 1.500.500",
        taxNote: "Termasuk pajak",
        link: "/hotel/3",
    },
    {
        id: 4,
        name: "Villa Bumi Ayah",
        image: "/hotel/4/4.png",
        location: "Cisarua, Bogor, Jawa Barat",
        rating: "4.9/5",
        reviewsCount: "(50 ulasan)",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
        priceLabel: "Mulai dari",
        price: "IDR 1.500.500",
        taxNote: "Termasuk pajak",
        link: "/hotel/4",
    },
];

export default function FavoriteHotel() {
    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Hotel Favorit</span>
            </div>

            {FAVORITE_HOTELS.map((hotel) => (
                <div className={styles.hotelCard} key={hotel.id}>
                    <img
                        src={hotel.image}
                        alt={hotel.name}
                        className={styles.hotelImage}
                    />
                    <div className={styles.hotelInfo}>
                        <div className={styles.hotelTitle}>
                            <h3>{hotel.name}</h3>
                        </div>
                        <p className={styles.hotelLocation}>{hotel.location}</p>
                        <p className={styles.hotelRating}>
                            <strong>{hotel.rating}</strong>
                            <span>{hotel.reviewsCount}</span>
                        </p>
                        <div className={styles.facilities}>
                            {hotel.facilities.map((fac, idx) => (
                                <span key={idx} className={styles.facilityPill}>
                                    {fac}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.hotelPrice}>
                        <p className={styles.priceLabel}>{hotel.priceLabel}</p>
                        <h3 className={styles.priceValue}>{hotel.price}</h3>
                        <p className={styles.tax}>{hotel.taxNote}</p>
                        <Link href={hotel.link} className={styles.btnDetail}>
                            Lihat hotel
                        </Link>
                    </div>
                </div>
            ))}
        </div>
    );
}
