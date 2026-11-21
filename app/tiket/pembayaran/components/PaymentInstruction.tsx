"use client";

import React, { useState } from "react";
import styles from "../pembayaran.module.css";
import { PaymentMethod } from "../types";

interface PaymentInstructionProps {
  method: PaymentMethod;
}

export const PaymentInstruction: React.FC<PaymentInstructionProps> = ({
  method,
}) => {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = () => {
    if (method.accountNumber) {
      navigator.clipboard.writeText(method.accountNumber.replace(/\s+/g, ""));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

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
        {method.instructions.map((step, idx) => (
          <li key={idx}>{step}</li>
        ))}
      </ol>
    </section>
  );
};
