import styles from "../inbox.module.css";

const notifications = [
    {
        id: 1,
        title: "Pembayaran Berhasil & E-Tiket Terbit!",
        time: "Hari ini, 14:30",
        description: (
            <>
                E-Tiket penerbangan <b>Jakarta (CGK) → Bali (DPS)</b> telah terbit. Klik untuk melihat detail penerbangan dan e-tiket Anda.
            </>
        ),
    },
    {
        id: 2,
        title: "Voucher Hotel Siap Digunakan",
        time: "Kemarin, 09:15",
        description: (
            <>
                Pemesanan kamar di <b>Grand Aston Resort Bali</b> berhasil diproses. Voucher telah dikirim ke email Anda.
            </>
        ),
    },
    {
        id: 3,
        title: "Menunggu Pembayaran Tiket",
        time: "02 Okt 2026",
        description: (
            <>
                Selesaikan pembayaran tiket penerbangan <b>Bandung → Jakarta</b> sebelum pukul 23:59 WIB agar pesanan tidak dibatalkan.
            </>
        ),
    },
    {
        id: 4,
        title: "Promo Diskon Hingga Rp2.000.000!",
        time: "28 Sep 2026",
        description: (
            <>
                Gunakan kode promo <b>TIKETKU2026</b> untuk transaksi penerbangan &amp; hotel berikutnya.
            </>
        ),
    },
];

export default function NotifikasiPage() {
    return (
        <section className={styles.notifSection}>
            <h2 className={styles.sectionTitle}>Notifikasi</h2>
            <div className={styles.notifList}>
                {notifications.map((item) => (
                    <div key={item.id} className={styles.notifCard}>
                        <div className={styles.notifHeader}>
                            <h3>{item.title}</h3>
                            <span className={styles.notifTime}>{item.time}</span>
                        </div>
                        <p className={styles.notifDesc}>{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}