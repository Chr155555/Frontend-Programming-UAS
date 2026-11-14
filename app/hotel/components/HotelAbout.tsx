"use client";

import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import styles from "../hotel.module.css";

export default function HotelAbout() {
  return (
    <Container className="my-5 py-4">
      <Row className="my-4 align-items-center">
        <Col md={6} className="align-self-center mb-4 mb-md-0">
          <h2 className={styles.aboutTitle}>
            Kenyamanan Terbaik untuk Setiap Perjalanan Anda
          </h2>
          <p className={styles.aboutText}>
            Tiketku adalah website yang menyediakan berbagai macam pilihan menu. terutama untuk pemesanan hotel, tiket pesawat.
          </p>
          <div className={styles.aboutStats}>
            <div className={styles.statCard}>
              <h4 className={styles.statNumber}>10K+</h4>
              <p className={styles.statLabel}>Pilihan Hotel</p>
            </div>
            <div className={styles.statCard}>
              <h4 className={styles.statNumber}>4.8/5</h4>
              <p className={styles.statLabel}>Ulasan Positif</p>
            </div>
            <div className={styles.statCard}>
              <h4 className={styles.statNumber}>24/7</h4>
              <p className={styles.statLabel}>Customer Service</p>
            </div>
          </div>
          <button className={styles.aboutBtn}>
            Learn More
          </button>
        </Col>

        <Col md={6} className="text-center">
          <div className={styles.aboutImgWrapper}>
            <Image
              src="/hotel/paket_luxury.jpeg"
              alt="About TiketKu Hotel"
              width={540}
              height={360}
              style={{ maxHeight: "360px", width: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </Col>
      </Row>
    </Container>
  );
}
