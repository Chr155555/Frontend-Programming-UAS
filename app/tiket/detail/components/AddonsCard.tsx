"use client";

import React from "react";
import styles from "../detail.module.css";
import { AddonItem } from "../types";

interface AddonsCardProps {
  addons: AddonItem[];
  selectedAddons: string[];
  onToggleAddon: (id: string) => void;
}

export const AddonsCard: React.FC<AddonsCardProps> = ({
  addons,
  selectedAddons,
  onToggleAddon,
}) => {
  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <section className={styles.addonsCard}>
      <div className={styles.cardInnerHeader}>
        <div className={styles.cardInnerTitle}>
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
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
          </svg>
          <span>Proteksi & Layanan Tambahan</span>
        </div>
        <span style={{ fontSize: "12px", color: "#64748b" }}>Opsional</span>
      </div>

      <div className={styles.addonsList}>
        {addons.map((addon) => {
          const isChecked = selectedAddons.includes(addon.id);
          return (
            <label
              key={addon.id}
              className={styles.addonItem}
              htmlFor={addon.id}
            >
              <div className={styles.addonLeft}>
                <input
                  type="checkbox"
                  id={addon.id}
                  className={styles.addonCheckbox}
                  checked={isChecked}
                  onChange={() => onToggleAddon(addon.id)}
                />
                <div className={styles.addonContent}>
                  <h4>{addon.title}</h4>
                  <p>{addon.description}</p>
                </div>
              </div>
              <div className={styles.addonPrice}>+{formatRupiah(addon.price)}</div>
            </label>
          );
        })}
      </div>
    </section>
  );
};
