"use client";

import React, { useState } from "react";
import Container from "react-bootstrap/Container";
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
    reviewsCount: 255,
    price: "IDR 1.757.961",
    facilities: ["Kolam renang", "WiFi gratis", "Restoran"],
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
    facilities: ["WiFi gratis", "Restoran"],
  },
  {
    id: 3,
    name: "Eminence Golf & Resort Lembang Bandung",
    city: "Bandung",
    location: "Lembang, Bandung, Jawa Barat",
    image: "/hotel/3.png",
    rating: 4.3,
    reviewsCount: 6,
    price: "IDR 1.500.500",
    facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
  },
  {
    id: 4,
    name: "Villa Bumi Ayah",
    city: "Bogor",
    location: "Cisarua, Bogor, Jawa Barat",
    image: "/hotel/4.png",
    rating: 4.9,
    reviewsCount: 123,
    price: "IDR 1.500.500",
    facilities: ["WiFi gratis", "Restoran", "Kolam Renang", "Gym"],
  },
  {
    id: 5,
    name: "Sheraton Surabaya Hotel and Towers",
    city: "Surabaya",
    location: "Tegalsari, Surabaya, Jawa Timur",
    image: "/hotel/5.png",
    rating: 4.7,
    reviewsCount: 999,
    price: "IDR 1.517.658",
    facilities: ["WiFi gratis", "Restoran", "Kolam Renang"],
  },
  {
    id: 6,
    name: "Uluwatu Sunset Ocean Resort",
    city: "Bali",
    location: "Pecatu, Kuta Selatan, Bali",
    image: "/hotel/uluwatu.jpeg",
    rating: 4.9,
    reviewsCount: 15,
    price: "IDR 2.150.000",
    facilities: ["Kolam renang", "WiFi gratis", "Restoran", "Ocean View"],
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
        <div className={styles.workHeader}>
          <h2 className={styles.workHeading}>Hotel tersedia</h2>
          <div className={styles.filterPills}>
            {cities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => setSelectedCity(city)}
                className={`${styles.pillBtn} ${
                  selectedCity === city ? styles.pillBtnActive : ""
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.hotelList}>
          {filteredHotels.map((hotel) => (
            <div className={styles.hotelCard} key={hotel.id}>
              <img
                src={hotel.image}
                alt={hotel.name}
                className={styles.hotelImage}
              />

              <div className={styles.hotelInfo}>
                <div className={styles.hotelTitle}>
                  <h3>{hotel.name}</h3>
                </div>
                <p className={styles.hotelLocation}>{hotel.location}</p>
                <p className={styles.hotelRating}>
                  <strong>{hotel.rating}/5</strong>
                  <span>({hotel.reviewsCount} ulasan)</span>
                </p>
                <div className={styles.facilities}>
                  {hotel.facilities.map((fac, i) => (
                    <span key={i} className={styles.facilityTag}>
                      {fac}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.hotelPrice}>
                <p className={styles.priceLabel}>MULAI DARI</p>
                <h3>{hotel.price}</h3>
                <p className={styles.taxLabel}>TERMASUK PAJAK</p>
                <button type="button" className={styles.btnDetail}>
                  Lihat hotel
                </button>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
