"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../profil.module.css";

const DEFAULT_CITIES = ["Jakarta", "Bali", "Yogyakarta", "Bandung"];

interface HotelFavorite {
    hotelId: number;
    city?: string;
    location?: string;
}

interface PaketFavorite {
    packageKey: string;
    destinationName?: string;
    destinationLink?: string;
}

export default function WishlistPage() {
    const [cityCounts, setCityCounts] = useState<Record<string, number>>({
        Jakarta: 0,
        Bali: 0,
        Yogyakarta: 0,
        Bandung: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("/api/hotels/favorites", { cache: "no-store" })
                .then((res) => (res.ok ? res.json() : []))
                .catch(() => []),
            fetch("/api/pakets/favorites", { cache: "no-store" })
                .then((res) => (res.ok ? res.json() : []))
                .catch(() => []),
        ])
            .then(([hotels, pakets]: [HotelFavorite[], PaketFavorite[]]) => {
                const counts: Record<string, number> = {};

                for (const city of DEFAULT_CITIES) {
                    const lowerCity = city.toLowerCase();
                    const hotelCount = Array.isArray(hotels)
                        ? hotels.filter((h) =>
                              `${h.city || ""} ${h.location || ""}`
                                  .toLowerCase()
                                  .includes(lowerCity)
                          ).length
                        : 0;
                    const paketCount = Array.isArray(pakets)
                        ? pakets.filter((p) =>
                              `${p.destinationName || ""} ${p.destinationLink || ""}`
                                  .toLowerCase()
                                  .includes(lowerCity)
                          ).length
                        : 0;

                    counts[city] = hotelCount + paketCount;
                }

                setCityCounts(counts);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <section className={styles.contentCard}>
            <h1 className={styles.cardTitle}>Daftar Wishlist Anda:</h1>

            <div className={styles.wishlistGrid}>
                {DEFAULT_CITIES.map((cityName) => (
                    <Link
                        key={cityName}
                        href={`/favorite?kota=${encodeURIComponent(cityName)}`}
                        className={styles.wishlistItem}
                    >
                        <h3>{cityName}</h3>
                        <span>
                            {loading ? "Memuat..." : `${cityCounts[cityName] ?? 0} disimpan`}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}