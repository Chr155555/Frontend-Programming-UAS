"use client";

import React from "react";
import styles from "../tiket.module.css";
import { AirlineType, SortType } from "../types";

interface FilterToolbarProps {
    selectedAirline: AirlineType;
    onAirlineSelect: (airline: AirlineType) => void;
    sortBy: SortType;
    onSortChange: (sort: SortType) => void;
    airlineCounts?: Record<string, number>;
}

const AIRLINE_FILTERS: { label: string; value: AirlineType }[] = [
    { label: "Semua Maskapai", value: "all" },
    { label: "Garuda Indonesia", value: "garuda" },
    { label: "Singapore Airlines", value: "singapore" },
    { label: "Batik Air", value: "batik" },
    { label: "Citilink", value: "citilink" },
    { label: "AirAsia", value: "airasia" },
];

export const FilterToolbar: React.FC<FilterToolbarProps> = ({
    selectedAirline,
    onAirlineSelect,
    sortBy,
    onSortChange,
    airlineCounts,
}) => {
    return (
        <div className={styles.toolbar}>
            <div className={styles.filterChips}>
                {AIRLINE_FILTERS.map((chip) => {
                    const isActive = selectedAirline === chip.value;
                    const count = airlineCounts ? airlineCounts[chip.value] ?? 0 : null;
                    return (
                        <span
                            key={chip.value}
                            className={`${styles.filterChip} ${
                                isActive ? styles.filterChipActive : ""
                            }`}
                            onClick={() => onAirlineSelect(chip.value)}
                        >
                            {chip.label}
                            {count !== null && (
                                <span style={{ marginLeft: "4px", fontSize: "11px", opacity: 0.8 }}>
                                    ({count})
                                </span>
                            )}
                        </span>
                    );
                })}
            </div>

            <div className={styles.sortBox}>
                <span>Urutkan:</span>
                <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => onSortChange(e.target.value as SortType)}
                >
                    <option value="recomended">Rekomendasi</option>
                    <option value="cheapest">Harga Terendah</option>
                    <option value="earliest">Waktu Berangkat</option>
                    <option value="fastest">Durasi Tercepat</option>
                </select>
            </div>
        </div>
    );
};
