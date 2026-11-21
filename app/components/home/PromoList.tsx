"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import styles from "../../page.module.css";

export interface PromoItem {
  id: number;
  title: string;
  code: string;
  category: "Pengguna Baru" | "PayLater & E-Wallet";
  tag: string;
}

export const PROMOS_DATA: PromoItem[] = [
  {
    id: 1,
    title:
      "[Pengguna Baru] Diskon + Cashback hingga Rp2.000.000 untuk semua produk TiketKu",
    code: "TIKETKU2026",
    category: "Pengguna Baru",
    tag: "Semua Produk",
  },
  {
    id: 2,
    title: "[Pengguna Baru] Diskon 20% dengan minimal pembelian IDR 3.000.000",
    code: "SAYAUNTAR",
    category: "Pengguna Baru",
    tag: "Diskon 20%",
  },
  {
    id: 3,
    title:
      "Tiket PayLater - Diskon + Cashback hingga IDR 4.000.000 untuk produk pilihan di TiketKu",
    code: "PIKACHUARDI",
    category: "PayLater & E-Wallet",
    tag: "PayLater",
  },
  {
    id: 4,
    title:
      "Kredivo - Diskon + Cashback IDR 80.000 untuk produk pilihan di TiketKu",
    code: "HARTBDLUCKY",
    category: "PayLater & E-Wallet",
    tag: "Kredivo",
  },
  {
    id: 5,
    title: "OVO - Diskon hingga IDR 100.000 untuk produk pilihan di TiketKu",
    code: "JHONJR123",
    category: "PayLater & E-Wallet",
    tag: "OVO",
  },
  {
    id: 6,
    title:
      "[Pengguna Baru] Diskon 10% tanpa minimal pembelian tiket dan hotel",
    code: "CHRSADMINDEV",
    category: "Pengguna Baru",
    tag: "Tanpa Min. Beli",
  },
  {
    id: 7,
    title:
      "[Pengguna Baru] Cashback IDR 100.000 untuk minimal pembayaran IDR 5.000.000",
    code: "TIKETJOSEPH",
    category: "Pengguna Baru",
    tag: "Cashback",
  },
];

const CATEGORIES = ["Semua", "Pengguna Baru", "PayLater & E-Wallet"];

export default function PromoList() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const filteredPromos =
    selectedCategory === "Semua"
      ? PROMOS_DATA
      : PROMOS_DATA.filter((item) => item.category === selectedCategory);

  const handleCopyCode = (id: number, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <section className={styles.contentSection}>
      <Container>
        <div className={styles.sectionHeader}>
          <div>
            <h2 className={styles.sectionTitle}>Promo untuk pengguna baru!!</h2>
            <p className={styles.sectionSubtitle}>
              Klaim sekarang juga dan gunakan kodenya saat checkout!
            </p>
          </div>

          <div className={styles.filterGroup}>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                className={`${styles.filterPill} ${
                  selectedCategory === category ? styles.filterPillActive : ""
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.cardGrid}>
          {filteredPromos.map((promo) => (
            <div key={promo.id} className={styles.promoCard}>
              <div>
                <span className={styles.promoBadge}>{promo.tag}</span>
                <h3 className={styles.promoTitle}>{promo.title}</h3>
              </div>

              <div className={styles.promoFooter}>
                <div className={styles.codeBox}>
                  <span className={styles.codeLabel}>Kode Promo</span>
                  <span className={styles.codeValue}>{promo.code}</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleCopyCode(promo.id, promo.code)}
                  className={`${styles.primaryBtn} ${
                    copiedId === promo.id ? styles.copiedBtn : ""
                  }`}
                >
                  {copiedId === promo.id ? "Kode Tersalin ✓" : "Salin Kode"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}