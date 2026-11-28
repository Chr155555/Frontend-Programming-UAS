"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "../profil.module.css";

interface HotelFavorite {
    hotelId: number;
    city: string;
    location: string;
}

interface PaketFavorite {
    packageKey: string;
    destinationName: string;
}

interface WishlistCity {
    name: string;
    count: number;
}

export default function WishlistPage() {
    const [wishlistCities, setWishlistCities] = useState<WishlistCity[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchWishlist() {
            try {
                const [resHotel, resPaket] = await Promise.all([
                    fetch("/api/hotels/favorites", { cache: "no-store" }),
                    fetch("/api/pakets/favorites", { cache: "no-store" }),
                ]);

                const hotels: HotelFavorite[] = resHotel.ok ? await resHotel.json() : [];
                const pakets: PaketFavorite[] = resPaket.ok ? await resPaket.json() : [];
                const listKota: WishlistCity[] = [];
                const tambahKota = (namaKota: string) => {
                    if (!namaKota) return;

                    const namaRapih = namaKota.trim();
                    const index = listKota.findIndex(
                        (item) => item.name.toLowerCase() === namaRapih.toLowerCase()
                    );
                    if (index !== -1) {
                        listKota[index].count += 1;
                    } else {
                        listKota.push({ name: namaRapih, count: 1 });
                    }
                };

                hotels.forEach((hotel) => {
                    let namaKota = hotel.city;
                    if (!namaKota && hotel.location) {
                        const bagianAlamat = hotel.location.split(",");
                        namaKota = bagianAlamat[bagianAlamat.length - 1];
                    }
                    tambahKota(namaKota);
                });

                pakets.forEach((paket) => {
                    tambahKota(paket.destinationName);
                });
                setWishlistCities(listKota);
            } catch (error) {
                console.error("Gagal mengambil data wishlist:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchWishlist();
    }, []);

    return (
        <section className={styles.contentCard}>
            <h1 className={styles.cardTitle}>Daftar Wishlist Anda:</h1>
            {loading && <p>Memuat daftar wishlist...</p>}
            {!loading && wishlistCities.length === 0 && (
                <p>Belum ada destinasi yang disimpan di wishlist.</p>
            )}
            {!loading && wishlistCities.length > 0 && (
                <div className={styles.wishlistGrid}>
                    {wishlistCities.map((city) => (
                        <Link
                            key={city.name}
                            href={`/favorite?kota=${encodeURIComponent(city.name)}`}
                            className={styles.wishlistItem}
                        >
                            <h3>{city.name}</h3>
                            <span>{city.count} disimpan</span>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
}