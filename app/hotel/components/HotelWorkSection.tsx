"use client";

import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Link from "next/link";
import styles from "../hotel.module.css";

export interface HotelItem {
    id: number;
    name: string;
    city: string;
    location: string;
    image: string;
    rating: number;
    reviewsCount: number;
    price: string;
    facilities: string[];
}

export const HOTELS_DATA: HotelItem[] = [
    {
        id: 1,
        name: "Grand Sahid Jaya Jakarta",
        city: "Jakarta",
        location: "Tanah Abang, Jakarta Pusat, DKI Jakarta",
        image: "/hotel/1/1.png",
        rating: 4.4,
        reviewsCount: 255,
        price: "IDR 1.757.961",
        facilities: ["Kolam renang", "WiFi gratis", "Restoran"],
    },
    {
        id: 2,
        name: "Jambuluwuk Mansion Pakubuwono",
        city: "Jakarta",
        location: "Gelora, Jakarta Pusat, DKI Jakarta",
        image: "/hotel/2/2.png",
        rating: 4.7,
        reviewsCount: 67,
        price: "IDR 222.250",
        facilities: ["WiFi gratis", "Restoran"],
    },
    {
        id: 3,
        name: "Eminence Golf & Resort Lembang Bandung",
        city: "Bandung",
        location: "Lembang, Bandung, Jawa Barat",
        image: "/hotel/3/3.png",
        rating: 4.3,
        reviewsCount: 6,
        price: "IDR 1.500.500",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
    },
    {
        id: 4,
        name: "Villa Bumi Ayah",
        city: "Bogor",
        location: "Cisarua, Bogor, Jawa Barat",
        image: "/hotel/4/4.png",
        rating: 4.9,
        reviewsCount: 123,
        price: "IDR 1.500.500",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
    },
    {
        id: 5,
        name: "Sheraton Surabaya Hotel and Towers",
        city: "Surabaya",
        location: "Tegalsari, Surabaya, Jawa Timur",
        image: "/hotel/5/5.png",
        rating: 4.7,
        reviewsCount: 999,
        price: "IDR 1.517.658",
        facilities: ["WiFi gratis", "Restoran", "Kolam Renang"],
    },
    {
        id: 6,
        name: "Uluwatu Sunset Ocean Resort",
        city: "Bali",
        location: "Pecatu, Kuta Selatan, Bali",
        image: "/hotel/6/uluwatu.jpeg",
        rating: 4.9,
        reviewsCount: 15,
        price: "IDR 2.150.000",
        facilities: ["Kolam renang", "WiFi gratis", "Restoran", "Ocean View"],
    },
];

interface ApiHotelItem {
    id: number;
    name: string;
    city: string;
    location: string;
    image: string;
    rating: number | string;
    reviewsCount: number;
    priceFormatted: string;
    facilities: string[];
}

interface HotelWorkSectionProps {
    filterCity?: string;
}

export default function HotelWorkSection({
    filterCity,
}: HotelWorkSectionProps) {
    const [selectedCity, setSelectedCity] = useState<string>(
        filterCity || "Semua",
    );
    const [hotelsList, setHotelsList] = useState<HotelItem[]>(HOTELS_DATA);
    const [favoriteIds, setFavoriteIds] = useState<number[]>([]);

    useEffect(() => {
        fetch("/api/hotels")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data) && data.length > 0) {
                    const mapped: HotelItem[] = data.map((h: ApiHotelItem) => ({
                        id: h.id,
                        name: h.name,
                        city: h.city,
                        location: h.location,
                        image: h.image,
                        rating: typeof h.rating === "number" ? h.rating : parseFloat(h.rating),
                        reviewsCount: h.reviewsCount,
                        price: h.priceFormatted,
                        facilities: Array.isArray(h.facilities) ? h.facilities : [],
                    }));
                    setHotelsList(mapped);
                }
            })
            .catch(() => {});

        fetch("/api/hotels/favorites")
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFavoriteIds(data.map((item: { hotelId: number }) => item.hotelId));
                }
            })
            .catch(() => {});
    }, []);

    const handleToggleFavorite = async (hotelId: number) => {
        try {
            const res = await fetch("/api/hotels/favorites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ hotelId }),
            });
            if (res.ok) {
                const result = await res.json();
                setFavoriteIds((prev) =>
                    result.favorited
                        ? prev.includes(hotelId)
                            ? prev
                            : [...prev, hotelId]
                        : prev.filter((id) => id !== hotelId),
                );
            }
        } catch {}
    };

    const cities = ["Semua", "Jakarta", "Bandung", "Bogor", "Surabaya", "Bali"];

    const filteredHotels = hotelsList.filter((hotel) => {
        if (selectedCity === "Semua") return true;
        return hotel.city.toLowerCase() === selectedCity.toLowerCase();
    });

    return (
        <section className={styles.workSection}>
            <Container>
                <div className={styles.workHeader}>
                    <h2 className={styles.workHeading}>Hotel tersedia</h2>
                    <div className={styles.filterPills}>
                        {cities.map((city) => (
                            <button
                                key={city}
                                type="button"
                                onClick={() => setSelectedCity(city)}
                                className={`${styles.pillBtn} ${
                                    selectedCity === city ? styles.pillBtnActive : ""
                                }`}
                            >
                                {city}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={styles.hotelList}>
                    {filteredHotels.map((hotel) => (
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
                                    <strong>{hotel.rating}/5</strong>
                                    <span>({hotel.reviewsCount} ulasan)</span>
                                </p>
                                <div className={styles.facilities}>
                                    {hotel.facilities.map((fac, i) => (
                                        <span key={i} className={styles.facilityTag}>
                                            {fac}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className={styles.hotelPrice}>
                                <p className={styles.priceLabel}>MULAI DARI</p>
                                <h3>{hotel.price}</h3>
                                <p className={styles.taxLabel}>TERMASUK PAJAK</p>
                                <div className={styles.actionGroup}>
                                    <button
                                        type="button"
                                        onClick={() => handleToggleFavorite(hotel.id)}
                                        className={`${styles.btnFav} ${
                                            favoriteIds.includes(hotel.id) ? styles.btnFavActive : ""
                                        }`}
                                        title={
                                            favoriteIds.includes(hotel.id)
                                                ? "Hapus dari Favorit"
                                                : "Tambah ke Favorit"
                                        }
                                    >
                                        <span>{favoriteIds.includes(hotel.id) ? "Favorit" : "Add Favorit"}</span>
                                    </button>
                                    <Link href={`/hotel/${hotel.id}`} className={styles.btnDetail}>
                                        Lihat hotel
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}