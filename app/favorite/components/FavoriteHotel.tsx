"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

interface HotelFavoriteItem {
    favoriteId: number;
    hotelId: number;
    name: string;
    image: string;
    location: string;
    rating: string;
    reviewsCount: number;
    facilities: string[];
    priceFormatted: string;
}

export default function FavoriteHotel() {
    const [favorites, setFavorites] = useState<HotelFavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/hotels/favorites", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFavorites(data);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveFavorite = async (hotelId: number) => {
        try {
            const res = await fetch(`/api/hotels/favorites?hotelId=${hotelId}`, {
                method: "DELETE",
            });
            if (res.ok) {
                setFavorites((prev) => prev.filter((item) => item.hotelId !== hotelId));
            }
        } catch {}
    };

    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Hotel Favorit</span>
            </div>

            {loading ? (
                <div className={styles.emptyFavoriteBox}>
                    Memuat hotel favorit...
                </div>
            ) : favorites.length === 0 ? (
                <div className={styles.emptyFavoriteBox}>
                    <span>Belum ada hotel favorit yang disimpan.</span>
                    <Link href="/hotel" className={styles.btnDetail}>
                        Cari Hotel Sekarang
                    </Link>
                </div>
            ) : (
                favorites.map((hotel) => (
                    <div className={styles.hotelCard} key={hotel.hotelId}>
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
                                {hotel.facilities.map((fac, idx) => (
                                    <span key={idx} className={styles.facilityPill}>
                                        {fac}
                                    </span>
                                ))}
                            </div>
                        </div>
                        <div className={styles.hotelPrice}>
                            <p className={styles.priceLabel}>Mulai dari</p>
                            <h3 className={styles.priceValue}>{hotel.priceFormatted}</h3>
                            <p className={styles.tax}>Termasuk pajak</p>
                            <div className={styles.hotelActionGroup}>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveFavorite(hotel.hotelId)}
                                    className={styles.btnRemoveFav}
                                >
                                    Hapus
                                </button>
                                <Link href={`/hotel/${hotel.hotelId}`} className={styles.btnDetail}>
                                    Lihat hotel
                                </Link>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
