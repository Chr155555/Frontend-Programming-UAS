"use client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import styles from "../../page.module.css";

export default function HomeHero() {
  return (
    <section className={styles.heroSection}>
      <Container className="py-4">
        <Row className="my-3">
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>Hai kamu, mau ke mana?</h1>
            <p className={styles.heroSubtitle}>
              TiketKu — Satu aplikasi untuk kebutuhan liburanmu. Temukan tiket
              pesawat terbaik dan klaim promo menarik di bawah ini!
            </p>

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
                <p className={styles.statLabel}>Pemesanan Cepat &amp; Aman</p>
              </div>
            </div>
          </div>
        </Row>
      </Container>
    </section>
  );
}