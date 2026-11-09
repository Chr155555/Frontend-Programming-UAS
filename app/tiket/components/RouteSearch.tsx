"use client";

import React, { useMemo } from "react";
import styles from "../tiket.module.css";
import { CityOption, CabinClass } from "../types";

interface RouteSearchProps {
  origin: string;
  destination: string;
  cities: CityOption[];
  onOriginChange: (val: string) => void;
  onDestinationChange: (val: string) => void;
  onSwapRoutes: () => void;
  flightDate: string;
  onFlightDateChange: (val: string) => void;
  cabinClass: CabinClass;
  onCabinClassChange: (val: CabinClass) => void;
  searchQuery: string;
  onSearchChange: (val: string) => void;
  onClearSearch: () => void;
  totalTickets: number;
}

export const RouteSearch: React.FC<RouteSearchProps> = ({
  origin,
  destination,
  cities,
  onOriginChange,
  onDestinationChange,
  onSwapRoutes,
  flightDate,
  onFlightDateChange,
  cabinClass,
  onCabinClassChange,
  searchQuery,
  onSearchChange,
  onClearSearch,
  totalTickets,
}) => {
  const originCity = cities.find((c) => c.code === origin)?.city || origin;
  const destCity = cities.find((c) => c.code === destination)?.city || destination;

  const formattedDate = useMemo(() => {
    try {
      const d = new Date(flightDate);
      return d.toLocaleDateString("id-ID", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return flightDate;
    }
  }, [flightDate]);

  return (
    <header className={styles.searchSection}>
      <div className={styles.flightSummaryHeader}>
        <div className={styles.routeBadge}>
          <div className={styles.routeTitle}>
            <span>
              {originCity} ({origin})
            </span>
            <span className={styles.routeArrow}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </span>
            <span>
              {destCity} ({destination})
            </span>
          </div>
        </div>

        <div className={styles.searchMeta}>
          <div className={styles.metaPill}>
            <span>{totalTickets}</span> Tiket Tersedia
          </div>
          <div className={styles.metaPill}>{formattedDate}</div>
          <div className={styles.metaPill}>1 Penumpang, {cabinClass}</div>
        </div>
      </div>

      <div className={styles.routeSelectionGrid}>
        <div className={styles.formGroup}>
          <label htmlFor="originSelect" className={styles.formLabel}>
            Kota Asal
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="originSelect"
              className={styles.routeSelect}
              value={origin}
              onChange={(e) => onOriginChange(e.target.value)}
            >
              {cities.map((city) => (
                <option key={`orig-${city.code}`} value={city.code}>
                  {city.city} ({city.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          type="button"
          className={styles.btnSwapRoute}
          title="Tukar Kota Asal dan Tujuan"
          onClick={onSwapRoutes}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 16V4M7 4L3 8M7 4L11 8M17 8V20M17 20L21 16M17 20L13 16" />
          </svg>
        </button>

        <div className={styles.formGroup}>
          <label htmlFor="destSelect" className={styles.formLabel}>
            Kota Tujuan
          </label>
          <div className={styles.selectWrapper}>
            <select
              id="destSelect"
              className={styles.routeSelect}
              value={destination}
              onChange={(e) => onDestinationChange(e.target.value)}
            >
              {cities.map((city) => (
                <option key={`dest-${city.code}`} value={city.code}>
                  {city.city} ({city.code})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="flightDateInput" className={styles.formLabel}>
            Tanggal Berangkat
          </label>
          <input
            type="date"
            id="flightDateInput"
            className={styles.dateInput}
            value={flightDate}
            onChange={(e) => onFlightDateChange(e.target.value)}
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="cabinClassSelect" className={styles.formLabel}>
            Kelas Kabin
          </label>
          <select
            id="cabinClassSelect"
            className={styles.routeSelect}
            value={cabinClass}
            onChange={(e) => onCabinClassChange(e.target.value as CabinClass)}
          >
            <option value="Ekonomi">Ekonomi</option>
            <option value="Premium Ekonomi">Premium Ekonomi</option>
            <option value="Bisnis">Bisnis</option>
          </select>
        </div>
      </div>

      <div className={styles.searchbar}>
        <div className={styles.searchbarWrapper}>
          <div className={styles.searchbarLeft}>
            <div className={styles.searchIconWrapper}>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </div>
          </div>

          <div className={styles.searchbarCenter}>
            <input
              type="text"
              className={styles.searchbarInput}
              placeholder="Cari nama maskapai, nomor penerbangan, atau jam keberangkatan..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {searchQuery && (
            <div className={styles.searchbarRight}>
              <button
                type="button"
                className={styles.searchbarClearIcon}
                title="Hapus pencarian"
                onClick={onClearSearch}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
