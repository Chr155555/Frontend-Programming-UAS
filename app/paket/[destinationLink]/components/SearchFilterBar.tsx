"use client";

import Link from "next/link";
import styles from "../daftar_paket.module.css";

interface SearchFilterBarProps {
  destinationName: string;
  kotaAsal: string;
  setKotaAsal: (val: string) => void;
  tanggalPergi: string;
  setTanggalPergi: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
}

export default function SearchFilterBar({
  destinationName,
  kotaAsal,
  setKotaAsal,
  tanggalPergi,
  setTanggalPergi,
  searchQuery,
  setSearchQuery,
}: SearchFilterBarProps) {
  return (
    <section className={styles.searchSection}>
      <div className={styles.searchContainer}>
        <h1 className="fw-bold mb-3">Rekomendasi Paket {destinationName}</h1>
        
        <div className={`${styles.searchBox} row g-3 align-items-center`}>
          
          <div className={`${styles.searchItem} col-md-3`}>
            <label htmlFor="kotaAsal" className="form-label">Kota Asal</label>
            <select
              id="kotaAsal"
              className="form-select"
              value={kotaAsal}
              onChange={(e) => setKotaAsal(e.target.value)}
            >
              <option value="Jakarta">Jakarta</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Makassar">Makassar</option>
              <option value="Medan">Medan</option>
              <option value="Palembang">Palembang</option>
            </select>
          </div>

          <div className={`${styles.searchItem} col-md-3`}>
            <label htmlFor="searchQuery" className="form-label">Cari Paket</label>
            <input
              id="searchQuery"
              type="text"
              className="form-control"
              placeholder="Cth: Relax, Explorer..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className={`${styles.searchItem} col-md-3`}>
            <label htmlFor="tanggalPergi" className="form-label">Tanggal Pergi</label>
            <input
              id="tanggalPergi"
              type="date"
              className="form-control"
              value={tanggalPergi}
              onChange={(e) => setTanggalPergi(e.target.value)}
            />
          </div>

          <div className={`${styles.searchItem} col-md-3 d-flex flex-column justify-content-end`}>
            <label className="form-label text-muted d-none d-md-block">&nbsp;</label>
            <Link href="/paket" className="btn btn-outline-secondary w-100 text-decoration-none">
              Ganti Destinasi
            </Link>
          </div>

        </div>
      </div>
      <p className={styles.paketNote}>
        Tanggal Pulang Tergantung Paket yang Dipilih
      </p>
    </section>
  );
}