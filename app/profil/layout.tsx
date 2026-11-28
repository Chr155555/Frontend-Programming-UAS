"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import styles from "./profil.module.css";

interface AuthUser {
    id: number;
    nama: string;
    email: string;
}

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [user, setUser] = useState<AuthUser | null>(null);
    const [fotoProfil, setFotoProfil] = useState<string | null>(null);

    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("tiketku_user");
                const parsed = stored ? JSON.parse(stored) : null;
                setUser(parsed);

                if (parsed && parsed.email) {
                    const savedFoto = localStorage.getItem("tiketku_foto_" + parsed.email);
                    setFotoProfil(savedFoto);
                } else {
                    setFotoProfil(null);
                }
            } catch {
                setUser(null);
                setFotoProfil(null);
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

    const handleGantiFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            const hasilBase64 = reader.result as string;
            setFotoProfil(hasilBase64);
            if (user && user.email) {
                localStorage.setItem("tiketku_foto_" + user.email, hasilBase64);
                window.dispatchEvent(new Event("tiketku-auth-change"));
            }
        };
        reader.readAsDataURL(file);
    };

    const handleHapusFoto = () => {
        setFotoProfil(null);
        if (user && user.email) {
            localStorage.removeItem("tiketku_foto_" + user.email);
            window.dispatchEvent(new Event("tiketku-auth-change"));
        }
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
        if (!confirmLogout) return;

        localStorage.removeItem("tiketku_user");
        setUser(null);
        window.dispatchEvent(new Event("tiketku-auth-change"));
        router.push("/auth?mode=login");
    };

    return (
        <main className={styles.pageWrapper}>
            <div className={styles.container}>
                <aside className={styles.sidebar}>
                    <h2 className={styles.userName}>{user ? user.nama : "User"}</h2>

                    <div className={styles.avatarWrapper}>
                        <div className={styles.avatarCircle}>
                            {fotoProfil ? (
                                <img
                                    src={fotoProfil}
                                    alt="Foto Profil"
                                    className={styles.avatarImg}
                                />
                            ) : (
                                <i className="bi bi-person-fill"></i>
                            )}
                        </div>

                        <div className={styles.photoActions}>
                            <label className={styles.changePhotoLabel}>
                                Ganti Foto
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleGantiFoto}
                                    hidden
                                />
                            </label>

                            {fotoProfil && (
                                <button
                                    type="button"
                                    onClick={handleHapusFoto}
                                    className={styles.removePhotoBtn}
                                >
                                    Hapus Foto
                                </button>
                            )}
                        </div>
                    </div>

                    <nav className={styles.menuList}>
                        <Link
                            href="/profil"
                            className={`${styles.menuLink} ${
                                pathname === "/profil" ? styles.activeMenu : ""
                            }`}
                        >
                            Profil
                        </Link>
                        <Link
                            href="/profil/wishlist"
                            className={`${styles.menuLink} ${
                                pathname === "/profil/wishlist" ? styles.activeMenu : ""
                            }`}
                        >
                            Wishlist
                        </Link>
                        <button
                            type="button"
                            onClick={handleLogout}
                            className={styles.logoutBtn}
                        >
                            Keluar (Logout)
                        </button>
                    </nav>
                </aside>

                {children}
            </div>
        </main>
    );
}