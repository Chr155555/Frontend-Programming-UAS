"use client";

import React from "react";
import Carousel from "react-bootstrap/Carousel";
import Image from "next/image";
import styles from "../hotel.module.css";

export default function HotelHero() {
    const slides = [
        {
            image: "/hotel/explore-background.jpeg",
            title: "Liburan Mewah & Nyaman Bersama TiketKu",
            subtitle: "Temukan ribuan pilihan hotel bintang 3 hingga bintang 5 dengan diskon eksklusif.",
        },
        {
            image: "/hotel/pemandangan.jpg",
            title: "Penginapan Eksotis di Berbagai Destinasi",
            subtitle: "Nikmati pemandangan alam memukau dengan fasilitas terbaik untuk keluarga Anda.",
        },
        {
            image: "/hotel/uluwatu.jpeg",
            title: "Resort Tepi Pantai & Staycation Impian",
            subtitle: "Pesan sekarang dengan jaminan harga termurah dan kenyamanan maksimal.",
        },
    ];

    return (
        <div className={styles.heroWrapper}>
            <Carousel fade interval={4000}>
                {slides.map((slide, idx) => (
                    <Carousel.Item key={idx}>
                        <div className={styles.heroImageContainer}>
                            <Image src={slide.image} alt={slide.title} fill priority={idx === 0} sizes="100vw" className={styles.heroImage} />
                        </div>
                        <Carousel.Caption className={styles.heroCaption}>
                            <h1 className={styles.heroTitle}>{slide.title}</h1>
                            <p className={styles.heroSubtitle}>{slide.subtitle}</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
}