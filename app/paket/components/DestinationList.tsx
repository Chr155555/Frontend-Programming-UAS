"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../paket.module.css";
import Image from "next/image";
import Link from "next/link";
import { PAKET_DATA, DestinationData } from "../data/paket";

interface PaketDestinationsProps {
    filterRegion?: string;
}

export default function PaketDestinations({ filterRegion }: PaketDestinationsProps) {
    const [selectedRegion, setSelectedRegion] = useState<string>(filterRegion || "Semua");

    const regions = ["Semua", "Indonesia", "Asia", "Lainnya"];

    const filteredPakets = PAKET_DATA.filter((paket: DestinationData) => {
        if (selectedRegion === "Semua") return true;
        return paket.regionGroup.toLowerCase() === selectedRegion.toLowerCase();
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
                            src={paket.coverImage}
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
                            <Link href={`/paket/${paket.destinationLink}`} className={styles.btnDetail}>
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