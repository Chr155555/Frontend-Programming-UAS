"use client";

import { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Carousel from "react-bootstrap/Carousel";
import styles from "../../page.module.css";

const slides = [
    {
        gambar: "/home/hero-bg.jpg",
        badge: "Jelajahi Nusantara & Dunia",
        subjudul:
            "TiketKu — Satu aplikasi untuk kebutuhan liburanmu. Temukan tiket pesawat terbaik dan klaim promo menarik di bawah ini!",
    },
    {
        gambar: "/home/hero-bg2.jpeg",
        badge: "Promo Spesial Liburan",
        subjudul:
            "Nikmati potongan harga hingga Rp 4 juta untuk pemesanan tiket pesawat dan paket wisata pilihanmu.",
    },
    {
        gambar: "/home/hero-bg3.jpeg",
        badge: "Pesan Cepat & Praktis",
        subjudul:
            "Pilih rute penerbangan favoritmu dengan harga transparan dan layanan pelanggan siap membantu 24/7.",
    },
];

export default function HomeHero() {
    const [namaUser, setNamaUser] = useState("kamu");

    useEffect(() => {
        const syncUser = () => {
            try {
                const stored = localStorage.getItem("tiketku_user");
                const parsed = stored ? JSON.parse(stored) : null;
                setNamaUser(parsed && parsed.nama ? parsed.nama : "kamu");
            } catch {
                setNamaUser("kamu");
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
        <section className={styles.heroSection}>
            <Carousel fade interval={4500} className={styles.heroCarousel}>
                {slides.map((item, idx) => (
                    <Carousel.Item key={idx}>
                        <div
                            className={styles.heroSlide}
                            style={{
                                backgroundImage: `linear-gradient(120deg, rgba(15, 23, 42, 0.78) 0%, rgba(15, 23, 42, 0.45) 60%, rgba(15, 23, 42, 0.25) 100%), url("${item.gambar}")`,
                            }}
                        >
                            <Container className="py-4">
                                <div className={styles.heroContent}>
                                    <span className={styles.heroBadge}>{item.badge}</span>
                                    <h1 className={styles.heroTitle}>
                                        Hai {namaUser}, mau ke mana?
                                    </h1>
                                    <p className={styles.heroSubtitle}>{item.subjudul}</p>

                                    <div className={styles.heroStats}>
                                        <div className={styles.statCard}>
                                            <h4 className={styles.statNumber}>150+</h4>
                                            <p className={styles.statLabel}>Rute Penerbangan</p>
                                        </div>
                                        <div className={styles.statCard}>
                                            <h4 className={styles.statNumber}>Diskon 4 Jt</h4>
                                            <p className={styles.statLabel}>Promo Pengguna Baru</p>
                                        </div>
                                        <div className={styles.statCard}>
                                            <h4 className={styles.statNumber}>24/7</h4>
                                            <p className={styles.statLabel}>
                                                Pemesanan Cepat &amp; Aman
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Container>
                        </div>
                    </Carousel.Item>
                ))}
            </Carousel>
        </section>
    );
}