"use client";

import React, { useState } from "react";
import styles from "../pembayaran_paket.module.css";
import { PaymentMethod } from "../types";

interface PaymentInstructionProps {
    method: PaymentMethod;
}

export const PaymentInstruction: React.FC<PaymentInstructionProps> = ({ method }) => {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        if (!method.accountNumber) return;
        navigator.clipboard.writeText(method.accountNumber.replace(/\s+/g, ""));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className={styles.paymentSectionCard}>
            <h2 className={styles.instructionTitle}>
                Instruksi Pembayaran {method.name}
            </h2>

            {method.accountNumber && (
                <div className={styles.vaDisplayBox}>
                    <div className={styles.vaInfo}>
                        <span className={styles.vaLabel}>
                            {method.id === "qris" ? "KODE QRIS / NMID" : "NOMOR VIRTUAL ACCOUNT"}
                        </span>
                        <input
                            type="text"
                            readOnly
                            value={method.accountNumber}
                            className={styles.vaInputBox}
                            aria-label="Nomor Akun Pembayaran"
                        />
                    </div>
                    <button
                        type="button"
                        onClick={handleCopy}
                        className={styles.btnCopy}
                    >
                        {copied ? "Tersalin!" : "Salin Nomor"}
                    </button>
                </div>
            )}

            <ol className={styles.stepGuideList}>
                {method.instructions.map((step, idx) => (
                    <li key={idx}>{step}</li>
                ))}
            </ol>
        </section>
    );
};