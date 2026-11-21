"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../paket.module.css";

export default function paketAbout() {
  return (
    <section className={styles.aboutSection}>
        <Container className="my-5 py-4">
            <Row className="my-4 align-items-center">
                <h2 className={styles.aboutTitle}>
                    Paket Liburan TiketKu
                </h2>
                <p className={styles.aboutText}>
                    TiketKu menyediakan paket liburan yang menggabungkan pemesanan tiket pesawat, hotel, dan destinasi lainnya untuk memberikan kemudahan bagi anda untuk berlibur.
                </p>
                <div className={styles.aboutStats}>
                    <div className={styles.statCard}>
                    <h4 className={styles.statNumber}>120+</h4>
                    <p className={styles.statLabel}>Pilihan Paket</p>
                    </div>
                    <div className={styles.statCard}>
                    <h4 className={styles.statNumber}>30+</h4>
                    <p className={styles.statLabel}>Destinasi</p>
                    </div>
                    <div className={styles.statCard}>
                    <h4 className={styles.statNumber}>Termasuk</h4>
                    <p className={styles.statLabel}>Hotel, Penerbangan, dan Wisata</p>
                    </div>
                </div>
            </Row>
        </Container>
    </section>
  );
}
