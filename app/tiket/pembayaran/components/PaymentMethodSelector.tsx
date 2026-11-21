"use client";

import React from "react";
import styles from "../pembayaran.module.css";
import { PaymentMethod, PaymentMethodId } from "../types";

interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethodId: PaymentMethodId;
  onSelectMethod: (id: PaymentMethodId) => void;
}

export const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({
  methods,
  selectedMethodId,
  onSelectMethod,
}) => {
  return (
    <section className={styles.paymentSectionCard}>
      <h2 className={styles.sectionTitle}>Pilih Metode Pembayaran</h2>
      <div className={styles.paymentMethodList}>
        {methods.map((method) => {
          const isSelected = selectedMethodId === method.id;
          return (
            <label
              key={method.id}
              className={`${styles.methodCard} ${
                isSelected ? styles.methodCardActive : ""
              }`}
              onClick={() => onSelectMethod(method.id)}
            >
              <input
                type="radio"
                name="paymentMethod"
                className={styles.methodRadio}
                checked={isSelected}
                onChange={() => onSelectMethod(method.id)}
              />
              <div className={styles.methodContent}>
                <div className={styles.methodHeader}>
                  <span className={styles.methodName}>{method.name}</span>
                  <span className={styles.badgeAuto}>{method.badge}</span>
                </div>
                <p className={styles.methodDesc}>{method.description}</p>
              </div>
            </label>
          );
        })}
      </div>
    </section>
  );
};
