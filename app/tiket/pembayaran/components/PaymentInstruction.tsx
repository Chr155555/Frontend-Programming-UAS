"use client";

import React, { useState } from "react";
import styles from "../pembayaran.module.css";
import { PaymentMethod } from "../types";

interface PaymentInstructionProps {
    method: PaymentMethod;
    totalPrice?: number;
}

export const PaymentInstruction: React.FC<PaymentInstructionProps> = ({
    method,
    totalPrice,
}) => {
    const [copied, setCopied] = useState<boolean>(false);

    const formatRupiah = (val: number) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            maximumFractionDigits: 0,
        }).format(val);
    };

    const formattedTotal = totalPrice ? formatRupiah(totalPrice) : "";

    const handleCopy = () => {
        if (method.accountNumber) {
            navigator.clipboard.writeText(method.accountNumber.replace(/\s+/g, ""));
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const steps = method.instructions.map((step) => {
        if (formattedTotal && step.includes("2.995.000")) {
            return step.replace(/Rp\s*2\.995\.000/g, formattedTotal);
        }
        return step;
    });

    return (
        <section className={styles.paymentSectionCard}>
            <h3 className={styles.instructionTitle}>
                Instruksi Pembayaran {method.name}
            </h3>

            {method.accountNumber && (
                <div className={styles.vaDisplayBox}>
                    <div className={styles.vaInfo}>
                        <span className={styles.vaLabel}>
                            {method.id === "qris" ? "Kode Referensi QRIS" : "Nomor Virtual Account"}
                        </span>
                        <input
                            type="text"
                            readOnly
                            className={styles.vaInputBox}
                            value={method.accountNumber}
                        />
                    </div>
                    <button
                        type="button"
                        className={styles.btnCopy}
                        onClick={handleCopy}
                    >
                        {copied ? "Tersalin!" : "Salin Nomor"}
                    </button>
                </div>
            )}

            <ol className={styles.stepGuideList}>
                {steps.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ol>
        </section>
    );
};
