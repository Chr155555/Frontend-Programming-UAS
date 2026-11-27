"use client";

import React from "react";
import styles from "./favorite.module.css";
import FavoritePaket from "./components/FavoritePaket";
import FavoriteHotel from "./components/FavoriteHotel";

export default function FavoritePage() {
    return (
        <main className={styles.pageWrapper}>
            <section className={styles.favoriteSection}>
                <div className={styles.favoriteHeader}>
                    <div className={styles.favoriteHeaderText}>
                        <h1>Koleksi Favorit Saya</h1>
                        <p>
                            Daftar pilihan akomodasi hotel, tiket penerbangan,
                            dan paket wisata terbaik yang telah kamu simpan
                        </p>
                    </div>
                </div>

                <FavoritePaket />
                <FavoriteHotel />
            </section>
        </main>
    );
}
