"use client";

import React, { useState } from "react";
import HotelHero from "./components/HotelHero";
import HotelAbout from "./components/HotelAbout";
import HotelWorkSection from "./components/HotelWorkSection";
import styles from "./hotel.module.css";

export default function HotelPage() {
  const [filterCity] = useState<string>("Semua");

  return (
    <main className={styles.hotelContainer}>
      <HotelHero />
      <HotelAbout />
      <div id="hotel-list-section">
        <HotelWorkSection filterCity={filterCity} />
      </div>
    </main>
  );
}
