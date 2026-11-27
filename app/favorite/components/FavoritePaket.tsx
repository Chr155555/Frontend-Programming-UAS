"use client";

import React from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

export default function FavoritePaket() {
    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Paket Wisata Favorit</span>
            </div>

            <div className={styles.emptyFavoriteBox}>
                <span>Belum ada paket wisata favorit yang disimpan.</span>
                <Link href="/paket" className={styles.btnDetail}>
                    Jelajahi Paket Sekarang
                </Link>
            </div>
        </div>
    );
}
