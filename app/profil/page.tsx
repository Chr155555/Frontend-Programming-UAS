"use client";

import { useEffect, useState } from "react";
import styles from "./profil.module.css";

interface AuthUser {
    id: number;
    nama: string;
    email: string;
}

export default function ProfilPage() {
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("tiketku_user");
                setUser(stored ? JSON.parse(stored) : null);
            } catch {
                setUser(null);
            }
        };

        syncUser();
        window.addEventListener("storage", syncUser);
        window.addEventListener("tiketku-auth-change", syncUser);

        return () => {
            window.removeEventListener("storage", syncUser);
            window.removeEventListener("tiketku-auth-change", syncUser);
        };
    }, []);

    return (
        <section className={styles.contentCard}>
            <h1 className={styles.cardTitle}>Akun Anda yang Terhubung:</h1>

            <div className={styles.accountInfo}>
                <p>Email: {user?.email || "-"}</p>
                <p>Password: ************</p>
            </div>

            <p className={styles.infoNote}>
                Untuk mengakses detail profilmu, kategori, dan mengganti password, silakan masuk ke Pusat Akun Tiketku ya.
            </p>
        </section>
    );
}