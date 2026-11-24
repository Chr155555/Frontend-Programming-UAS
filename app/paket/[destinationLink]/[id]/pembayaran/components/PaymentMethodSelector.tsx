"use client";

import React from "react";
import styles from "../pembayaran_paket.module.css";
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
                    const isSelected = method.id === selectedMethodId;
                    return (
                        <div
                            key={method.id}
                            className={`${styles.methodCard} ${
                                isSelected ? styles.methodCardActive : ""
                            }`}
                            onClick={() => onSelectMethod(method.id)}
                            role="button"
                            tabIndex={0}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                    onSelectMethod(method.id);
                                }
                            }}
                        >
                            <input
                                type="radio"
                                name="paymentMethod"
                                checked={isSelected}
                                onChange={() => onSelectMethod(method.id)}
                                className={styles.methodRadio}
                                aria-label={method.name}
                            />
                            <div className={styles.methodContent}>
                                <div className={styles.methodHeader}>
                                    <span className={styles.methodName}>
                                        {method.name}
                                    </span>
                                    <span className={styles.badgeAuto}>
                                        {method.badge}
                                    </span>
                                </div>
                                <p className={styles.methodDesc}>
                                    {method.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};