"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import styles from "../hotel.module.css";

export interface HotelItem {
    id: number;
    name: string;
    city: string;
    location: string;
    image: string;
    rating: number;
    reviewsCount: number;
    price: string;
    description: string;
    facilities: string[];
}

export const HOTELS_DATA: HotelItem[] = [
    {
        id: 1,
        name: "Grand Sahid Jaya Jakarta",
        city: "Jakarta",
        location: "Tanah Abang, Jakarta Pusat, DKI Jakarta",
        image: "/hotel/1.png",
        rating: 4.4,
        reviewsCount: 173,
        price: "IDR 1.757.961",
        description: "Hotel bintang lima mewah di pusat bisnis Sudirman Jakarta. Menawarkan kamar luas berdesain elegan dengan akses kolam renang outdoor, spa, dan aneka restoran hidangan internasional.",
        facilities: ["Kolam Renang", "WiFi Gratis", "Restoran Mewah", "Spa & Sauna"],
    },
    {
        id: 2,
        name: "Jambuluwuk Mansion Pakubuwono",
        city: "Jakarta",
        location: "Gelora, Jakarta Pusat, DKI Jakarta",
        image: "/hotel/2.png",
        rating: 4.7,
        reviewsCount: 67,
        price: "IDR 222.250",
        description: "Penginapan bergaya boutique nan nyaman dan asri di kawasan prestisius Pakubuwono. Cocok untuk staycation praktis dan beristirahat santai dengan suasana privat di tengah kota.",
        facilities: ["WiFi Gratis", "Restoran", "Smart TV", "Parkir Gratis"],
    },
    {
        id: 3,
        name: "Eminence Golf & Resort Lembang",
        city: "Bandung",
        location: "Lembang, Bandung, Jawa Barat",
        image: "/hotel/3.png",
        rating: 4.8,
        reviewsCount: 999,
        price: "IDR 1.500.500",
        description: "Resort pegunungan sejuk dengan panorama perbukitan hijau dan lapangan golf. Dilengkapi infinity pool air hangat, kids club, dan restoran dengan view lembah Lembang.",
        facilities: ["Infinity Pool", "WiFi Gratis", "Lapangan Golf", "Gym & Fitness", "Restoran"],
    },
    {
        id: 4,
        name: "Villa Bumi Ayah Puncak",
        city: "Bogor",
        location: "Cisarua, Bogor, Jawa Barat",
        image: "/hotel/4.png",
        rating: 4.9,
        reviewsCount: 50,
        price: "IDR 1.500.500",
        description: "Villa privat bernuansa alami dengan udara pegunungan Puncak yang segar. Sangat pas untuk liburan keluarga besar, arisan, maupun gathering dengan fasilitas barbeque dan kolam pribadi.",
        facilities: ["Private Pool", "WiFi Gratis", "Dapur Lengkap", "Area BBQ", "Taman Luas"],
    },
    {
        id: 5,
        name: "Sheraton Surabaya Hotel and Towers",
        city: "Surabaya",
        location: "Tegalsari, Surabaya, Jawa Timur",
        image: "/hotel/5.png",
        rating: 4.7,
        reviewsCount: 952,
        price: "IDR 1.517.658",
        description: "Hotel bintang 5 terhubung langsung dengan Tunjungan Plaza Mall. Dilengkapi fasilitas kolam renang tropis bergaya lagoon, pusat kebugaran, dan ballroom berstandar internasional.",
        facilities: ["Akses Mall Langsung", "Kolam Lagoon", "WiFi Gratis", "Restoran Bintang 5"],
    },
    {
        id: 6,
        name: "Uluwatu Sunset Ocean Resort",
        city: "Bali",
        location: "Pecatu, Kuta Selatan, Bali",
        image: "/hotel/uluwatu.jpeg",
        rating: 4.9,
        reviewsCount: 428,
        price: "IDR 2.150.000",
        description: "Resort tebing eksklusif dengan pemandangan langsung ke Samudra Hindia dan panorama matahari terbenam terbaik di Bali. Menawarkan pengalaman menginap romantis tak terlupakan.",
        facilities: ["Cliff Infinity Pool", "Ocean View", "Private Beach", "Bar & Resto Sunset"],
    },
];

interface HotelWorkSectionProps {
    filterCity?: string;
}

export default function HotelWorkSection({ filterCity }: HotelWorkSectionProps) {
    const [selectedCity, setSelectedCity] = useState<string>(filterCity || "Semua");

    const cities = ["Semua", "Jakarta", "Bandung", "Bogor", "Surabaya", "Bali"];

    const filteredHotels = HOTELS_DATA.filter((hotel) => {
        if (selectedCity === "Semua") return true;
        return hotel.city.toLowerCase() === selectedCity.toLowerCase();
    });

    return (
        <section className={styles.workSection}>
            <Container>
                <Row className="mb-4">
                    <Col className="text-center">
                        <h2 className={styles.workHeading}>What We Offer</h2>
                        <div className={styles.filterPills}>
                            {cities.map((city) => (
                                <button key={city} type="button" onClick={() => setSelectedCity(city)} className={`${styles.pillBtn} ${selectedCity === city ? styles.pillBtnActive : ""}`}>
                                    {city}
                                </button>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4">
                    {filteredHotels.map((hotel) => (
                        <Col xs={12} md={4} key={hotel.id} className="mb-4">
                            <div className={styles.hotelCard}>
                                <div className={styles.cardImgWrapper}>
                                    <img src={hotel.image} alt={hotel.name} className={styles.hotelCardImg} />
                                    <span className={styles.ratingTag}>⭐ {hotel.rating}/5</span>
                                    <span className={styles.cityTag}>{hotel.city}</span>
                                </div>
                                <div className={styles.cardBody}>
                                    <h3 className={styles.hotelName}>{hotel.name}</h3>
                                    <p className={styles.hotelLocation}>
                                        <i className="bi bi-geo-alt text-primary"></i>
                                        {hotel.location}
                                    </p>
                                    <p className={styles.hotelDesc}>{hotel.description}</p>
                                    <div className={styles.facilityGroup}>
                                        {hotel.facilities.slice(0, 3).map((fac, i) => (
                                            <span key={i} className={styles.facilityBadge}>{fac}</span>
                                        ))}
                                    </div>
                                    <div className={styles.cardFooter}>
                                        <div>
                                            <span className={styles.priceLabel}>Mulai dari</span>
                                            <strong className={styles.priceValue}>{hotel.price}</strong>
                                            <span className={styles.priceLabel}>/malam (termasuk pajak)</span>
                                        </div>
                                        <button type="button" className={styles.bookBtn}>Pesan Sekarang</button>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    ))}
                </Row>
            </Container>
        </section>
    );
}