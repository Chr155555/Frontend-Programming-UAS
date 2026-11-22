"use client";

import React from "react";
import Link from "next/link";
import styles from "../favorite.module.css";

interface PackageFavorite {
    id: number;
    name: string;
    image: string;
    link: string;
}

const FAVORITE_PACKAGES: PackageFavorite[] = [
    {
        id: 7,
        name: "Malaysia",
        image: "/paket/destinasi/kl.jpg",
        link: "/paket",
    },
    {
        id: 8,
        name: "Hong Kong",
        image: "/paket/destinasi/hongkong.jpg",
        link: "/paket",
    },
];

export default function FavoritePaket() {
    return (
        <div className={styles.favoriteGroup}>
            <div className={styles.favoriteGroupTitle}>
                <span>Paket Wisata Favorit</span>
            </div>

            <div className={styles.paketGrid}>
                {FAVORITE_PACKAGES.map((pkg) => (
                    <div className={styles.paketCard} key={pkg.id}>
                        <img
                            src={pkg.image}
                            alt={pkg.name}
                            className={styles.paketImage}
                        />
                        <div className={styles.paketInfo}>
                            <div className={styles.paketTitle}>
                                <h3>{pkg.name}</h3>
                            </div>
                            <div className={styles.paketDivider} />
                            <Link
                                href={pkg.link}
                                className={styles.btnDetailPaket}
                            >
                                Lihat paket
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
