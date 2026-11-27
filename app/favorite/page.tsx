"use client";

import React, { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import styles from "./favorite.module.css";
import FavoritePaket from "./components/FavoritePaket";
import FavoriteHotel from "./components/FavoriteHotel";

function FavoriteContent() {
    const searchParams = useSearchParams();
    const selectedCity = searchParams.get("kota");

    return (
        <main className={styles.pageWrapper}>
            <section className={styles.favoriteSection}>
                <div className={styles.favoriteHeader}>
                    <div className={styles.favoriteHeaderText}>
                        <h1>
                            {selectedCity
                                ? `Koleksi Favorit — ${selectedCity}`
                                : "Koleksi Favorit Saya"}
                        </h1>
                        <p>
                            {selectedCity
                                ? `Menampilkan pilihan akomodasi hotel dan paket wisata favorit di ${selectedCity}`
                                : "Daftar pilihan akomodasi hotel, tiket penerbangan, dan paket wisata terbaik yang telah kamu simpan"}
                        </p>
                    </div>
                    {selectedCity && (
                        <Link href="/favorite" className={styles.btnDetail}>
                            Tampilkan Semua
                        </Link>
                    )}
                </div>

                <FavoritePaket selectedCity={selectedCity} />
                <FavoriteHotel selectedCity={selectedCity} />
            </section>
        </main>
    );
}

export default function FavoritePage() {
    return (
        <Suspense fallback={null}>
            <FavoriteContent />
        </Suspense>
    );
}
