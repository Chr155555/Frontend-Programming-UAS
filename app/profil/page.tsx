"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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
                <p>Nama: {user?.nama || "-"}</p>
                <p>Email: {user?.email || "-"}</p>
                <p className={styles.passwordLine}>
                    <span>Password: ************</span>
                    <Link href="/auth?mode=forgot" className={styles.changePwdBtn}>
                        Ganti Password
                    </Link>
                </p>
            </div>

            <p className={styles.infoNote}>
                Data di atas digunakan untuk masuk dan memesan tiket di TiketKu. Gunakan tombol Ganti Password jika ingin memperbarui kata sandi akunmu.
            </p>
        </section>
    );
}