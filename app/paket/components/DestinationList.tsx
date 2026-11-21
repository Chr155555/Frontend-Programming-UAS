"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../paket.module.css";
import Image from "next/image";
import Link from "next/link";

export interface PaketItem {
    id: number;
    name: string;
    region: string;
    image: string;
}

export const PAKETS_DATA: PaketItem[] = [
    {
        id: 1,
        name: "Yogyakarta",
        region: "Indonesia",
        image: "/paket/destinasi/gunungkidul.jpeg",
    },
    {
        id: 2,
        name: "Bali",
        region: "Indonesia",
        image: "/paket/destinasi/ulundanu.jpeg",
    },
    {
        id: 3,
        name: "Lombok",
        region: "Indonesia",
        image: "/paket/destinasi/lombok.jpg",
    },
    {
        id: 4,
        name: "Nusa Tenggara Timur",
        region: "Indonesia",
        image: "/paket/destinasi/ntt.jpg",
    },
    {
        id: 5,
        name: "Papua",
        region: "Indonesia",
        image: "/paket/destinasi/papua.jpg",
    },
    {
        id: 6,
        name: "Singapura",
        region: "Asia",
        image: "/paket/destinasi/singapore.jpg",
    },
    {
        id: 7,
        name: "Malaysia",
        region: "Asia",
        image: "/paket/destinasi/kl.jpg",
    },
    {
        id: 8,
        name: "Hong Kong",
        region: "Asia",
        image: "/paket/destinasi/hongkong.jpg",
    },
    {
        id: 9,
        name: "Jepang",
        region: "Asia",
        image: "/paket/destinasi/jepang.jpg",
    },
    {
        id: 10,
        name: "Australia",
        region: "Lainnya",
        image: "/paket/destinasi/aussie.jpg",
    },
        {
        id: 11,
        name: "Selandia Baru",
        region: "Lainnya",
        image: "/paket/destinasi/nz.jpg",
    },
        {
        id: 12,
        name: "Eropa",
        region: "Lainnya",
        image: "/paket/destinasi/swiss.jpeg",
    },
];

interface PaketDestinationsProps {
    filterRegion?: string;
}

export default function PaketDestinations({ filterRegion }: PaketDestinationsProps) {
    const [selectedRegion, setSelectedRegion] = useState<string>(filterRegion || "Semua");

    const regions = ["Semua", "Indonesia", "Asia", "Lainnya"];

    const filteredPakets = PAKETS_DATA.filter((paket) => {
        if (selectedRegion === "Semua") return true;
        return paket.region.toLowerCase() === selectedRegion.toLowerCase();
    });

    return (
        <section className={styles.listSection}>
            <Container>
                <div className={styles.listHeader}>
                    <h2 className={styles.listHeading}>Pilihan destinasi</h2>
                    <div className={styles.filterPills}>
                        {regions.map((region) => (
                        <button
                            key={region}
                            type="button"
                            onClick={() => setSelectedRegion(region)}
                            className={`${styles.pillBtn} ${
                            selectedRegion === region ? styles.pillBtnActive : ""
                            }`}
                            >
                            {region}
                        </button>
                        ))}
                    </div>
                </div>

                <div className={styles.paketList}>
                {filteredPakets.map((paket) => (
                    <div className={styles.paketCard} key={paket.id}>
                        <Image
                            src={paket.image}
                            alt={paket.name}
                            className={styles.paketImage}
                            width={500}
                            height={300}
                        />

                        <div className={styles.paketInfo}>
                            <div className={styles.paketTitle}>
                                <h3>{paket.name}</h3>
                            </div>
                            <div className={styles.paketDivider} />
                            <Link href="/paket/daftar_paket" className={styles.btnDetail}>
                                Lihat paket
                            </Link>
                        </div>
                    </div>
                ))}
                </div>
            </Container>
        </section>
    );
}