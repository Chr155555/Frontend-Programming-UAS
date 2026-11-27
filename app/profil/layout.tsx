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
                    <h2 className={styles.userName}>{user?.nama || "User"}</h2>

                    <div className={styles.avatarCircle}>
                        <i className="bi bi-person-fill"></i>
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