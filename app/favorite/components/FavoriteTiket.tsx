"use client";

import React from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

export default function FavoriteTiket() {
    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Tiket Pesawat Favorit</span>
            </div>

            <div className={styles.emptyFavoriteBox}>
                <span>Belum ada tiket pesawat favorit yang disimpan.</span>
                <Link href="/tiket" className={styles.btnDetail}>
                    Cari Tiket Sekarang
                </Link>
            </div>
        </div>
    );
}
