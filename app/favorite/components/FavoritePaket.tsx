"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

interface PackageFavoriteItem {
    id: number;
    packageKey: string;
    destinationLink: string;
    packageId: string;
    title: string;
    destinationName: string;
    duration: string;
    coverImage: string;
    price: string;
}

interface FavoritePaketProps {
    selectedCity?: string | null;
}

export default function FavoritePaket({ selectedCity }: FavoritePaketProps) {
    const [favorites, setFavorites] = useState<PackageFavoriteItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/pakets/favorites", { cache: "no-store" })
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    setFavorites(data);
                }
            })
            .catch(() => {})
            .finally(() => setLoading(false));
    }, []);

    const handleRemoveFavorite = async (packageKey: string) => {
        try {
            const res = await fetch(
                `/api/pakets/favorites?packageKey=${encodeURIComponent(packageKey)}`,
                { method: "DELETE" }
            );
            if (res.ok) {
                setFavorites((prev) =>
                    prev.filter((item) => item.packageKey !== packageKey)
                );
            }
        } catch {}
    };

    const displayedFavorites = selectedCity
        ? favorites.filter((pkg) =>
              `${pkg.destinationName || ""} ${pkg.destinationLink || ""}`
                  .toLowerCase()
                  .includes(selectedCity.toLowerCase())
          )
        : favorites;

    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Paket Wisata Favorit</span>
            </div>

            {loading ? (
                <div className={styles.emptyFavoriteBox}>
                    Memuat paket wisata favorit...
                </div>
            ) : displayedFavorites.length === 0 ? (
                <div className={styles.emptyFavoriteBox}>
                    <span>
                        {selectedCity
                            ? `Belum ada paket wisata favorit di ${selectedCity}.`
                            : "Belum ada paket wisata favorit yang disimpan."}
                    </span>
                    <Link href="/paket" className={styles.btnDetail}>
                        Jelajahi Paket Sekarang
                    </Link>
                </div>
            ) : (
                <div className={styles.paketGrid}>
                    {displayedFavorites.map((pkg) => (
                        <div className={styles.paketCard} key={pkg.packageKey}>
                            <img
                                src={pkg.coverImage}
                                alt={pkg.title}
                                className={styles.paketImage}
                            />
                            <div className={styles.paketInfo}>
                                <div className={styles.paketTitle}>
                                    <h3>{pkg.title}</h3>
                                </div>
                                <p className={styles.hotelLocation}>
                                    {pkg.destinationName} • {pkg.duration}
                                </p>
                                <p className={styles.priceValue}>{pkg.price}</p>
                                <div className={styles.paketDivider} />
                                <div className={styles.paketActionGroup}>
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFavorite(pkg.packageKey)}
                                        className={styles.btnRemoveFav}
                                    >
                                        Hapus
                                    </button>
                                    <Link
                                        href={`/paket/${pkg.destinationLink}/${pkg.packageId}`}
                                        className={styles.btnDetailPaket}
                                    >
                                        Lihat paket
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
